<script lang="ts">
	import type { LayoutData } from './$types';
	import { useService, AppEvents } from '$lib/service';

	const service = useService();
	function onSubmit() {
		$service.submit({
			type: AppEvents.SubmitPage2,
			data: {
				baz: true
			}
		});
	}

	function onBackToPage1() {
		$service.submit(AppEvents.BackToPage1);
	}

	let { data }: { data: LayoutData } = $props();
</script>

<h2>Page 2</h2>
<button onclick={onSubmit}>Next</button>
<button onclick={onBackToPage1}>Back To Page 1</button>
<pre><code>{JSON.stringify(data, null, 2)}</code></pre>
