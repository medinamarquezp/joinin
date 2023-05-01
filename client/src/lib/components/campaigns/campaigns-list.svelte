<script lang="ts">
	export let title: string;
	export let items: number;
	export let address: string | null = null;

	import { es } from 'date-fns/locale/index.js';
	import { formatDistanceToNow } from 'date-fns';
	import { IconSignature } from '@tabler/icons-svelte';
	import InfoMessage from '$lib/components/generics/info.svelte';
	import { getCampaignService } from '$lib/utilities/platform.utilities';

	let getCampaigns = async (address?: string | null) => {
		return await getCampaignService().getCampaignList(items, address);
	};

	let campaigns = getCampaigns(address);
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
