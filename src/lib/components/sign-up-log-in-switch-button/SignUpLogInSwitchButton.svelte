<script lang="ts">
  export let chosen: 'Iniciar sesión' | 'Registrarse'
  export let logInUrl: string
  export let signInUrl: string
</script>

<div class="mx-auto flex h-14 w-96 items-center justify-center rounded-xl bg-[#ebebeb]">
  {#if chosen === 'Registrarse'}
    <button class="h-[85%] w-[49%] rounded-xl">
      <a href={logInUrl}>Iniciar sesión</a>
    </button>
    <button class="h-[85%] w-[49%] rounded-xl bg-white">
      <a href={signInUrl}>Registrarse</a>
    </button>
  {:else if chosen === 'Iniciar sesión'}
    <button class="h-[85%] w-[49%] rounded-xl bg-white">
      <a href={logInUrl}>Iniciar sesión</a>
    </button>
    <button class="h-[85%] w-[49%] rounded-xl">
      <a href={signInUrl}>Registrarse</a>
    </button>
  {/if}
</div>
