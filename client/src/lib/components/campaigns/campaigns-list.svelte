<script lang="ts">
	export let title: string;
	export let items: number;

	import { es } from 'date-fns/locale/index.js';
	import { formatDistanceToNow } from 'date-fns';
	import { IconSignature } from '@tabler/icons-svelte';
	import { getWeb3 } from '$lib/web3';
	import InfoMessage from '$lib/components/generics/info.svelte';
	import { CampaignService } from '$lib/services/campaign.service';

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
				{#each campaigns as { id, title, supporters, createdAt }}
					<a href="/campaigns/{id}" class="card">
						<div class="date">Creada hace {formatDistanceToNow(createdAt, { locale: es })}</div>
						<div class="content">
							{title}
						</div>
						<div class="details">
							<IconSignature size={16} stroke={2} /> <span>{supporters}</span> Firmantes
						</div>
					</a>
				{/each}
			{:else}
				<InfoMessage message={NoCampaignsMessage} />
			{/if}
		</div>
	{:catch error}
		<InfoMessage message={NoCampaignsMessage} />
	{/await}
</section>
