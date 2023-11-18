<script lang="ts">
	import ProfileArticle from '$lib/components/profile/ProfileArticle.svelte'

	export let data
</script>

<div class="w-full h-full flex flex-col items-center py-8 gap-8 px-8">
	<ProfileArticle
		title="Formación Académica"
		entries={data.academicTraining.map((item) => ({ title: item }))}
	/>
  <ProfileArticle
    title="Idiomas"
    entries={data.languages.map((item) => ({ title: item }))}
  />
  <ProfileArticle
    title="Habilidades"
    entries={data.skills.map((item) => ({ title: item }))}
  />
</div>
