# example of using robot in sveltekit

Simple app that demonstrates using a robot3 state machine to drive a SvelteKit
application.
This is meant to highlight a variety of non-obvious capabilities and not be a
full-fledged application nor be free of every conceivable bug.

Run it locally with

```bash
nvm use
npm install
npm run dev -- --open
```

## Issues

I need to juggle the URL a *little* more intelligently to cope with non-root
deployments.
It's the kind of thing I can do if I know the 1.5 hour of frowning and fiddling
will be useful to anyone.

# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
