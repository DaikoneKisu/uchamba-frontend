<script lang="ts">
  import { page } from '$app/stores'
  import { crossfade } from 'svelte/transition'
  import Logo from '$lib/icons/logo.svg'
  let currentRoute: 'inicio' | 'beneficios' | 'objetivo' | '/' = 'inicio'

  $: currentRoute = $page.url.pathname.split('/').pop() as
    | 'inicio'
    | 'beneficios'
    | 'objetivo'
    | '/'

  const [send, receive] = crossfade({
    duration: (d) => Math.sqrt(d * 200)
  })
</script>

<header class="w-full">
  <nav class="mb-0 flex items-center justify-between rounded-[5px] bg-white p-3">
    <div class="absolute top-1">
      <img class="w-[167px] h-[65px]" alt="" src={Logo} />
    </div>
    <ul
      class="flex w-full max-w-xl justify-between text-center text-lg [&>li>a]:py-5 [&>li>a]:text-center [&>li]:min-w-[150px]"
    >
      <li class="ml-60 min-w-[150px]">
        <a
          href="/landing/inicio"
          class="font-['Source Sans Pro'] relative h-[37px] w-[275px] text-center text-[15px] font-bold leading-[37s.50px] text-black"
        >
          Inicio
          {#if currentRoute === 'inicio'}
            <div
              in:receive={{ key: 'line' }}
              out:send={{ key: 'line' }}
              class="absolute ml-14 h-[2px] w-8 translate-y-0 bg-ucab-yellow"
            />
          {/if}
        </a>
      </li>
      <li class="ml-24 min-w-[150px]">
        <a
          href="/landing/beneficios"
          class="font-['Source Sans Pro'] relative h-[37px] w-[275px] text-center text-[15px] font-bold leading-[37s.50px] text-black"
        >
          Beneficios
          {#if currentRoute === 'beneficios'}
            <div
              in:receive={{ key: 'line' }}
              out:send={{ key: 'line' }}
              class="absolute ml-14 h-[2px] w-8 translate-y-0 bg-ucab-yellow"
            />
          {/if}
        </a>
      </li>
      <li class="ml-36 min-w-[150px]">
        <a
          href="/landing/objetivo"
          class="font-['Source Sans Pro'] relative h-[37px] w-[275px] text-center text-[15px] font-bold leading-[37s.50px] text-black"
        >
          Objetivos
          {#if currentRoute === 'objetivo'}
            <div
              in:receive={{ key: 'line' }}
              out:send={{ key: 'line' }}
              class="absolute ml-14 h-[2px] w-8 translate-y-0 bg-ucab-yellow"
            />
          {/if}
        </a>
      </li>
      <li class="ml-36 min-w-[150px]">
        <a
          href="/"
          class="font-['Source Sans Pro'] relative h-[37px] w-[275px] text-center text-[15px] font-bold leading-[37s.50px] text-black"
        >
          Iniciar sesion
          {#if currentRoute === '/'}
            <div
              in:receive={{ key: 'line' }}
              out:send={{ key: 'line' }}
              class="absolute ml-14 h-[2px] w-8 translate-y-0 bg-ucab-yellow"
            />
          {/if}
        </a>
      </li>
    </ul>
  </nav>
</header>
