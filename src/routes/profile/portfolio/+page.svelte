<script lang="ts">
	import ProfileArticle from '$lib/components/profile/ProfileArticle.svelte'

	export let data
</script>

<div class="w-full h-full flex flex-col items-center py-8 gap-8 px-8">
	<ProfileArticle title="Proyectos" entries={data.projects.map((item) => ({ title: item }))} />
</div>
