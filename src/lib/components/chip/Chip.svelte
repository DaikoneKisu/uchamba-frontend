<script lang="ts">
    import cancelIcon from '$lib/icons/cancel.svg'
    import { expand, shrink } from './expand'
  
    export let text: string
    export let key: string
    export let animation: boolean = true
    export let deleteHandler: () => void
  
    let hovered = false
  
    let chip: HTMLElement
  </script>
  
  {#if animation}
    <article
      id={key}
      bind:this={chip}
      class="flex max-h-[40px] items-center gap-3 whitespace-nowrap rounded-full bg-ucab-green px-4 py-2 text-brand-white shadow-xl transition-all hover:bg-green-600 hover:shadow-lg hover:shadow-green-200"
      on:mouseenter={() => (hovered = true)}
      on:mouseleave={() => (hovered = false)}
      use:expand={hovered}
    >
      <b class="font-normal">{text}</b>
  
      {#if hovered}
        <button on:click={deleteHandler}>
          <img src={cancelIcon} alt="Eliminar chip" />
        </button>
      {/if}
    </article>
    <div class="w-[40px]" use:shrink={!hovered} />
  {:else}
    <article
      id={key}
      bind:this={chip}
      class="flex max-h-[40px] items-center gap-3 whitespace-nowrap rounded-full bg-ucab-green px-4 py-2 text-brand-white shadow-xl transition-all hover:bg-green-600 hover:shadow-lg hover:shadow-green-200"
    >
      <b class="font-normal">{text}</b>
    </article>
    <div class="w-[40px]" />
  {/if}
  