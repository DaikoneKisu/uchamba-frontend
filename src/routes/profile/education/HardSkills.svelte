<script lang="ts">
	import Add from '$lib/components/profile/add/Add.svelte'
	import Chip from '$lib/components/profile/chip/Chip.svelte'

	export let hardSkills: {
		skillId: number
		name: string
		createdAt: string
		updatedAt: string
	}[]
</script>

<article class="bg-brand-white flex-col w-full">
	<header>
		<div class="flex justify-between w-full">
			<h2>Habilidades Duras</h2>
			<Add clickHandler={() => {}} />
		</div>
		<div class="h-1 bg-ucab-blue w-full mt-2" />
	</header>

	<ul class="flex gap-8 mt-6 flex-wrap">
		{#each hardSkills as skill}
			<Chip
				text={skill.name}
				deleteHandler={() => {
					alert('intentaste borrar un chip')
				}}
			/>
		{/each}
	</ul>
</article>
