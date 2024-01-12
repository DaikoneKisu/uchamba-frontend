<script lang="ts">
  import { goto } from '$app/navigation'
  import { browser } from '$app/environment'

  import type { CatalogueResponse } from '$lib/types/catalogue-response.type'

  import Navbar from '$lib/components/navbar/Navbar.svelte'
  import Filters from './Filters.svelte'
  import Catalogue from './Catalogue.svelte'
  import { filters } from '$lib/stores/catalogue-filters'
  import { searches } from '$lib/stores/catalogue-searches'
  import { suggestions } from '$lib/stores/suggestions'

  export let data: CatalogueResponse

  $: suggestions.set(data.suggestions)

  $: if (browser) {
    let currentURL = new URL(window.location.href)

    if (($filters || $searches) && currentURL.searchParams.has('page')) {
      currentURL.searchParams.delete('page')
    }

    if ($filters) {
      for (const [filter, filterValue] of Object.entries($filters)) {
        if (filterValue == null) continue

        if (filterValue instanceof Set) {
          let values = ''
          for (const value of filterValue as Set<string | number | boolean>) {
            if (typeof value === 'boolean') continue
            values += `${value},`
          }
          values
            ? currentURL.searchParams.set(filter.toLowerCase(), values.slice(0, values.length - 1))
            : currentURL.searchParams.delete(filter)

          if (filter === 'careers') {
            filterValue.has(true)
              ? currentURL.searchParams.set('searchInCV', 'true')
              : currentURL.searchParams.delete('searchInCV')
            continue
          }

          if (filter === 'languages') {
            filterValue.has(true)
              ? currentURL.searchParams.set('inclusiveLang', 'true')
              : currentURL.searchParams.delete('inclusiveLang')
            continue
          }

          if (filter === 'hSkills') {
            filterValue.has(true)
              ? currentURL.searchParams.set('inclusiveH', 'true')
              : currentURL.searchParams.delete('inclusiveH')
            continue
          }

          if (filter === 'sSkills') {
            filterValue.has(true)
              ? currentURL.searchParams.set('inclusiveS', 'true')
              : currentURL.searchParams.delete('inclusiveS')
            continue
          }
          continue
        }

        if (typeof filterValue === 'string') {
          filterValue
            ? currentURL.searchParams.set(filter, filterValue)
            : currentURL.searchParams.delete(filter)
          continue
        }
      }
    }

    if ($searches) {
      for (const [search, searchValue] of Object.entries($searches)) {
        if (typeof searchValue === 'string') {
          searchValue !== ''
            ? currentURL.searchParams.set(search, searchValue)
            : currentURL.searchParams.delete(search)
          continue
        }
      }
    }

    void goto(`${currentURL.pathname}${currentURL.search}`)
  }
</script>

<div class="flex min-h-screen flex-col gap-5 bg-[#f0f0f0] p-5">
  <Navbar />
  <div class="flex flex-col-reverse gap-5 md:flex-row">
    <Filters />
    <Catalogue graduates={data.items} pages={data.paginate.pages} total={data.paginate.total} />
  </div>
</div>
