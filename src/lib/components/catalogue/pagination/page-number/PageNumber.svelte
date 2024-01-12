<script lang="ts">
  export let pageNumber: number
  export let highlight = false
  export let href: string
</script>

<a {href}>
  {#if highlight}
    <button
      class="h-10 w-10 rounded border border-ucab-blue bg-[#e9e1ff] text-center text-ucab-blue"
    >
      {pageNumber}
    </button>
  {:else}
    <button class="h-10 w-10 rounded border border-[#bebebe] bg-brand-white text-center">
      {pageNumber}
    </button>
  {/if}
</a>
