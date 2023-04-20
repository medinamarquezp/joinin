<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getWeb3 } from '$lib/web3';
	import { get } from '$lib/stores/config.store';
	import { CampaignService } from '$lib/services/campaign.service';

	const web3 = getWeb3();
	const address = get('account') as string;
	const campaingService = new CampaignService(web3);

	onMount(async () => {
		const isActiveUser = await campaingService.isUserActive(address);
		if (!isActiveUser) {
			goto('/register');
		}
	});
</script>

<h1>Iniciar una nueva petición</h1>
