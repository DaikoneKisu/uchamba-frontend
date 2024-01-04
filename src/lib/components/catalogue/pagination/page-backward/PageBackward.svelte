<script lang="ts">
	import keyboardArrowLeftIcon from '$lib/icons/keyboard-arrow-left.svg'

	export let disabled = false
	export let href: string
</script>

<a {href}>
	<button
		class="w-10 h-10 bg-brand-white border border-[#bebebe] rounded text-center disabled:opacity-30"
		{disabled}
	>
		<img class="mx-auto" src={keyboardArrowLeftIcon} alt="Retroceder a página previa" />
	</button>
</a>
