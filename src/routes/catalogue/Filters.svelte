<script lang="ts">
	import CareersDropdown from './(filters)/CareersDropdown.svelte'
	import LocationDropdown from './(filters)/LocationDropdown.svelte'
	import LanguagesDropdown from './(filters)/LanguagesDropdown.svelte'
	import { filtersForm } from '$lib/stores/filters-form'
</script>

<section class="flex flex-col gap-5 w-full max-w-[378px] bg-brand-white p-4">
	<header class="border-b pl-2 pb-2">
		<h2>Filtrar por</h2>
	</header>
	<form
		data-sveltekit-replacestate
		id="filters"
		class="w-full flex flex-col gap-5"
		action="/catalogue"
		method="GET"
		bind:this={$filtersForm}
		on:submit|preventDefault
	>
		<CareersDropdown />
		<LocationDropdown />
		<LanguagesDropdown />
	</form>
</section>
