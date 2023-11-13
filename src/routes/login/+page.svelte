<script lang=ts>
  import Form from "./Form.svelte";

  let email: string
  let password: string
</script>

<Form bind:email={email} bind:password={password} />
