<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { get } from '$lib/stores/config.store';
	import { getNetworkName, switchNetwork } from '$lib/web3';
	import { IconAlertTriangle } from '@tabler/icons-svelte';

	let currentNetwork = Number(get('network'));
	let mainNetwork = Number(env.PUBLIC_NETWORK_ID);
</script>

{#if currentNetwork && currentNetwork !== mainNetwork}
	<div class="network-container">
		<IconAlertTriangle size={32} stroke={2} class="mr-2" />
		Te encuentras en la red <b>{getNetworkName(currentNetwork)}</b> y esta aplicación solo está
		disponible en la red <b>{getNetworkName(mainNetwork)} </b>
		<button class="btn" on:click={switchNetwork}
			>Cambiar a la red {getNetworkName(mainNetwork)}</button
		>
	</div>
{/if}

<style lang="scss">
	.network-container {
		@apply py-6 px-12 bg-orange-200 flex items-center;
		b {
			@apply mx-1.5;
		}
		.btn {
			@apply bg-violet-900 text-white justify-center ml-2;
		}
	}
</style>
