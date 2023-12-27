<script lang="ts">
	import closeIcon from '$lib/icons/cancel-black.svg'
	import type { Skill } from '$lib/types/profile-data.type'
	import { slide } from 'svelte/transition'
	import Dropdown from './Dropdown.svelte'
	import { cv } from './cv.store'

	export let hardSkills: Skill[]

	let addedHardSkills: string[] = []
	let input: HTMLInputElement
	let value: string

	function addHardSkill() {
		if (value && !addedHardSkills.includes(value) && hardSkills.find((hs) => hs.name === value)) {
			addedHardSkills = [...addedHardSkills, value]
			value = ''
			input.focus()
		}
	}

	function deleteHardSkill(hsToDelete: string) {
		addedHardSkills = addedHardSkills.filter((skill) => skill !== hsToDelete)
	}

	function updateCv() {
		cv.set({
			...$cv,
			entries: {
				...$cv.entries,
				skills: {
					...$cv.entries.skills,
					hard: addedHardSkills
				}
			}
		})
	}

	$: if (addedHardSkills) {
		updateCv()
	}
</script>

<Dropdown title="Habilidades Duras">
	<div class="pt-4">
		<label
			class="flex justify-center border-4 border-[#f0f0f0] h-[49px] w-full max-w-[330px] rounded-xl bg-brand-white pr-4"
		>
			<form
				on:submit|preventDefault={addHardSkill}
				class="flex flex-col pl-5 h-full justify-center w-full text-[15px]"
			>
				<input
					bind:this={input}
					list="hard-skills-list"
					type="text"
					bind:value
					placeholder="Ingresa una habilidad dura"
					class="text-sm focus:outline-none focus:border-0 focus:shadow-none placeholder:text-brand-p-black"
				/>
				<datalist id="hard-skills-list">
					{#each hardSkills.filter((hs) => !addedHardSkills.includes(hs.name)) as hs}
						<option value={hs.name} />
					{/each}
				</datalist>
			</form>
		</label>

		<ul class="flex flex-col gap-5 py-5">
			{#each addedHardSkills as hs}
				<li transition:slide class="flex items-center gap-2 pl-2">
					<button on:click={() => deleteHardSkill(hs)}>
						<img src={closeIcon} alt="Eliminar habilidad dura" class="w-7 aspect-square" />
					</button>
					<p>{hs}</p>
				</li>
			{/each}
		</ul>
	</div>
</Dropdown>
