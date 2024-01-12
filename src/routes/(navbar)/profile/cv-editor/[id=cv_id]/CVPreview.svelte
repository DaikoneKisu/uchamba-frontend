<script lang="ts">
  import type { ProfileData } from '$lib/types/profile-data.type'
  import CV from './CV.svelte'
  import CVHeader from './CVHeader.svelte'

  export let profileData: ProfileData
</script>

<div class="items-cente flex flex-col gap-8">
  <CVHeader />
  <div class="rounded-xl bg-white pb-[120px]">
    <CV {profileData} />
  </div>
</div>
