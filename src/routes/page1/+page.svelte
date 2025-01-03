<script lang="ts">
  import type { LayoutData } from './$types';
  import { useService, AppEvents } from '$lib/service';

  const service = useService();

  let { data }: { data: LayoutData } = $props();

  function onSubmit() {
    $service.submit({
      type: AppEvents.SubmitPage1,
      data: {
        foo: 'hello',
        bar: $service.context.page1 ? $service.context.page1.bar : 13
      }
    });
  }
</script>

<h2>Page 1</h2>
<button onclick={onSubmit}>Next</button>
<pre><code>{JSON.stringify(data, null, 2)}</code></pre>
<pre><code>{JSON.stringify($service.context, null, 2)}</code></pre>
