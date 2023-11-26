<script lang="ts">
	import cancelIcon from '$lib/icons/cancel-black.svg'
	import { fade, scale } from 'svelte/transition'

	export let isOpen: Boolean
	export let title = ''
	export let subtitle = ''
	export let icon = ''

	function closeModal() {
		isOpen = false
	}
</script>

{#if isOpen}
	<div
		in:fade={{ duration: 100 }}
		out:fade={{ duration: 100 }}
		class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
	>
		<div
			in:scale
			class="bg-white py-4 rounded-[20px] shadow justify-center items-center max-w-[802px] w-[90%]"
		>
			<header
				class="flex w-full justify-between items-center px-8 border-b-2 border-[#f3f3f3] pb-5 pt-3"
			>
				<div class="flex justify-start gap-6 w-full">
					<img src={icon} alt="" />
					<div class="flex flex-col">
						<h2 class="m-0 font-poppins">{title}</h2>
						<p class="text-brand-p-black">{subtitle}</p>
					</div>
				</div>
				<button class="text-red-500" on:click={closeModal}
					><img src={cancelIcon} alt="Cerrar modal" /></button
				>
			</header>

			<slot name="body" />

			<slot name="footer" />
		</div>
	</div>
{/if}
