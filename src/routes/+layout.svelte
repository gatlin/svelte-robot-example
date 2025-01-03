<script lang="ts">
  import { type Snippet } from 'svelte';
  import { useService } from '$lib/service';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { base } from '$app/paths';

  let { children }: { children: Snippet } = $props();
  // The machine is initially set according to the current page.
  const service = useService(page.url.pathname.slice(1));
  // State transitions to states not starting with `_` change the page.
  $effect(() => {
    if (!$service.current.startsWith('_')) {
      goto(`${base}/${$service.current}`);
    }
  });
</script>

<h1>Layout</h1>
<p>{$service.current}</p>
<pre><code>{JSON.stringify($service.context, null, 2)}</code></pre>

<hr />

{@render children()}
