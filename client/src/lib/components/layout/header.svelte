<script lang="ts">
	import { IconCirclesRelation, IconWallet } from '@tabler/icons-svelte';
	import { toast, toastTypes } from '$lib/toast';
	import { upsert, configStore } from '$lib/stores/config.store';
	import { connect, getNetworkName } from '$lib/web3';
	async function handleConnect() {
		try {
			const web3 = await connect();
			const accounts = await web3.eth.getAccounts();
			const networkId = await web3.eth.net.getId();
			if (networkId && accounts.length) {
				upsert('connectedAccount', `${getNetworkName(networkId)} 0x${accounts[0].slice(-5)}`);
			}
		} catch (err) {
			const error = err as Error;
			toast(error.message, toastTypes.ERROR);
		}
	}
	let account = '';
	configStore.subscribe((data) => (account = data.connectedAccount));
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
			<li>
				<a href="/register">Registro</a>
			</li>
			<li>
				<a href="#">Socios</a>
			</li>
			<li>
				<a href="#">Sobre Joinin</a>
			</li>
		</ul>
	</nav>
	{#if account}
		<div class="connected">Connected to <strong>{account}</strong></div>
	{:else}
		<button class="btn" on:click={handleConnect}>
			<IconWallet size={36} stroke={2} />
			<span>Conectar wallet</span>
		</button>
	{/if}
</header>
