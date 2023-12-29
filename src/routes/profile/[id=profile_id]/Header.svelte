<script lang="ts">
  import { page } from '$app/stores'
  import { crossfade } from 'svelte/transition'

  let currentRoute: 'education' | 'experience' | 'portfolio' = 'education'

  $: currentRoute = $page.url.pathname.split('/').pop() as 'education' | 'experience' | 'portfolio'

  const profileId = $page.url.pathname.split('/')[2]

  const [send, receive] = crossfade({
    duration: (d) => Math.sqrt(d * 200)
  })
</script>

<header class="my-10 w-full font-poppins font-semibold">
  <nav class="flex w-full items-center justify-center px-5">
    <ul
      class="flex w-full max-w-xl justify-evenly text-center text-lg [&>li>a]:py-5 [&>li>a]:text-center [&>li]:min-w-[150px]"
    >
      <li>
        <a
          href={`/profile/${profileId}/education`}
          class="flex h-full w-full flex-col items-center justify-center gap-2 uppercase"
          >EDUCACIÓN
          {#if currentRoute === 'education'}
            <div
              in:receive={{ key: 'line' }}
              out:send={{ key: 'line' }}
              class="absolute h-[2px] w-10 translate-y-4 bg-ucab-yellow"
            />
          {/if}
        </a>
      </li>
      <li>
        <a
          href={`/profile/${profileId}/experience`}
          class="flex h-full w-full flex-col items-center justify-center gap-2 uppercase"
          >EXPERIENCIA
          {#if currentRoute === 'experience'}
            <div
              in:receive={{ key: 'line' }}
              out:send={{ key: 'line' }}
              class="absolute h-[2px] w-10 translate-y-4 bg-ucab-yellow"
            />
          {/if}
        </a>
      </li>
      <li>
        <a
          href={`/profile/${profileId}/portfolio`}
          class="flex h-full w-full flex-col items-center justify-center gap-2"
          >PORTAFOLIO
          {#if currentRoute === 'portfolio'}
            <div
              in:receive={{ key: 'line' }}
              out:send={{ key: 'line' }}
              class="absolute h-[2px] w-10 translate-y-4 bg-ucab-yellow"
            />
          {/if}
        </a>
      </li>
    </ul>
  </nav>
</header>
