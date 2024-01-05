<script lang="ts">
  import '../app.css'
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Poppins:wght@500;600;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="flex min-h-screen flex-col p-5">
  <slot />
</div>
