<script lang="ts">
  import CVBuilder from './CVBuilder.svelte'
  import CVPreview from './CVPreview.svelte'

  export let data
</script>

<main class="flex min-h-screen flex-col bg-[#F0F0F0] py-4">
  <div class="flex justify-center py-8 gap-10">
    <CVPreview profileData={data} />
    <CVBuilder profileData={data} />
  </div>
</main>
