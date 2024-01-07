<script lang="ts">
	import { flip } from 'svelte/animate'
	import { fade } from 'svelte/transition'
	import Chip from '$lib/components/chip/Chip.svelte'
	import Dropdown from './Dropdown.svelte'

	let hardSkills: string[] = []

	let value = ''

	let input: HTMLInputElement

	function insertHardSkill() {
		if (value && !hardSkills.includes(value)) {
			hardSkills = [...hardSkills, value]
			value = ''
			input.focus()
		}
	}
</script>

<Dropdown title="Habilidades Duras">
	<form
		on:submit={(e) => {
			e.preventDefault()
			insertHardSkill()
		}}
	>
		<div class="flex w-full justify-center gap-12">
			<label
				class="flex h-[49px] w-full max-w-[330px] justify-center rounded-xl border-4 border-[#f0f0f0] bg-brand-white pr-4 mt-4"
			>
				<div class="flex h-full w-full flex-col justify-center pl-5 text-[15px]">
					<input
						bind:this={input}
						list="hard-skills-list"
						type="text"
						bind:value
						placeholder="Ingresa una habilidad dura"
						class="text-sm placeholder:text-brand-p-black focus:border-0 focus:shadow-none focus:outline-none bg-stone-50"
					/>
				</div>
			</label>
		</div>
	</form>

	<div class="w-full">
		<ul class="flex flex-wrap items-center justify-center w-full gap-2 pt-3">
			{#each hardSkills as hardSkill (hardSkill)}
				<div animate:flip in:fade class="flex justify-center">
					<Chip
						key={hardSkill}
						text={hardSkill}
						deleteHandler={() => {
							alert('se borró la habilidad dura ')
						}}
					/>
				</div>
			{/each}
		</ul>
	</div>
</Dropdown>
