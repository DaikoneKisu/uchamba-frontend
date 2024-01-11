<script lang="ts">
	import { page } from '$app/stores'
	import { browser } from '$app/environment'

	import PageBackward from '$lib/components/catalogue/pagination/page-backward/PageBackward.svelte'
	import PageNumber from '$lib/components/catalogue/pagination/page-number/PageNumber.svelte'
	import PageForward from '$lib/components/catalogue/pagination/page-forward/PageForward.svelte'

	export let className = ''
	export let pages: number

	$: currentPage =
		Number($page.url.searchParams.get('page')) > 0 ? Number($page.url.searchParams.get('page')) : 1

	function getRouteUpdatingPageParam(page: number) {
		if (browser) {
			let currentURL = new URL(window.location.href)

			return currentURL.searchParams.has('page')
				? (() => {
						currentURL.searchParams.set('page', page.toString())
						return `${currentURL.pathname}${currentURL.search}`
				  })()
				: currentURL.search
				? `${currentURL.pathname}${currentURL.search}&page=${page}`
				: `${currentURL.pathname}?page=${page}`
		}
		return ''
	}
</script>

<nav class={`flex flex-wrap gap-4 ${className}`}>
	{#key $page}
		<PageBackward
			href={(() => getRouteUpdatingPageParam(currentPage - 1))()}
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
				href={(() => getRouteUpdatingPageParam(idx + 1))()}
				pageNumber={idx + 1}
				highlight={currentPage === idx + 1}
			/>
		{/each}
		<PageForward
			href={(() => getRouteUpdatingPageParam(currentPage + 1))()}
			disabled={currentPage >= pages}
		/>
	{/key}
</nav>
