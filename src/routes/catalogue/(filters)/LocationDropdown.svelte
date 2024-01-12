<script lang="ts">
	import { slide } from 'svelte/transition'

	import Checkbox from '$lib/components/checkbox/Checkbox.svelte'
	import Dropdown from './Dropdown.svelte'
	import { locationFilter } from '$lib/stores/filters'

	let country = ''
	let state = ''
	let city = ''
	let stateChecked = false
	let cityChecked = false

	$: if (country.trim() === '') {
		stateChecked = false
	}

	$: if (state.trim() === '') {
		cityChecked = false
	}

	$: if (!stateChecked) {
		state = ''
	}

	$: if (!cityChecked) {
		city = ''
	}
</script>

<Dropdown title="Localidad">
	<div class="flex flex-col gap-3 pt-4 pb-2">
		<div class="flex w-full justify-center">
			<label
				class="flex h-[49px] w-full max-w-[330px] justify-center rounded-xl border-4 border-[#f0f0f0] bg-brand-white pr-4"
			>
				<div class="flex h-full w-full flex-col justify-center pl-5 text-[15px]">
					<input
						data-sveltekit-keepfocus
						autocomplete="country-name"
						form="filters"
						type="text"
						value={country}
						placeholder="Ingresa un pais"
						class="placeholder:text-brand-p-black focus:border-0 focus:shadow-none focus:outline-none bg-brand-white disabled:opacity-50"
						on:input={(e) => {
							country = e.currentTarget.value.trim()
						}}
						on:change={() => {
							locationFilter.set({ country, state, city })
						}}
					/>
				</div>
			</label>
		</div>
		<div class="flex items-center gap-5 pl-2">
			<Checkbox bind:checked={stateChecked} disabled={country.trim() === ''} />
			<p>Agregar un estado</p>
		</div>
		{#if stateChecked}
			<div
				transition:slide
				on:outrostart={() => locationFilter.set({ country, state, city })}
				class="flex w-full justify-center"
			>
				<label
					class="flex h-[49px] w-full max-w-[330px] justify-center rounded-xl border-4 border-[#f0f0f0] bg-brand-white pr-4"
				>
					<div class="flex h-full w-full flex-col justify-center pl-5 text-[15px]">
						<input
							data-sveltekit-keepfocus
							autocomplete="address-level1"
							form="filters"
							type="text"
							value={state}
							placeholder="Ingresa un estado"
							class="placeholder:text-brand-p-black bg-brand-white focus:border-0 focus:shadow-none focus:outline-none disabled:opacity-50"
							disabled={country.trim() === ''}
							on:input={(e) => {
								state = e.currentTarget.value.trim()
							}}
							on:change={() => {
								locationFilter.set({ country, state, city })
							}}
						/>
					</div>
				</label>
			</div>
		{/if}
		<div class="flex items-center gap-5 pl-2">
			<Checkbox bind:checked={cityChecked} disabled={state.trim() === ''} />
			<p>Agregar una ciudad</p>
		</div>
		{#if cityChecked}
			<div
				transition:slide
				on:outrostart={() => locationFilter.set({ country, state, city })}
				class="flex w-full justify-center"
			>
				<label
					class="flex h-[49px] w-full max-w-[330px] justify-center rounded-xl border-4 border-[#f0f0f0] bg-brand-white pr-4"
				>
					<div class="flex h-full w-full flex-col justify-center pl-5 text-[15px]">
						<input
							data-sveltekit-keepfocus
							autocomplete="address-level2"
							form="filters"
							type="text"
							value={city}
							placeholder="Ingresa una ciudad"
							class="placeholder:text-brand-p-black focus:border-0 focus:shadow-none focus:outline-none bg-brand-white disabled:opacity-50"
							disabled={state.trim() === ''}
							on:input={(e) => {
								city = e.currentTarget.value.trim()
							}}
							on:change={() => {
								locationFilter.set({ country, state, city })
							}}
						/>
					</div>
				</label>
			</div>
		{/if}
	</div>
</Dropdown>
