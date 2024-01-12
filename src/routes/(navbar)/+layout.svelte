<script lang="ts">
	import Navbar from '$lib/components/navbar/Navbar.svelte'
</script>

<div class="flex flex-col gap-5 min-h-screen p-5 bg-[#f0f0f0]">
	<Navbar />
	<slot />
</div>
