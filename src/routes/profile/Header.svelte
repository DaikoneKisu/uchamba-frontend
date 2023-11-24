<script lang="ts">
	import { page } from '$app/stores'
	import { crossfade } from 'svelte/transition'

	let currentRoute: 'education' | 'experience' | 'portfolio' = 'education'

	$: currentRoute = $page.url.pathname.split('/').pop() as 'education' | 'experience' | 'portfolio'

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200)
	})
</script>

<header class="w-full my-10 font-poppins font-semibold">
	<nav class="w-full flex items-center justify-center px-5">
		<ul
			class="w-full max-w-md flex justify-evenly [&>li]:min-w-[150px] [&>li>a]:py-5 [&>li>a]:text-center"
		>
			<li>
				<a
					href="/profile/education"
					class="flex flex-col justify-center items-center w-full h-full gap-2"
					>Educación
					{#if currentRoute === 'education'}
						<div
							in:receive={{ key: 'line' }}
							out:send={{ key: 'line' }}
							class="h-[2px] w-10 bg-ucab-yellow"
						/>
					{/if}
				</a>
			</li>
			<li>
				<a
					href="/profile/experience"
					class="flex flex-col justify-center items-center w-full h-full gap-2"
					>Experiencia
					{#if currentRoute === 'experience'}
						<div
							in:receive={{ key: 'line' }}
							out:send={{ key: 'line' }}
							class="h-[2px] w-10 bg-ucab-yellow"
						/>
					{/if}
				</a>
			</li>
			<li>
				<a
					href="/profile/portfolio"
					class="flex flex-col justify-center items-center w-full h-full gap-2"
					>Portfolio
					{#if currentRoute === 'portfolio'}
						<div
							in:receive={{ key: 'line' }}
							out:send={{ key: 'line' }}
							class="h-[2px] w-10 bg-ucab-yellow"
						/>
					{/if}
				</a>
			</li>
		</ul>
	</nav>
</header>
