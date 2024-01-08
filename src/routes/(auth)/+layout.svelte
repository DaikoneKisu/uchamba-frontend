<script lang="ts">
  import logoUcab from '$lib/images/logo-ucab.webp'
  import loginOne from '$lib/images/login-one.png'
</script>

<svelte:head>
  <link rel="preload" href={logoUcab} />
  <link rel="preload" href={loginOne} />
</svelte:head>

<div class="flex min-h-screen items-center p-5 min-[969px]:max-xl:gap-14">
  <main
    class="flex flex-col items-center max-[968px]:mx-auto max-[968px]:h-full max-[968px]:w-full max-[968px]:self-center min-[969px]:my-auto min-[969px]:basis-1/2"
  >
    <div class="mb-9 aspect-[498/75] max-w-[498px]">
      <img src={logoUcab} alt="logo de la ucab" class="h-full w-full object-fill" />
    </div>
    <div class="mb-12 flex flex-col items-center gap-6">
      <h1 class="text-center">Bienvenido de regreso</h1>
      <h2 class="max-w-[445px] text-center">A nuestro catálogo de egresados en línea</h2>
    </div>
    <slot />
  </main>
  <div
    class="flex max-h-[calc(100vh-2.5rem)] flex-grow justify-center max-[968px]:hidden max-[968px]:w-0"
  >
    <img
      class="my-auto h-fit max-h-[calc(100vh-2.5rem)] rounded-[10px] rounded-bl-[190px] object-contain"
      src={loginOne}
      alt=""
    />
  </div>
</div>
