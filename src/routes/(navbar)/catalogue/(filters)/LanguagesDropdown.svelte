<script lang="ts">
  import { flip } from 'svelte/animate'
  import { fade, fly } from 'svelte/transition'

  import Chip from '$lib/components/chip/Chip.svelte'
  import Dropdown from './Dropdown.svelte'
  import Checkbox from '$lib/components/catalogue/checkbox/Checkbox.svelte'
  import { suggestions } from '$lib/stores/suggestions'
  import { languageFilter } from '$lib/stores/filters'

  let languages: string[]
  let error = ''
  let isPristine = true
  let value = ''

  $: if (languages.length < 2 && languageFilter.has(true)) {
    languageFilter.delete(true)
  }

  $: choosableLanguages = $suggestions.languages.filter(
    (suggestedLang) =>
      suggestedLang.total > 0 &&
      !languages.some((choosenLang) => choosenLang.startsWith(suggestedLang.name + '-'))
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

  function addInclusiveLang(
    e: Event & {
      currentTarget: EventTarget & HTMLInputElement
    }
  ) {
    if (e.currentTarget.checked) {
      languageFilter.add(true)
    } else {
      languageFilter.delete(true)
    }
  }

  function insertLanguage(language: string) {
    if (language) {
      language = language.toLocaleLowerCase()
      const [name, proficientLevel] = language.split(new RegExp('-| ', 'g'))
      let languageFormatted = ''
      choosableLanguages.forEach((lang) => {
        if (
          lang.name.toLocaleLowerCase() === name &&
          lang.proficientLevel.toLocaleLowerCase() === proficientLevel
        ) {
          languageFormatted = `${lang.id}-${lang.proficientLevel}`
        }
      })
      if (languageFormatted) {
        error = ''
        languageFilter.add(languageFormatted)
      } else if (
        $suggestions.languages.some(
          (lang) =>
            lang.name.toLocaleLowerCase() === name &&
            lang.proficientLevel.toLocaleLowerCase() === proficientLevel
        )
      ) {
        error =
          'Ya especificaste ese idioma con otro nivel mínimo, elimínalo primero si quieres cambiarlo'
      } else {
        error =
          'El formato del idioma es "Idioma-Nivel", respetando signos ortográficos y siendo nivel "A1", "A2", "B1", "B2", "C1", "C2" o "Native"'
      }
      value = ''
    }
  }

  function deleteLanguage(languageToDelete: string) {
    error = ''
    const [name, proficientLevel] = languageToDelete.split(new RegExp('-| ', 'g'))
    $suggestions.languages.forEach((lang) => {
      if (lang.name === name && lang.proficientLevel === proficientLevel) {
        languageFilter.delete(`${lang.id}-${lang.proficientLevel}`)
      }
    })
  }
</script>

<Dropdown title="Idiomas">
  <div class="flex w-full flex-col items-center justify-center gap-4 pt-4">
    <strong class="inline-block text-green-700">Selecciona un idioma con un nivel mínimo</strong>
    <div class="self-start pl-4">
      <Checkbox
        form="filters"
        disabled={languages.length < 2}
        text="Incluyentes"
        checked={$languageFilter.has(true)}
        handleChange={(e) => {
          /*
           * Here I have to disable typescript-eslint's no-unsafe-argument rule
           * because it keeps saying that 'e' is of type any, and it's easy to go
           * to Checkbox.svelte component in lib and see that e is being exported
           * with the expected type and that it's in fact of that type, even
           * VSCode's intellisense infers it, so yeah, minus points to typescript-eslint
           */
          /* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */
          addInclusiveLang(e)
        }}
      />
    </div>
    <div class="flex w-full flex-col">
      <label
        class={'flex h-[49px] w-full max-w-[330px] justify-center rounded-xl border-4 bg-brand-white pr-4' +
          (error && !isPristine ? ' border-[#D14F4F]' : ' border-[#f0f0f0]')}
      >
        <div class="flex h-full w-full flex-col justify-center pl-5 text-[15px]">
          <input
            list="languages-list"
            type="text"
            bind:value
            placeholder="Ej. Inglés-B1"
            class="bg-brand-white placeholder:text-brand-p-black focus:border-0 focus:shadow-none focus:outline-none"
            on:input|once={() => (isPristine = false)}
            on:change={(e) => {
              insertLanguage(e.currentTarget.value.trim())
            }}
          />
          <datalist id="languages-list">
            {#each choosableLanguages as language}
              <option value={`${language.name}-${language.proficientLevel} (${language.total})`} />
            {/each}
          </datalist>
        </div>
      </label>
      {#if error && !isPristine}
        <strong in:fly={{ x: -12 }} class="ml-3 w-[80%] text-left text-[12px] text-red-600"
          >{error}</strong
        >
      {:else}
        <div class="invisible h-[18px]" aria-hidden />
      {/if}
    </div>
  </div>

  <div class="w-full">
    <ul class="flex w-full flex-wrap items-center justify-center gap-2 pt-2">
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
