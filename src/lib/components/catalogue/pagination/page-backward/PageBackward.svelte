<script lang="ts">
  import keyboardArrowLeftIcon from '$lib/icons/keyboard-arrow-left.svg'

  export let disabled = false
  export let href: string
</script>

<a {href}>
  <button
    class="h-10 w-10 rounded border border-[#bebebe] bg-brand-white text-center disabled:opacity-30"
    {disabled}
  >
    <img class="mx-auto" src={keyboardArrowLeftIcon} alt="Retroceder a página previa" />
  </button>
</a>
