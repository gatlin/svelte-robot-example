# example of using robot in sveltekit

Simple app that demonstrates using a robot3 state machine to drive a SvelteKit
application.
This is meant to highlight a variety of non-obvious capabilities and not be a
full-fledged application nor be free of every conceivable bug.

## Run locally.

```bash
nvm use
npm install
npm run dev -- --open
```

And your browser should rudely interrupt you with the app page.

## What you should expect it to do.

When it boots up the app should immediately redirect from `/` to `/page1`,
loading some asynchronous data into the machine along the way.
Each page adds or modifies some state data which is displayed in a very ugly
manner at the top of the page.
Page 2 has a loop back to Page 1 to show a simple example of a cycle.

## A guide to the source code.

Fortunately there isn't much code.
Files of note:

- `src/lib/service.ts` is where the machine is defined with the app's behavior.
- `src/routes/+layout.svelte` is where the machine is connected to the page
router.
- `src/routes/page{1,2,3}/+page.svelte` are the pages which access the state
data and `submit()` events to update the machine, potentially updating the
data and causing a transition to a new state / page.

## "Why doesn't the back button work?" and other issues.

There's a lot more prior art using state machines to control the behavior of a
single page than there is controlling an entire app, and of those most I have
seen are SPAs.

In `src/routes/+layout.svelte` the machine is started up with the current URL.
For the back button to work the machine needs to hydrate its data from somewhere.
In `src/lib/useMachine.ts` and `src/lib/service.ts` in `useMachine` and `useService`
(resp.) you can see the hooks where data may be initialized to provide a truly
seamless experience between refreshes.
