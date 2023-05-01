<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { es } from 'date-fns/locale/index.js';
	import { formatDistanceToNow } from 'date-fns';
	import { IconSignature, IconTag, IconChartArcs, IconTarget } from '@tabler/icons-svelte';
	import { toast, toastTypes } from '$lib/toast';
	import { get } from '$lib/stores/config.store';
	import Info from '$lib/components/generics/info.svelte';
	import type { Campaign } from '$lib/types/campaign.types';
	import { getCampaignService } from '$lib/utilities/platform.utilities';

	let campaign: Campaign;
	export let data: PageData;

	onMount(async () => {
		const result = await getCampaignService().getCampaignDetails(data.campaignId);
		if (!result) {
			goto('/campaigns');
		}
		campaign = result as Campaign;
	});

	let address = get('account') as string;
	const signCampaign = async () => {
		const signed = await getCampaignService().signCampaign(address, campaign.id);
		if (signed) {
			toast('La campaña se ha firmado correctamente.', toastTypes.SUCCESS);
		} else {
			toast('Parece que algo ha ido mal al firmar la campaña.', toastTypes.ERROR);
		}
	};
</script>

<div class="campaign">
	{#if campaign}
		<h1>{campaign.title}</h1>
		<small>Publicada hace {formatDistanceToNow(campaign.createdAt, { locale: es })}</small>
		<p>{campaign.description}</p>
		{#if campaign.status === 'Abierta'}
			{#if address}
				{#if address === campaign.ownerAddress}
					<Info message="No puedes firmar tus propias campañas." />
				{:else if campaign.supportersAddresses.includes(address)}
					<Info message="Ya has firmado esta campaña." />
				{:else}
					<button class="btn" on:click={signCampaign}
						><IconSignature size={20} stroke={2} class="mr-2" /> Firmar esta campaña</button
					>
				{/if}
			{:else}
				<Info message="Debes conectarte con tu cartera y estar registrado para firmar campañas." />
			{/if}
		{:else}
			<Info message="Esta campaña no permite registrar nuevas firmas." />
		{/if}
		<div class="details">
			<div class="summary">
				<p class:open={campaign.status === 'Abierta'} class:closed={campaign.status === 'Cerrada'}>
					<IconChartArcs size={20} stroke={2} class="mr-2" />
					{campaign.status}
				</p>
				<p>
					<IconTag size={20} stroke={2} class="mr-2" />
					{campaign.category}
				</p>
				<p>
					<IconTarget size={20} stroke={2} class="mr-2" />
					Objetivo {campaign.goal} firmantes
				</p>
				<p>
					<IconSignature size={20} stroke={2} class="mr-2" />
					{campaign.supporters} firmantes de {campaign.goal}
				</p>
			</div>
			<div class="supporters">
				<h2>Firmantes</h2>
				{#if campaign.supporters}
					{#each campaign.supportersAddresses as address}
						<p class="text-slate-500">{address}</p>
					{/each}
				{:else}
					<p class="text-slate-500">No se han registrado firmas para esta campaña.</p>
				{/if}
			</div>
		</div>
	{:else}
		<p>Cargando...</p>
	{/if}
</div>

<style lang="scss">
	.campaign {
		@apply container my-12 px-64;
		h1 {
			@apply mb-1;
		}
		small {
			@apply text-slate-500;
		}
		.btn {
			@apply bg-violet-900 text-white w-full justify-center;
		}
		.details {
			@apply flex;
			.summary {
				p {
					&.open {
						@apply text-green-600;
					}
					&.closed {
						@apply text-red-600;
					}
					&:first-child {
						@apply mt-8;
					}
					@apply flex items-center my-4;
				}
			}
			.supporters {
				@apply mt-8 pl-8;
				p {
					@apply flex items-center my-4;
				}
			}
		}
	}
</style>
