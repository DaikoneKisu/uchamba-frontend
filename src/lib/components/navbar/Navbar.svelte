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
	<nav class="bg-brand-white pt-4 pb-3 rounded-[0.3125rem]">
		<ul
			class="flex w-full text-center justify-around [&>li]:min-w-[150px] [&>li]:h-[28px] [&>li>a]:text-center"
		>
			<li>
				<a href="/" class="flex flex-col">
					Página Principal
					{#if currentPath === '/'}
						<div
							in:receive={{ key: 'line' }}
							out:send={{ key: 'line' }}
							class="h-[2px] w-10 bg-yellow-400 mx-auto"
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
							class="h-[2px] w-10 bg-yellow-400 mx-auto"
						/>
					{/if}
				</a>
			</li>
			{#if $page.data.isLoggedIn}
				<li class="flex justify-center items-start gap-1">
					<a href="/profile">
						Perfil
						{#if currentPath.startsWith('/profile')}
							<div
								in:receive={{ key: 'line' }}
								out:send={{ key: 'line' }}
								class="h-[2px] w-10 bg-yellow-400 mx-auto"
							/>
						{/if}
					</a>
					<MyProfileDropdown className="-mt-0.5" />
				</li>
			{:else}
				<li>
					<a href="/login" class="flex flex-col">
						Iniciar Sesión
						{#if currentPath === '/login'}
							<div
								in:receive={{ key: 'line' }}
								out:send={{ key: 'line' }}
								class="h-[2px] w-10 bg-yellow-400 mx-auto"
							/>
						{/if}
					</a>
				</li>
			{/if}
		</ul>
	</nav>
</header>
