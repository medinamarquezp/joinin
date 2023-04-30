<script lang="ts">
	import { es } from 'date-fns/locale/index.js';
	import { formatDistanceToNow } from 'date-fns';
	import { IconSignature, IconTag, IconChartArcs, IconTarget } from '@tabler/icons-svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	let { title, description, createdAt, category, status, supporters, goal } = data.campaign;
</script>

<div class="campaign">
	<h1>{title}</h1>
	<small>Publicada hace {formatDistanceToNow(createdAt, { locale: es })}</small>
	<p>{description}</p>
	{#if status === 'Abierta'}
		<a class="btn" href="/"
			><IconSignature size={20} stroke={2} class="mr-2" /> Firmar esta campaña</a
		>
	{:else}
		<p class="font-bold">Esta campaña no permite registrar nuevas firmas</p>
	{/if}
	<div class="details">
		<div class="summary">
			<p class:open={status === 'Abierta'} class:closed={status === 'Cerrada'}>
				<IconChartArcs size={20} stroke={2} class="mr-2" />
				{status}
			</p>
			<p>
				<IconTag size={20} stroke={2} class="mr-2" />
				{category}
			</p>
			<p>
				<IconTarget size={20} stroke={2} class="mr-2" />
				Objetivo {goal} firmantes
			</p>
			<p>
				<IconSignature size={20} stroke={2} class="mr-2" />
				{supporters} firmantes de {goal}
			</p>
		</div>
		<div class="supporters">
			<h2>Firmantes</h2>
			{#if supporters}
				<p>Lol</p>
			{:else}
				<p class="text-slate-500">No se han registrado firmas para esta campaña.</p>
			{/if}
		</div>
	</div>
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
			@apply bg-violet-900 text-white justify-center;
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
