<script lang="ts">
  import pencilIcon from '$lib/icons/pencil.svg'
  import saveIcon from '$lib/icons/save.svg'
</script>

<div class="flex justify-around">
  <div class="flex items-center justify-center gap-6">
    <div class="flex flex-col items-center">
      <h2>Preview CV · Ingeniería Informática</h2>
      <h3>Software Developer</h3>
    </div>
    <button>
      <img src={pencilIcon} alt="Editar CV" />
    </button>
  </div>

  <div>
    <button
      class="m-auto flex h-[52px] w-[227px] items-center justify-center rounded-[10px] bg-ucab-green font-bold text-brand-white shadow-xl transition-all duration-200 hover:bg-green-600 hover:shadow-lg hover:shadow-emerald-200 disabled:opacity-50"
    >
      <img src={saveIcon} alt="Guardar CV" class="aspect-[46/33] w-[46px]" />
      <p class="font-semibold">Guardar</p>
    </button>
  </div>
</div>
