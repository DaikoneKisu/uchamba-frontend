<script lang="ts">
  import Header from './Header.svelte'
  import CVBuilder from './CVBuilder.svelte'
  import CVPreview from './CVPreview.svelte'

  export let data
</script>

<main class="flex flex-col py-8">
  <Header />
  <div class="flex justify-around py-8">
    <CVPreview />
    <CVBuilder profileData={data} />
  </div>
</main>
