<script lang="ts">
	import { page } from '$app/stores'
	import { crossfade } from 'svelte/transition'

	let currentRoute: 'prueba1' | 'catalogue' | 'prueba2' = 'prueba1'

	$: currentRoute = $page.url.pathname.split('/').pop() as 'prueba1' | 'catalogue' | 'prueba2'

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200)
	})
</script>

<header class="w-full">
	<nav class="flex justify-between items-center bg-white p-2 rounded-[10px] mb-0">
		<ul
			class="w-full text-lg text-center max-w-xl flex justify-between [&>li]:min-w-[150px] [&>li>a]:py-5 [&>li>a]:text-center"
		>
			<li class="min-w-[150px] ml-32">
				<a
					href="/prueba1"
					class="relative w-[275px] h-[37px] text-center text-black text-[15px] font-bold font-['Source Sans Pro'] leading-[37s.50px]"
				>
					Página Principal
					{#if currentRoute === 'prueba1'}
						<div
							in:receive={{ key: 'line' }}
							out:send={{ key: 'line' }}
							class="h-[2px] w-10 bg-yellow-400 absolute translate-y-0 ml-12"
						/>
					{/if}
				</a>
			</li>
			<li class="min-w-[150px] ml-72"> 
				<a
					href="/catalogue"
					class="relative w-[275px] h-[37px] text-center text-black text-[15px] font-bold font-['Source Sans Pro'] leading-[37s.50px]"
				>
					Catálogo
					{#if currentRoute === 'catalogue'}
						<div
							in:receive={{ key: 'line' }}
							out:send={{ key: 'line' }}
							class="h-[2px] w-10 bg-yellow-400 absolute translate-y-0 ml-12"
						/>
					{/if}
				</a>
			</li>
			<li class="min-w-[150px] ml-48">
				<a
					href="/prueba2"
					class="relative w-[275px] h-[37px] text-center text-black text-[15px] font-bold font-['Source Sans Pro'] leading-[37s.50px]"
				>
					Iniciar Sesión
					{#if currentRoute === 'prueba2'}
						<div
							in:receive={{ key: 'line' }}
							out:send={{ key: 'line' }}
							class="h-[2px] w-10 bg-yellow-400 absolute translate-y-0 ml-12"
						/>
					{/if}
				</a>
			</li>
		</ul>
	</nav>
</header>
