<script lang="ts">
	export let title: string;
	export let items: number;

	import { IconSignature } from '@tabler/icons-svelte';
	import { getWeb3 } from '$lib/web3';
	import { CampaignService } from '$lib/services/campaign.service';
	import InfoMessage from '$lib/components/generics/info.svelte';

	let getCampaignsList = async () => {
		const web3 = getWeb3();
		const campaignService = new CampaignService(web3);
		return await campaignService.getCampaignList(items);
	};
	let campaigns = getCampaignsList();
	let NoCampaignsMessage = 'No se han encontrado campañas publicadas para la red seleccionada.';
</script>

<section>
	<h2>{title}</h2>
	{#await campaigns}
		<p>...loading</p>
	{:then campaigns}
		<div class="card-container">
			{#if campaigns.length}
				{#each campaigns as { title, supporters, createdAt }}
					<div class="card">
						<div class="date">Creada hace 3 días</div>
						<div class="content">
							{title}
						</div>
						<div class="details">
							<IconSignature size={16} stroke={2} /> <span>{supporters}</span> Firmantes
						</div>
					</div>
				{/each}
			{:else}
				<InfoMessage message={NoCampaignsMessage} />
			{/if}
		</div>
	{:catch error}
		<InfoMessage message={NoCampaignsMessage} />
	{/await}
</section>
