<script lang="ts">
	import Modal from '$lib/components/profile/modal/Modal.svelte'
	import learningIcon from '$lib/icons/learning.svg'
	import SaveModalFooter from '../../../lib/components/profile/modal/SaveModalFooter.svelte'
	import { invalidateAll } from '$app/navigation'
	import Chip from '$lib/components/profile/chip/Chip.svelte'
	import { flip } from 'svelte/animate'
	import { fade } from 'svelte/transition'

	export let openedModal = false

	export let hardSkillsList: string[] = []

	let skills: string[] = []

	let value = ''

	let input: HTMLInputElement

	function save() {
		skills = []
		invalidateAll()
		closeModal()
	}

	function insertSkill() {
		if (value) {
			skills = [...skills, value]
			value = ''
			input.focus()
		}
	}

	function deleteSkill(skillToDelete: string) {
		skills = skills.filter((skill) => skill !== skillToDelete)
	}

	function closeModal() {
		openedModal = false
	}

	$: skills = [...new Set(skills)]
</script>

<Modal
	title="Habilidades Duras"
	subtitle="Agrega una nueva habilidad dura para añadir a tu CV"
	bind:isOpen={openedModal}
	icon={learningIcon}
>
	<svelte:fragment slot="body">
		<form
			class="w-full flex pl-6 pt-12 pb-8 justify-between"
			on:submit={(e) => {
				e.preventDefault()
				insertSkill()
			}}
		>
			<div class="flex justify-center w-full gap-12">
				<label
					class={'flex justify-center border-4 border-[#f0f0f0] h-[64px] w-full max-w-[330px] rounded-xl bg-brand-white pr-4'}
				>
					<div class="flex flex-col pl-5 h-full justify-center w-full text-[15px]">
						<input
							bind:this={input}
							list="hard-skills-list"
							type="text"
							bind:value
							placeholder="Ingresa una habilidad dura"
							class="text-sm focus:outline-none focus:border-0 focus:shadow-none placeholder:text-brand-p-black"
						/>
						<datalist id="hard-skills-list">
							{#each hardSkillsList as skill}
								<option value={skill} />
							{/each}
						</datalist>
					</div>
				</label>
			</div>
		</form>

		<div class="min-h-[200px]">
			<ul class="flex flex-wrap justify-center items-start px-8 gap-2 pb-12">
				{#each skills as skill (skill)}
					<div animate:flip in:fade class="flex justify-center">
						<Chip
							key={skill}
							text={skill}
							deleteHandler={() => {
								deleteSkill(skill)
							}}
						/>
					</div>
				{/each}
			</ul>
		</div>
	</svelte:fragment>

	<SaveModalFooter slot="footer" handleSave={save} />
</Modal>
