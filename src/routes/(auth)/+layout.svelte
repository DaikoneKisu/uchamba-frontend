<script lang="ts">
  import ucabLogo from '$lib/images/logo-ucab.webp'
  import firstLoginImage from '$lib/images/login-image-one.png'
  import secondLoginImage from '$lib/images/login-image-two.png'
</script>

<main class="flex min-h-screen flex-col items-center justify-start gap-10 pb-24 pt-10">
  <img src={ucabLogo} alt="logo de la ucab" class="aspect-[497/75] max-w-[497px] overflow-hidden" />

  <div class="flex flex-col items-center justify-center">
    <div class="flex flex-col gap-3">
      <h1 class="text-center">Bienvenido de regreso</h1>
      <h2 class="text-center text-zinc-400">A nuestro catálogo de egresados en línea</h2>
    </div>

    <div class="invisible -z-10 xl:visible">
      <img src={firstLoginImage} alt="" class="absolute right-72 top-40" />
      <img src={secondLoginImage} alt="" class="absolute bottom-12 left-64" />
    </div>

    <slot />
  </div>
</main>
