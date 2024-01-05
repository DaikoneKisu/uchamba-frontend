<script lang="ts">
	import { fade } from 'svelte/transition'
	import { flip } from 'svelte/animate'

	import Add from '$lib/components/profile/add/Add.svelte'
	import Chip from '$lib/components/profile/chip/Chip.svelte'
	import HardSkillCreationModal from './HardSkillCreationModal.svelte'

	export let hardSkills: {
		skillId: number
		name: string
		createdAt: string
	}[]

	export let hardSkillsList: string[]
	export let isEditable: boolean

	let openedModal = false

	async function handleDelete(name: string) {
		const [hardSkillToDelete] = hardSkills.filter((skill) => skill.name === name)

		try {
			hardSkills = hardSkills.filter((skill) => skill.name !== name)
			const res = await fetch('/api/profile/education/hard-skills/delete', {
				method: 'DELETE',
				body: JSON.stringify({ name })
			})

			const resBody = await res.json()

			if (!res.ok) throw new Error(resBody?.message)
		} catch (error) {
			if (error instanceof Error && error.message) alert(error.message)
			else alert('Hubo un error en el servidor al intentar eliminar la habilidad dura')
			hardSkills = [...hardSkills, hardSkillToDelete]
		}
	}

	function openModal() {
		openedModal = true
	}
</script>

<article class="w-full flex-col bg-brand-white">
	<header>
		<div class="flex w-full justify-between">
			<h2>Habilidades Duras</h2>
			{#if isEditable}
				<Add clickHandler={openModal} />
			{/if}
		</div>
		<div class="mt-2 h-1 w-full bg-ucab-blue" />
	</header>

	<ul class="mt-6 flex flex-wrap gap-2">
		{#each hardSkills as skill (skill)}
			<div animate:flip in:fade class="flex justify-center">
				<Chip
					key={skill.name}
					text={skill.name}
					animation={isEditable}
					deleteHandler={() => {
						handleDelete(skill.name)
					}}
				/>
			</div>
		{/each}
	</ul>
</article>

<HardSkillCreationModal bind:openedModal {hardSkillsList} />
