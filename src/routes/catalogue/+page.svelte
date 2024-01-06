<script lang="ts">
	import Estructura from './structure.svelte'
	import { page } from '$app/stores'

	import type { CatalogueResponse } from '$lib/types/catalogue-response.type'

	import PageForward from '$lib/components/catalogue/pagination/page-forward/PageForward.svelte'
	import PageBackward from '$lib/components/catalogue/pagination/page-backward/PageBackward.svelte'
	import PageNumber from '$lib/components/catalogue/pagination/page-number/PageNumber.svelte'

	export let data: CatalogueResponse

	let pages = data.paginate.pages

	$: size = Number($page.url.searchParams.get('size')) || 10
	$: currentPage =
		Number($page.url.searchParams.get('page')) > 0 ? Number($page.url.searchParams.get('page')) : 1
	$: route = $page.route.id || ''
</script>

<Estructura business={data.items} />

<nav class="flex gap-4">
	<PageBackward
		href={`${route}?size=${size}&page=${currentPage - 1}`}
		disabled={currentPage <= 1}
	/>
	<!-- 
    Well, typescript-eslint's @typescript-eslint/no-unused-vars rule is disabled next line 
    because it says _ is a variable that's not being used, and while that's true, it has to 
    be there for destructuring and that's why it's named _ (common variable name for 
    variables that are not being used on purpose) 
  -->
	<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
	{#each Array(pages) as _, idx}
		<PageNumber
			pageNumber={idx + 1}
			highlight={currentPage === idx + 1}
			href={`${route}?size=${size}&page=${idx + 1}`}
		/>
	{/each}
	<PageForward
		href={`${route}?size=${size}&page=${currentPage + 1}`}
		disabled={currentPage >= pages}
	/>
</nav>
