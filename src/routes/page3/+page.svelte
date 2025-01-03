<script lang="ts">
	import type { LayoutData } from './$types';
	import { useService, AppEvents } from '$lib/service';

	const service = useService();

	function onSubmit() {
		$service.submit({
			type: AppEvents.SubmitPage3,
			data: {
				quux: 'cool ranch'
			}
		});
	}

	let { data }: { data: LayoutData } = $props();
</script>

<h2>Page 3</h2>
<button onclick={onSubmit}>Next</button>
<pre><code>{JSON.stringify(data, null, 2)}</code></pre>
