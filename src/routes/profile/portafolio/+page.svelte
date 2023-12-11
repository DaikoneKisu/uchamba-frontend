<script lang="ts">
	import Languages from './Languages.svelte'

	export let data
</script>

<div class="w-full flex flex-col justify-between pb-28 items-center pt-8 gap-16 px-16">
	<Languages languages={data.languages} langsList={data.langsList} />
</div>
