<script lang="ts">
	import Add from '$lib/components/profile/add/Add.svelte'
	import Chip from '$lib/components/profile/chip/Chip.svelte'
	import { flip } from 'svelte/animate'
	import HardSkillCreationModal from './HardSkillCreationModal.svelte'
	import { fade } from 'svelte/transition'

	export let hardSkills: {
		skillId: number
		name: string
		createdAt: string
	}[]

	export let hardSkillsList: string[]
	export let isEditable: boolean

	let openedModal = false

	async function handleDelete(name: string) {
		try {
			hardSkills = hardSkills.filter((skill) => skill.name !== name)
			const res = await fetch('/api/profile/education/hard-skills/delete', {
				method: 'DELETE',
				body: JSON.stringify({ name })
			})

			if (!res.ok) throw new Error('Error al eliminar la habilidad dura')
		} catch (e) {
			alert(e)
		}
	}

	function openModal() {
		openedModal = true
	}
</script>

<article class="bg-brand-white flex-col w-full">
	<header>
		<div class="flex justify-between w-full">
			<h2>Habilidades Duras</h2>
			{#if isEditable}
				<Add clickHandler={openModal} />
			{/if}
		</div>
		<div class="h-1 bg-ucab-blue w-full mt-2" />
	</header>

	<ul class="flex gap-2 mt-6 flex-wrap">
		{#each hardSkills as skill (skill)}
			<div animate:flip in:fade class="flex justify-center">
				<Chip
					key={skill.name}
					text={skill.name}
					animation={false}
					deleteHandler={() => {
						handleDelete(skill.name)
					}}
				/>
			</div>
		{/each}
	</ul>
</article>

<HardSkillCreationModal bind:openedModal {hardSkillsList} />
