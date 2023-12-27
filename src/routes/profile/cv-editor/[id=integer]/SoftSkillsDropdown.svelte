<script lang="ts">
	import closeIcon from '$lib/icons/cancel-black.svg'
	import type { Skill } from '$lib/types/profile-data.type'
	import { slide } from 'svelte/transition'
	import Dropdown from './Dropdown.svelte'
	import { cv } from './cv.store'

	export let softSkills: Skill[]

	let addedSoftSkills: string[] = []
	let input: HTMLInputElement
	let value: string

	function addSoftSkill() {
		if (value && !addedSoftSkills.includes(value) && softSkills.find((ss) => ss.name === value)) {
			addedSoftSkills = [...addedSoftSkills, value]
			value = ''
			input.focus()
		}
	}

	function deleteSoftSkill(ssToDelete: string) {
		addedSoftSkills = addedSoftSkills.filter((skill) => skill !== ssToDelete)
	}

	function updateCv() {
		cv.set({
			...$cv,
			entries: {
				...$cv.entries,
				skills: {
					...$cv.entries.skills,
					soft: addedSoftSkills
				}
			}
		})
	}

	$: if (addedSoftSkills) {
		updateCv()
	}
</script>

<Dropdown title="Habilidades Blandas">
	<div class="pt-4">
		<label
			class="flex justify-center border-4 border-[#f0f0f0] h-[49px] w-full max-w-[330px] rounded-xl bg-brand-white pr-4"
		>
			<form
				on:submit|preventDefault={addSoftSkill}
				class="flex flex-col pl-5 h-full justify-center w-full text-[15px]"
			>
				<input
					bind:this={input}
					list="soft-skills-list"
					type="text"
					bind:value
					placeholder="Ingresa una habilidad blanda"
					class="text-sm focus:outline-none focus:border-0 focus:shadow-none placeholder:text-brand-p-black"
				/>
				<datalist id="soft-skills-list">
					{#each softSkills.filter((ss) => !addedSoftSkills.includes(ss.name)) as ss}
						<option value={ss.name} />
					{/each}
				</datalist>
			</form>
		</label>

		<ul class="flex flex-col gap-5 py-5">
			{#each addedSoftSkills as ss}
				<li transition:slide class="flex items-center gap-2 pl-2">
					<button on:click={() => deleteSoftSkill(ss)}>
						<img src={closeIcon} alt="Eliminar habilidad suave" class="w-7 aspect-square" />
					</button>
					<p>{ss}</p>
				</li>
			{/each}
		</ul>
	</div>
</Dropdown>
