<script lang="ts">
	import { goto } from '$app/navigation'

	import type { CatalogueInfo, Language } from '$lib/types/catalogue-info.type'

	import Button from '$lib/components/button/Button.svelte'
	import CollectionCvModal from './CollectionCVModal.svelte'

	export let graduate: CatalogueInfo

	let openedModal = false

	function formatEducations(acc: string, current: string, index: number): string {
		if (index === 0) {
			return current
		}
		return `${acc} · ${current}`
	}

	function formatLanguages(acc: string, current: Language, index: number): string {
		if (index === 0) {
			return `${current.name} - ${current.proficientLevel}`
		}
		return `${acc} · ${current.name} - ${current.proficientLevel}`
	}
</script>

<article
	class="w-full border-b pl-4 pb-4 mb-6 last-of-type:border-b-0 last-of-type:mb-0 last-of-type:pb-0"
>
	<h3 class="max-w-[434px] text-black text-xl font-medium">
		{graduate.name}
	</h3>
	<p class="">
		{graduate.country} - {graduate.state} - {graduate.city}
	</p>
	<p>
		{graduate.education.reduce(formatEducations, '')} /
		{graduate.languages.reduce(formatLanguages, '')}
	</p>
	<p class="font-semibold whitespace-normal w-full line-clamp-3">
		{graduate.aboutMe ?? ''}
	</p>

	<div class="mt-4 flex flex-wrap gap-3">
		{#each [...graduate.skills.hard, ...graduate.skills.soft] as skill}
			<span
				class="inline-flex items-center h-[35px] px-[0.9375rem] py-[0.375rem] bg-[#f6f6f6] border border-[#c2c2c2] rounded-full"
			>
				<b class="line-clamp-1">{skill}</b>
			</span>
		{/each}
	</div>

	<div class="mt-8 flex gap-8">
		<Button text={'Descargar CV'} handleClick={() => (openedModal = true)} />
		<Button text={'Ver perfil'} handleClick={() => goto(`/profile/${graduate.userId}`)} />
	</div>
</article>

<CollectionCvModal
	bind:openedModal
	cvs={graduate.cvs}
	userId={graduate.userId}
	userName={graduate.name}
/>
