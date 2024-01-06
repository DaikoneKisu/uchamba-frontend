<script>
	import '../app.css'
	import { onMount } from 'svelte'
	import UnderConstruction from '../lib/components/error-pages/UnderConstruction.svelte'

	let isSmallScreen = false

	onMount(() => {
		isSmallScreen = window.innerWidth <= 1150
		window.addEventListener('resize', () => {
			isSmallScreen = window.innerWidth <= 1150
		})
	})
</script>

{#if isSmallScreen}
	<UnderConstruction messagePrincipal="Visítanos desde una computadora" messageSecondary="La versión móvil está bajo construcción" />
{:else}
	<slot />
{/if}
