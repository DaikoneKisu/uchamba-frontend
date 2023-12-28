<script lang="ts">
	import Dropdown from './Dropdown.svelte'
	import Checkbox from '$lib/components/Checkbox.svelte'
	let admin = false
	let communication = false
	let accountancy = false
	let law = false
	let education = false
	let civil = false
	let industrial = false
	let informatics = false
</script>

<Dropdown title="Formaciones Académicas">
	<ul class="flex flex-col gap-5 py-5">
		<li class="flex items-center gap-5 pl-2">
			<Checkbox bind:checked={admin} />
			<div>
				<p>Administración</p>
			</div>
		</li>
		<li class="flex items-center gap-5 pl-2">
			<Checkbox bind:checked={communication} />
			<div>
				<p>Comunicación Social</p>
			</div>
		</li>
		<li class="flex items-center gap-5 pl-2">
			<Checkbox bind:checked={accountancy} />
			<div>
				<p>Contaduría</p>
			</div>
		</li>
		<li class="flex items-center gap-5 pl-2">
			<Checkbox bind:checked={law} />
			<div>
				<p>Derecho</p>
			</div>
		</li>
		<li class="flex items-center gap-5 pl-2">
			<Checkbox bind:checked={education} />
			<div>
				<p>Educación</p>
			</div>
		</li>
		<li class="flex items-center gap-5 pl-2">
			<Checkbox bind:checked={civil} />
			<div>
				<p>Ingeniería Civil</p>
			</div>
		</li>
		<li class="flex items-center gap-5 pl-2">
			<Checkbox bind:checked={industrial} />
			<div>
				<p>Ingeniería Industrial</p>
			</div>
		</li>
		<li class="flex items-center gap-5 pl-2">
			<Checkbox bind:checked={informatics} />
			<div>
				<p>Ingeniería Informática</p>
			</div>
		</li>
	</ul>
</Dropdown>
