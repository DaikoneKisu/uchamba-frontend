<script lang="ts">
  import underConstruction from '$lib/images/Page-under-construction.png'
  import roadblockSign from '$lib/images/Roadblock-sign.png'

  export let messagePrincipal = ''
  export let messageSecondary = ''
</script>

<main class="relative flex h-screen flex-col items-center justify-center">
  <section class="flex flex-col items-center justify-center gap-2">
    <h1 class="text-xl text-black sm:text-2xl md:text-3xl lg:text-4xl">{messagePrincipal}</h1>
    <h1 class="text-xl text-black sm:text-2xl md:text-3xl lg:text-4xl">{messageSecondary}</h1>
    <img
      class="h-[170px] w-[290px] md:h-[210px] md:w-[410px] lg:h-[350px] lg:w-[600px]"
      src={underConstruction}
      alt="Pagina bajo construccion img"
    />
    <h1 class="text-xl text-black sm:text-2xl md:text-3xl lg:text-4xl">
      ¡Gracias por su paciencia!
    </h1>
    <h1 class="text-xl text-black sm:text-2xl md:text-3xl lg:text-4xl">Seguimos trabajando</h1>
  </section>
  <img
    class="invisible absolute bottom-0 right-0 md:visible md:h-[155px] md:w-[241px] lg:visible lg:h-[200px] lg:w-[321px]"
    src={roadblockSign}
    alt="Señal de parada img"
  />
</main>
