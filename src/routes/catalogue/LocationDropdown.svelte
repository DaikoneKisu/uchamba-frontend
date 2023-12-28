<script lang="ts">
	import Dropdown from './Dropdown.svelte'
	import Checkbox from '$lib/components/Checkbox.svelte'
	let state = false
	let city = false
	let input: HTMLInputElement
	let value: string
</script>

<Dropdown title="Localidad">
	<label
		class="flex h-[49px] w-full max-w-[330px] justify-center rounded-xl border-4 border-[#f0f0f0] bg-brand-white pr-4 mt-4"
	>
		<form class="flex h-full w-full flex-col justify-center pl-5 text-[15px]">
			<input
				bind:this={input}
				type="text"
				bind:value
				placeholder="Ingresa un pais"
				class="text-sm placeholder:text-brand-p-black focus:border-0 focus:shadow-none focus:outline-none bg-stone-50"
			/>
		</form>
	</label>
	<ul class="flex flex-col gap-5 py-5">
		<li class="flex items-center gap-5 pl-2">
			<Checkbox bind:checked={state} />
			<div>
				<p>Agregar un estado</p>
			</div>
		</li>
		{#if state}
			<label
				class="flex h-[49px] w-full max-w-[330px] justify-center rounded-xl border-4 border-[#f0f0f0] bg-brand-white pr-4 "
			>
				<form class="flex h-full w-full flex-col justify-center pl-5 text-[15px]">
					<input
						bind:this={input}
						type="text"
						bind:value
						placeholder="Ingresa un estado"
						class="text-sm placeholder:text-brand-p-black focus:border-0 focus:shadow-none focus:outline-none bg-stone-50"
					/>
				</form>
			</label>
		{/if}
		<li class="flex items-center gap-5 pl-2">
			<Checkbox bind:checked={city} />
			<div>
				<p>Agregar una ciudad</p>
			</div>
		</li>
		{#if city}
			<label
				class="flex h-[49px] w-full max-w-[330px] justify-center rounded-xl border-4 border-[#f0f0f0] bg-brand-white pr-4 "
			>
				<form class="flex h-full w-full flex-col justify-center pl-5 text-[15px]">
					<input
						bind:this={input}
						type="text"
						bind:value
						placeholder="Ingresa una ciudad"
						class="text-sm placeholder:text-brand-p-black focus:border-0 focus:shadow-none focus:outline-none bg-stone-50"
					/>
				</form>
			</label>
		{/if}
	</ul>
</Dropdown>
