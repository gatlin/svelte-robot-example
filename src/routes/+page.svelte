<script lang="ts">
  import type { LayoutData } from './$types';

  let { data }: { data: LayoutData } = $props();
</script>

<h2>Index</h2>
<pre><code>{JSON.stringify(data, null, 2)}</code></pre>
