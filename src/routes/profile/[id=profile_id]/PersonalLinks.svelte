<script lang="ts">
	import { slide } from 'svelte/transition'

	import type { PersonalLink } from '$lib/types/profile-data.type'

	import Add from '$lib/components/profile/add/Add.svelte'
	import PersonalLinkCreationModal from './PersonalLinkCreationModal.svelte'

	import deleteIcon from '$lib/icons/delete.svg'

	export let links: PersonalLink[]

	export let isEditable: boolean

	let openedModal = false

	async function handleDelete(id: number) {
		try {
			links = links.filter((l) => l.linkId !== id)

			const res = await fetch('/api/profile/personal-links/delete', {
				method: 'DELETE',
				body: JSON.stringify({ id })
			})

			const resBody = await res.json()

			if (!res.ok) throw new Error(resBody?.message)
		} catch (error) {
			if (error instanceof Error && error.message) alert(error.message)
			else alert('Hubo un error en el servidor al intentar eliminar el link de interés')
		}
	}

	function openModal() {
		openedModal = true
	}
</script>

<section class="w-full rounded-[20px] bg-brand-white px-6 pb-12 pt-4">
	<div class="flex flex-col gap-2">
		<div
			class="flex w-full items-center justify-between border-b-4 border-ucab-blue pb-2 text-left font-poppins text-2xl"
		>
			<h2>Links de Interés</h2>
			{#if isEditable}
				<Add clickHandler={openModal} />
			{/if}
		</div>
		<ul class="mt-5 flex w-full flex-col gap-5">
			{#each links as l}
				<li in:slide out:slide class="flex justify-between">
					<a href={l.url} class="mr-8 overflow-x-hidden whitespace-nowrap text-blue-500 underline"
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
