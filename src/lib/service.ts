import { getContext, setContext, hasContext } from 'svelte';
import {
	type ContextFunction,
	type SendFunction,
	type SendEvent,
	createMachine,
	state,
	transition,
	reduce,
	invoke
} from 'robot3';
import { useMachine } from '$lib/useMachine';
import { derived, type Readable } from 'svelte/store';

//////////
// Part 1: Define the application context type and the state machine.
//
// Our convention is:
//
// 1. States beginning with `_` are not pages. They may be used as immediate
// transitions that perform useful actions or reductions.
//
// 2. All other states: these are intended to be pages of the application.
//
// This convention allows, for example, for the machine to startup in an _INIT
// state and immediately load state from somewhere.
//////////

export type AppContext = Partial<{
	initialData: string;
	page1: {
		foo: string;
		bar: number;
	};
	page2: {
		baz: boolean;
	};
	page3: {
		quux: string;
	};
}>;

export const AppEvents = {
	SubmitPage1: 'SubmitPage1',
	SubmitPage2: 'SubmitPage2',
	BackToPage1: 'BackToPage1',
	SubmitPage3: 'SubmitPage3',
	Reset: 'Reset'
} as const;

const config = {
	_INIT: invoke(
		async (ctx: AppContext) => {
			console.log('Log some data to the server', ctx);
			return 'theoretically loaded from server';
		},
		transition(
			'done',
			'page1',
			reduce((ctx: AppContext, evt: { data: AppContext['initialData'] }) => {
				return { ...ctx, initialData: evt.data };
			})
		)
	),
	page1: state(
		transition(
			AppEvents.SubmitPage1,
			'page2',
			reduce((ctx: AppContext, evt: { data: AppContext['page1'] }) => ({
				...ctx,
				page1: evt.data
			}))
		)
	),
	page2: state(
		transition(
			AppEvents.SubmitPage2,
			'page3',
			reduce((ctx: AppContext, evt: { data: AppContext['page2'] }) => ({
				...ctx,
				page2: evt.data
			}))
		),
		transition(
			AppEvents.BackToPage1,
			'page1',
			reduce((ctx: AppContext) => ({
				...ctx,
				page1: !ctx.page1
					? undefined
					: {
							...ctx.page1,
							bar: ctx.page1.bar + 1
						},
				page2: { baz: false }
			}))
		)
	),
	page3: state(
		transition(
			AppEvents.SubmitPage3,
			'finished',
			reduce((ctx: AppContext, evt: { data: AppContext['page3'] }) => ({
				...ctx,
				page3: evt.data
			}))
		)
	),
	finished: state(
		transition(
			AppEvents.Reset,
			'_INIT',
			reduce(() => ({}))
		)
	)
};

const context: ContextFunction<AppContext> = (initialContext: AppContext) => ({
	...initialContext
});

//////////
// Part 2: Define the hook which Svelte files may invoke to use the state
// machine.
// This is boilerplate but making it more generic is type work that I can do
// if we want to invest a little more time into it.
// `useService` can a l m o s t be separated entirely from `machine` and
// `AppContext`.
//////////

export interface Service {
	current: string;
	context: AppContext;
	submit: SendFunction;
}

const SERVICE_CONTEXT_KEY: unique symbol = Symbol();

/**
 * @param initialState - The initial state in which to load the machine.
 * This argument is almost certainly a URL path without the leading '/'.
 * By default it is `''` which is a shorthand for the first state.
 *
 * @remarks
 * Must be called from a Svelte component header.
 * Eg, `+layout.svelte` = good, `+layout.ts` = not good.
 *
 * @example
 * ```typescript
 * // +layout.svelte
 * <script lang='ts'>
 *   import { page } from '$app/state';
 *   import { useService } from '$lib/service';
 *   const service = useService(page.url.pathname);
 * </script>
 *
 * <h1>Current state: {$service.current}</h1>
 * ```
 */
export function useService(initialState: '' | keyof typeof config = ''): Readable<Service> {
	if (!hasContext(SERVICE_CONTEXT_KEY)) {
		if ('' === initialState) {
			initialState = Object.keys(config)[0] as keyof typeof config;
		}
		const created = createMachine(initialState, config, context);
		const service = useMachine(created, {});
		setContext(
			SERVICE_CONTEXT_KEY,
			derived(service, ($s) => ({
				current: $s.machine.current,
				context: $s.context,
				submit(event: SendEvent) {
					return $s.send(event);
				}
			}))
		);
	}
	return getContext(SERVICE_CONTEXT_KEY);
}
