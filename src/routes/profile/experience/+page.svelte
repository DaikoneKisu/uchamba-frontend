<script lang="ts">
	import AcademicExperience from './AcademicExperience.svelte'

	export let data
</script>

<div class="w-full flex flex-col justify-between pb-28 items-center pt-8 gap-16 px-16">
	<AcademicExperience
		business={data.workExperiences}
	/>
</div>

