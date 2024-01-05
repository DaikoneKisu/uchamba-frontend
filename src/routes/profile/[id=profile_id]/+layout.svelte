<script lang="ts">
  import Header from './Header.svelte'
  import PersonalInformation from './PersonalInformation.svelte'
  import PersonalLinks from './PersonalLinks.svelte'
  import ProfileActivation from './ProfileActivationButton.svelte'
  import Tasks from './Tasks.svelte'

  export let data
</script>

<main class="flex min-h-screen gap-10 bg-[#f0f0f0] p-10 pt-12">
  <div class="flex h-full w-full max-w-[465px] flex-col items-center justify-center gap-6">
    {#if data.isEditable && !Object.values(data.tasks).every((t) => !t)}
      <Tasks tasks={data.tasks} />
    {/if}
    <section
      class={`flex w-full flex-col items-center justify-center gap-7 rounded-[20px] ${
        data.isEditable ? 'bg-brand-white' : 'bg-transparent'
      }`}
    >
      <div
        class="flex h-full w-full flex-col items-center justify-center gap-2 rounded-[10px] rounded-bl-[150px] bg-ucab-green pb-28 pt-10 text-brand-white"
      >
        <h2 class="text-center font-poppins text-2xl">{data.name}</h2>
        {#if data.aboutMe}
          <p class="w-[360px] font-open-sans text-lg">{data.aboutMe}</p>
        {/if}
      </div>
      {#if data.isEditable}
        <PersonalInformation {data} />
      {/if}
    </section>

    <PersonalLinks links={data.personalLinks} isEditable={data.isEditable} />

    {#if data.isEditable && Object.values(data.tasks).every((t) => !t)}
      <ProfileActivation isActive={data.isActive} />
    {/if}
  </div>

  <section class="flex w-full flex-col items-center rounded-[10px] bg-brand-white">
    <Header />

    <slot />
  </section>
</main>
