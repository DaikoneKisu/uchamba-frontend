<script lang="ts">
	import deleteIcon from '$lib/icons/delete.svg'
	import Add from '$lib/components/profile/add/Add.svelte'
	import type { PersonalLink } from '$lib/types/profile-data.type'
	import PersonalLinkCreationModal from './PersonalLinkCreationModal.svelte'
	import { slide } from 'svelte/transition'

	export let links: PersonalLink[]

	export let isEditable: boolean

	let openedModal = false

	async function handleDelete(id: number) {
		try {
			links = links.filter((l) => l.linkId !== id)

			const res = await fetch('/api/profile/personal-links/delete', {
				method: 'POST',
				body: JSON.stringify({ id })
			})
			if (!res.ok) throw new Error('Error al eliminar la formación académica')
		} catch (error) {
			alert(error)
		}
	}

	function openModal() {
		openedModal = true
	}
</script>

<section class="bg-brand-white w-full px-6 pt-4 pb-12 rounded-[20px]">
	<div class="flex flex-col gap-2">
		<div
			class="text-left w-full flex justify-between items-center text-2xl font-poppins border-b-4 border-ucab-blue pb-2"
		>
			<h2>Links de Interés</h2>
			{#if isEditable}
				<Add clickHandler={openModal} />
			{/if}
		</div>
		<ul class="w-full flex flex-col gap-5 mt-5">
			{#each links as l}
				<li in:slide out:slide class="flex justify-between">
					<a href={l.url} class="underline text-blue-500 whitespace-nowrap overflow-x-hidden mr-8"
						>{l.url}</a
					>
					{#if isEditable}
						<button
							on:click={() => {
								handleDelete(l.linkId)
							}}
						>
							<img src={deleteIcon} alt="Eliminar enlace" class="min-w-[30px]" />
						</button>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</section>

{#if isEditable}
	<PersonalLinkCreationModal bind:openedModal />
{/if}
