<script lang="ts">
	import { flip } from 'svelte/animate'
	import { fade } from 'svelte/transition'
	import Chip from '$lib/components/chip/Chip.svelte'
	import Dropdown from './Dropdown.svelte'
	import { suggestions } from '$lib/stores/suggestions'
	import { languageFilter } from '$lib/stores/filters'

	let languages: string[]

	$: choosableLanguages = $suggestions.languages.filter(
		(lang) => !languages.some((choosenLang) => choosenLang.startsWith(lang.name + '-'))
	)

	$: {
		languages = [...$languageFilter].filter((l): l is string => typeof l === 'string')
		languages = languages.map((language) => {
			const [id, proficientLevel] = language.split('-')
			let name = ''
			$suggestions.languages.forEach((lang) => {
				if (lang.id === Number(id) && lang.proficientLevel === proficientLevel) {
					name = `${lang.name}-${lang.proficientLevel}`
				}
			})
			return name
		})
	}

	let value = ''

	let input: HTMLInputElement

	function insertLanguage(language: string) {
		if (language) {
			const [name, proficientLevel] = language.split('-')
			$suggestions.languages.forEach((lang) => {
				if (lang.name === name && lang.proficientLevel === proficientLevel) {
					languageFilter.add(`${lang.id}-${lang.proficientLevel}`)
				}
			})
			value = ''
		}
	}

	function deleteLanguage(languageToDelete: string) {
		const [name, proficientLevel] = languageToDelete.split('-')
		$suggestions.languages.forEach((lang) => {
			if (lang.name === name && lang.proficientLevel === proficientLevel) {
				languageFilter.delete(`${lang.id}-${lang.proficientLevel}`)
			}
		})
		languages = languages.filter((language) => language !== languageToDelete)
	}
</script>

<Dropdown title="Idiomas">
	<div class="flex flex-col w-full items-center justify-center pt-2">
		<strong class="inline-block text-green-700">Selecciona un idioma con un nivel mínimo</strong>
		<label
			class="flex h-[49px] w-full max-w-[330px] justify-center rounded-xl border-4 border-[#f0f0f0] bg-brand-white pr-4 mt-4"
		>
			<div class="flex h-full w-full flex-col justify-center pl-5 text-[15px]">
				<input
					bind:this={input}
					list="languages-list"
					type="text"
					bind:value
					placeholder="Selecciona un idioma..."
					class="placeholder:text-brand-p-black focus:border-0 focus:shadow-none focus:outline-none bg-brand-white"
					on:change={(e) => {
						insertLanguage(e.currentTarget.value.trim())
					}}
				/>
				<datalist id="languages-list">
					{#each choosableLanguages as language (language.id + language.proficientLevel)}
						<option value={`${language.name}-${language.proficientLevel}`} />
					{/each}
				</datalist>
			</div>
		</label>
	</div>

	<div class="w-full">
		<ul class="flex flex-wrap items-center justify-center w-full gap-2 pt-3">
			{#each languages as language (language)}
				<div animate:flip in:fade class="flex justify-center pb-2">
					<Chip
						key={language}
						text={language}
						deleteHandler={() => {
							deleteLanguage(language)
						}}
					/>
				</div>
			{/each}
		</ul>
	</div>
</Dropdown>
