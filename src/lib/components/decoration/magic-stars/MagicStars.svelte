<script lang="ts">
  import { onMount } from 'svelte'

  export let color: string

  let index = 0
  let interval = 1750

  const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

  const animate = (star: HTMLElement) => {
    star.style.setProperty('--star-left', `${rand(-10, 100)}%`)
    star.style.setProperty('--star-top', `${rand(-10, 100)}%`)

    star.style.animation = 'none'
    star.offsetHeight
    star.style.animation = ''
  }

  let stars: HTMLElement[] = []

  onMount(() => {
    for (const star of stars) {
      setTimeout(
        () => {
          star.style.setProperty('--color', color)

          animate(star as HTMLElement)

          setInterval(() => animate(star as HTMLElement), 1000)
        },
        index++ * (interval / 3)
      )
    }
  })
</script>

<div class="magic">
  <slot />

  <span class="magic-star" bind:this={stars[0]}>
    <svg viewBox="0 0 512 512">
      <path
        d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z"
      />
    </svg>
  </span>
  <span class="magic-star" bind:this={stars[1]}>
    <svg viewBox="0 0 512 512">
      <path
        d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z"
      />
    </svg>
  </span>
  <span class="magic-star" bind:this={stars[2]}>
    <svg viewBox="0 0 512 512">
      <path
        d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z"
      />
    </svg>
  </span>
</div>

<style>
  @keyframes background-pan {
    from {
      background-position: 0% center;
    }

    to {
      background-position: -200% center;
    }
  }

  @keyframes scale {
    from,
    to {
      transform: scale(0);
    }

    50% {
      transform: scale(1.5);
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(180deg);
    }
  }

  .magic {
    --color: #ffd200;
    display: inline-block;
    position: relative;
  }

  .magic > .magic-star {
    --size: clamp(20px, 1.5vw, 30px);

    animation: scale 700ms ease forwards;
    display: block;
    height: var(--size);
    left: var(--star-left);
    position: absolute;
    top: var(--star-top);
    width: var(--size);
  }

  .magic > .magic-star > svg {
    animation: rotate 1500ms linear infinite;
    display: block;
    opacity: 0.7;
  }

  .magic > .magic-star > svg > path {
    fill: var(--color);
  }
</style>
