<script lang="ts">
	import Add from '$lib/components/profile/Add.svelte'
	import Chip from '$lib/components/profile/Chip.svelte'

	export let softSkills: {
		skillId: number
		name: string
		createdAt: string
		updatedAt: string
	}[]
</script>

<article class="bg-brand-white flex-col w-full mb-5">
	<header>
		<div class="flex justify-between w-full">
			<h2>Habilidades Blandas</h2>
			<Add clickHandler={() => {}} />
		</div>
		<div class="h-1 bg-ucab-blue w-full mt-2" />
	</header>

	<ul class="flex gap-8 mt-6 flex-wrap">
		{#each softSkills as skill}
			<Chip
				text={skill.name}
				deleteHandler={() => {
					alert('intentaste borrar un chip')
				}}
			/>
		{/each}
	</ul>
</article>
