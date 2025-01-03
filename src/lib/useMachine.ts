/**
 * This code was taken from the `svelte-robot-factory` project.
 * The overwhelming majority of that code is example projects.
 * Below I have not only reproduced, but fixed the type of, the sole function
 * (of interest) exported from the library.
 * I promise this isn't NIH syndrome.
 * @packageDocumentation
 */
import { interpret, type Machine, type Service } from 'robot3';
import { writable, type Writable } from 'svelte/store';

/**
 * @remarks
 * Usage of setTimeout avoids a poorly understood race condition when using SSR.
 */
export function useMachine<E, T = unknown>(
  machine: Machine,
  event: { [K in keyof E]: T }
): Writable<Service<Machine>> {
  const { subscribe, set, update } = writable(
    interpret<Machine, E>(
      machine,
      (service) => setTimeout(() => void set(service), 0),
      event
    )
  );
  return { subscribe, set, update };
}
