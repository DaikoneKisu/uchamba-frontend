<script lang="ts">
	import cancelIcon from '$lib/icons/cancel.svg'

	export let text: string
	export let key: string
	export let deleteHandler: () => void
</script>

<div
	id={key}
	class="flex items-center gap-3 bg-ucab-green px-4 py-2 max-h-[40px] text-brand-white rounded-full"
>
	{text}
	<button on:click={deleteHandler}>
		<img src={cancelIcon} alt="Eliminar chip" />
	</button>
</div>
