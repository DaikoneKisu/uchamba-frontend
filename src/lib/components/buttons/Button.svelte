<script lang="ts">
	export let text: string
	export let handleClick: () => void = () => {}
</script>

<button
	class="w-full max-w-[168px] h-[43px] bg-green-700 rounded-[10px] text-white"
	on:click|preventDefault={() => handleClick()}
>
	{text}
</button>
