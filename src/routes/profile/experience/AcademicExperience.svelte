<script lang="ts">
    import Add from "$lib/components/profile/add/Add.svelte"
    import pencilIcon from '$lib/icons/pencil.svg'
    import deleteIcon from '$lib/icons/delete.svg'
    
    export let business: {
          "workExpId": number,
          "organizationName": string,
          "jobTitle": string,
          "description": string,
          "address": string,
          "entryDate": string,
          "departureDate": string,
          "createdAt": string,
          "showInformation": boolean
        }[]
</script>

<article class="bg-brand-white flex-col w-full">
    <header>
        <div class="flex justify-between w-full">
            <h2>Experiencia Laboral</h2>
            <Add clickHandler={() => {}} />
        </div>
        <div class="h-1 bg-ucab-blue w-full mt-2" />
    </header>

    <ul class="flex flex-col gap-8 mt-6">
        {#each business as busines}
        <li class="flex flex-col gap-2">
            <div class="flex justify-between items-center">
                <h3 class="text-2xl font-poppins">{busines.organizationName}</h3>
                <div class="flex gap-6">
                    <button>
                        <img src={pencilIcon} alt="Editar estudio" />
                    </button>
                    <button>
                        <img src={deleteIcon} alt="Eliminar estudio" />
                    </button>
                </div>
            </div>
            
            <p class="font-bold font-open-sans text-ucab-black">{busines.jobTitle}</p>
            <p class="font-open-sans text-brand-p-black">{busines.description}</p>
            <p>{busines.address}</p>
            
            {#if busines.showInformation}
                <p>Fecha de entrada: {busines.entryDate}</p>
                <p>Fecha de salida: {busines.departureDate}</p>
            {/if}
            
            <div class="flex justify-start items-center mt-2">
                <button class="bg-white text-ucab-green p-2 rounded">
                    Ver Información
                </button>
            </div>
        </li>
        {/each}
    </ul>
</article>
