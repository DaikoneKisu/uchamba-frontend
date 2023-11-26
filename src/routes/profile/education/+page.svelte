<script lang="ts">
	import AcademicTraining from './AcademicTraining.svelte'
	import Languages from './Languages.svelte'
	import SoftSkills from './SoftSkills.svelte'
	import HardSkills from './HardSkills.svelte'

	export let data
</script>

<div class="w-full flex flex-col justify-between pb-28 items-center pt-8 gap-16 px-16">
	<AcademicTraining studies={data.education.featured.concat(data.education.personal)} />
	<Languages languages={data.languages} />
	<SoftSkills
		softSkills={data.softSkills.featured.concat(data.softSkills.personal)}
		softSkillsList={data.softSkillsList}
	/>
	<HardSkills
		hardSkills={data.hardSkills.featured.concat(data.hardSkills.personal)}
		hardSkillsList={data.hardSkillsList}
	/>
</div>
