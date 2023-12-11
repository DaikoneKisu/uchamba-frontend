<script lang="ts">
	import deleteIcon from '$lib/icons/delete.svg'
	import Add from '$lib/components/profile/add/Add.svelte'
	import type { PersonalLink } from '../../types/profile-data.type'
	import PersonalLinkCreationModal from './PersonalLinkCreationModal.svelte'
	import { slide } from 'svelte/transition'

	export let links: PersonalLink[]

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
			class="text-left w-full flex justify-between text-2xl font-poppins border-b-4 border-ucab-blue pb-2"
		>
			<h2>Enlaces de Interés</h2>
			<Add clickHandler={openModal} />
		</div>
		<ul class="w-full flex flex-col gap-3 mt-3">
			{#each links as l}
				<li in:slide out:slide class="flex justify-between">
					<a href={l.url} class="underline text-blue-500">{l.url}</a>
					<button
						on:click={() => {
							handleDelete(l.linkId)
						}}
					>
						<img src={deleteIcon} alt="Eliminar enlace" />
					</button>
				</li>
			{/each}
		</ul>
	</div>
</section>

<PersonalLinkCreationModal bind:openedModal />
