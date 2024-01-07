<script lang="ts">
	import Dropdown from './Dropdown.svelte'
	import Checkbox from '$lib/components/Checkbox/Checkbox.svelte'
	import { slide } from 'svelte/transition'
	let state = false
	let city = false
	let input: HTMLInputElement
	let valueCity = ''
	let valueState = ''
	let valueCountry = ''
</script>

<Dropdown title="Localidad">
	<form
		on:submit={(e) => {
			e.preventDefault()
			alert('Se agrego el pais')
		}}
	>
		<div class="flex w-full justify-center gap-12">
			<label
				class="flex h-[49px] w-full max-w-[330px] justify-center rounded-xl border-4 border-[#f0f0f0] bg-brand-white pr-4 mt-4"
			>
				<div class="flex h-full w-full flex-col justify-center pl-5 text-[15px]">
					<input
						bind:this={input}
						type="text"
						bind:value={valueCountry}
						placeholder="Ingresa un pais"
						class="text-sm placeholder:text-brand-p-black focus:border-0 focus:shadow-none focus:outline-none bg-stone-50"
					/>
				</div>
			</label>
		</div>
	</form>
	<ul class="flex flex-col gap-5 py-5">
		<li class="flex items-center gap-5 pl-2">
			<Checkbox bind:checked={state} />
			<div>
				<p>Agregar un estado</p>
			</div>
		</li>
		{#if state}
			<div in:slide out:slide>
				<form
					on:submit={(e) => {
						e.preventDefault()
						alert('Se agrego el estado')
					}}
				>
					<div class="flex h-full w-full flex-col justify-center pl-5 text-[15px]">
						<label
							class="flex h-[49px] w-full max-w-[330px] justify-center rounded-xl border-4 border-[#f0f0f0] bg-brand-white pr-4"
						>
							<div class="flex h-full w-full flex-col justify-center pl-5 text-[15px]">
								<input
									bind:this={input}
									type="text"
									bind:value={valueState}
									placeholder="Ingresa un estado"
									class="text-sm placeholder:text-brand-p-black focus:border-0 focus:shadow-none focus:outline-none bg-stone-50"
								/>
							</div>
						</label>
					</div>
				</form>
			</div>
		{/if}
		<li class="flex items-center gap-5 pl-2">
			<Checkbox bind:checked={city} />
			<div>
				<p>Agregar una ciudad</p>
			</div>
		</li>
		{#if city}
			<div in:slide out:slide>
				<form
					on:submit={(e) => {
						e.preventDefault()
						alert('Se agrego la ciudad')
					}}
				>
					<div class="flex h-full w-full flex-col justify-center pl-5 text-[15px]">
						<label
							class="flex h-[49px] w-full max-w-[330px] justify-center rounded-xl border-4 border-[#f0f0f0] bg-brand-white pr-4"
						>
							<div class="flex h-full w-full flex-col justify-center pl-5 text-[15px]">
								<input
									bind:this={input}
									type="text"
									bind:value={valueCity}
									placeholder="Ingresa una ciudad"
									class="text-sm placeholder:text-brand-p-black focus:border-0 focus:shadow-none focus:outline-none bg-stone-50"
								/>
							</div>
						</label>
					</div>
				</form>
			</div>
		{/if}
	</ul>
</Dropdown>
