<script lang="ts">
	import CampaignsList from '$lib/components/campaigns/campaigns-list.svelte';
	import { get } from '$lib/stores/config.store';
	let address = get('account') as string;
</script>

<h1>Peticiones</h1>
{#if address}
	<CampaignsList title="Mis campañas" items={3} {address} />
{/if}

<CampaignsList title="Campañas activas" items={3} />
