<script lang="ts">
	import type { LayoutData } from './$types';
	import { useService, AppEvents } from '$lib/service';

	const service = useService();
	function onSubmit() {
		$service.submit(AppEvents.Reset);
	}

	let { data }: { data: LayoutData } = $props();
</script>

<h2>Finished!</h2>
<button onclick={onSubmit}>Reset</button>
<pre><code>{JSON.stringify(data, null, 2)}</code></pre>
