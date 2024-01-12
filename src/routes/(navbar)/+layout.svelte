<script lang="ts">
  import Navbar from '$lib/components/navbar/Navbar.svelte'
</script>

<div class="flex min-h-screen flex-col gap-5 bg-[#f0f0f0] p-5">
  <Navbar />
  <slot />
</div>
