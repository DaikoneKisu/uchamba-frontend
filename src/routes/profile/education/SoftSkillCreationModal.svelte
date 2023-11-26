<script lang="ts">
	import Modal from '$lib/components/profile/modal/Modal.svelte'
	import staffIcon from '$lib/icons/staff.svg'
	import SaveModalFooter from './SaveModalFooter.svelte'
	import { invalidateAll } from '$app/navigation'
	import Chip from '$lib/components/profile/chip/Chip.svelte'
	import { flip } from 'svelte/animate'
	import { fade } from 'svelte/transition'

	export let softSkillsList: string[] = []

	export let openedModal = false

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
	title="Habilidades Blandas"
	subtitle="Agrega una nueva habilidad blanda para añadir a tu CV"
	bind:isOpen={openedModal}
	icon={staffIcon}
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
							list="soft-skills-list"
							type="text"
							bind:value
							placeholder="Ingresa una habilidad blanda"
							class="text-sm focus:outline-none focus:border-0 focus:shadow-none placeholder:text-brand-p-black"
						/>
						<datalist id="soft-skills-list">
							{#each softSkillsList as skill}
								<option value={skill} />
							{/each}
						</datalist>
					</div>
				</label>
			</div>
		</form>

		<div class="min-h-[200px]">
			<ul class="flex flex-wrap justify-center items-start px-12 gap-4 pb-12">
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
