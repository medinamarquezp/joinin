<script lang="ts">
	import { onMount } from 'svelte';
	import { IconCirclesRelation, IconWallet } from '@tabler/icons-svelte';
	import { toast, toastTypes } from '$lib/toast';
	import { connect, getNetworkName, getWeb3 } from '$lib/web3';
	import { upsert, get, configStore } from '$lib/stores/config.store';
	import { getCampaignService } from '$lib/utilities/platform.utilities';

	const handleConnect = async () => {
		try {
			const web3 = await connect();
			const accounts = await web3.eth.getAccounts();
			const networkId = await web3.eth.net.getId();
			if (networkId && accounts.length) {
				upsert('connection', `${getNetworkName(networkId)} (0x${accounts[0].slice(-5)})`);
				upsert('network', getNetworkName(networkId));
				upsert('account', accounts[0]);
			}
		} catch (err) {
			const error = err as Error;
			toast(error.message, toastTypes.ERROR);
		}
	};

	const checkActiveUser = async () => {
		const account = get('account') as string;
		if (!account) return false;
		return await getCampaignService().isUserActive(account);
	};

	let isActiveUser = false;
	onMount(async () => {
		isActiveUser = await checkActiveUser();
	});

	let connection = '';
	configStore.subscribe((data) => (connection = data.connection));
</script>

<header>
	<div class="brand">
		<a href="/">
			<IconCirclesRelation size={40} stroke={2} />
			<span>join.in</span>
		</a>
	</div>
	<nav>
		<ul class="main-nav">
			<li>
				<a href="/campaigns">Peticiones</a>
			</li>
			<li>
				<a href="/campaigns/start">Iniciar Petición</a>
			</li>
			{#if !isActiveUser}
				<li>
					<a href="/register">Registro</a>
				</li>
			{/if}
		</ul>
	</nav>
	{#if connection}
		<div class="connected">Connected to <strong>{connection}</strong></div>
	{:else}
		<button class="btn" on:click={handleConnect}>
			<IconWallet size={36} stroke={2} />
			<span>Conectar wallet</span>
		</button>
	{/if}
</header>
