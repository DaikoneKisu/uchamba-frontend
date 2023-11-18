<script lang="ts">
	import type { ProfileEntry } from '../../../types/profile-entry.type'

	export let title: string
	export let entries: ProfileEntry[]
</script>

<article class="flex flex-col w-full">
	<header class="flex justify-between text-lg bg-gray-600 text-white px-6 py-3 rounded-t-xl">
		<h3>{title}</h3>
		<button>+</button>
	</header>
	<ul class="bg-gray-100 px-6 pt-3 rounded-b-xl pb-2">
		{#each entries as e}
			<li class="flex justify-between border-b-2 py-2 last:border-none">
				<h4>{e.title}</h4>
				<button>V</button>
			</li>
		{/each}
	</ul>
</article>
