<script lang="ts">
  import { page } from '$app/stores'
  import { crossfade } from 'svelte/transition'

  import MyProfileDropdown from '../MyProfileDropdown.svelte'

  let currentPath = 'catalogue'

  $: currentPath = $page.url.pathname

  const [send, receive] = crossfade({
    duration: (d) => Math.sqrt(d * 200)
  })
</script>

<header class="flex flex-col gap-5">
  <nav class="rounded-[0.3125rem] bg-brand-white pb-3 pt-4">
    <ul
      class="flex w-full justify-around text-center [&>li>a]:text-center [&>li]:h-[28px] [&>li]:min-w-[150px]"
    >
      <li>
        <a href="/" class="flex flex-col">
          Página Principal
          {#if currentPath === '/'}
            <div
              in:receive={{ key: 'line' }}
              out:send={{ key: 'line' }}
              class="mx-auto h-[2px] w-10 bg-yellow-400"
            />
          {/if}
        </a>
      </li>
      <li>
        <a href="/catalogue" class="flex flex-col">
          Catálogo
          {#if currentPath === '/catalogue'}
            <div
              in:receive={{ key: 'line' }}
              out:send={{ key: 'line' }}
              class="mx-auto h-[2px] w-10 bg-yellow-400"
            />
          {/if}
        </a>
      </li>
      {#if $page.data.isLoggedIn}
        <li>
          <label class="flex cursor-pointer items-start justify-center gap-1">
            Perfil
            {#if currentPath.startsWith('/profile')}
              <div
                in:receive={{ key: 'line' }}
                out:send={{ key: 'line' }}
                class="mx-auto h-[2px] w-10 bg-yellow-400"
              />
            {/if}
            <MyProfileDropdown className="-mt-0.5" />
          </label>
        </li>
      {:else}
        <li>
          <a href="/login" class="flex flex-col">
            Iniciar Sesión
            {#if currentPath === '/login'}
              <div
                in:receive={{ key: 'line' }}
                out:send={{ key: 'line' }}
                class="mx-auto h-[2px] w-10 bg-yellow-400"
              />
            {/if}
          </a>
        </li>
      {/if}
    </ul>
  </nav>
</header>
