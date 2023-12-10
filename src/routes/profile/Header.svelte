<script lang="ts">
	import { page } from '$app/stores'
	import { crossfade } from 'svelte/transition'

	let currentRoute: 'education' | 'experience' | 'portafolio' = 'education'

	$: currentRoute = $page.url.pathname.split('/').pop() as 'education' | 'experience' | 'portafolio'

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200)
	})
</script>

<header class="w-full my-10 font-poppins font-semibold">
	<nav class="w-full flex items-center justify-center px-5">
		<ul
			class="w-full text-lg text-center max-w-xl flex justify-evenly [&>li]:min-w-[150px] [&>li>a]:py-5 [&>li>a]:text-center"
		>
			<li>
				<a
					href="/profile/education"
					class="flex flex-col justify-center items-center w-full h-full gap-2"
					>EDUCACIÓN
					{#if currentRoute === 'education'}
						<div
							in:receive={{ key: 'line' }}
							out:send={{ key: 'line' }}
							class="h-[2px] w-10 bg-ucab-yellow absolute translate-y-4"
						/>
					{/if}
				</a>
			</li>
			<li>
				<a
					href="/profile/experience"
					class="flex flex-col justify-center items-center w-full h-full gap-2"
					>EXPERIENCIA
					{#if currentRoute === 'experience'}
						<div
							in:receive={{ key: 'line' }}
							out:send={{ key: 'line' }}
							class="h-[2px] w-10 bg-ucab-yellow absolute translate-y-4"
						/>
					{/if}
				</a>
			</li>
			<li>
				<a
					href="/profile/portafolio"
					class="flex flex-col justify-center items-center w-full h-full gap-2"
					>PORTAFOLIO
					{#if currentRoute === 'portafolio'}
						<div
							in:receive={{ key: 'line' }}
							out:send={{ key: 'line' }}
							class="h-[2px] w-10 bg-ucab-yellow absolute translate-y-4"
						/>
					{/if}
				</a>
			</li>
		</ul>
	</nav>
</header>
