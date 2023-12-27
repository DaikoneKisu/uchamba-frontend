<script lang='ts'>
import Estructura from './estructura.svelte';
export let data
  </script>

  <Estructura business={data.egresado1.concat(data.egresado2).concat(data.egresado3)}/>
  