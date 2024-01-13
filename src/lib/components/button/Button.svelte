<script lang="ts">
  export let text: string
  export let handleClick: () => void = () => {}
</script>

<button
  class="h-[43px] w-full max-w-[168px] rounded-[10px] bg-green-700 text-white"
  on:click|preventDefault={() => handleClick()}
>
  {text}
</button>
