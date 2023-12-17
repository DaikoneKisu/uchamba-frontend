<script lang="ts">
	import type { ProfileData } from '../../../../../types/profile-data.type'
	import Projects from './Projects.svelte'

	export let data: ProfileData
</script>

<div class="w-full flex flex-col justify-between pb-28 items-center pt-8 gap-16 px-16">
	<Projects profileData={data} />
</div>
