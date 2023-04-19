<script lang="ts">
	import { connect, getNetworkName } from '$lib/web3';
	import { toast, toastTypes } from '$lib/toast';
	import { IconCirclesRelation, IconWallet } from '@tabler/icons-svelte';
	let web3 = undefined;
	let accounts: string[] = [];
	let networkId = 0;
	$: networkName = networkId && getNetworkName(networkId);
	$: connectedAccount = accounts.length && `0x${accounts[0].slice(-5)}`;
	async function handleConnect() {
		try {
			web3 = await connect();
			if (web3.eth) {
				accounts = await web3.eth.getAccounts();
				networkId = await web3.eth.net.getId();
			}
		} catch (err) {
			const error = err as Error;
			toast(error.message, toastTypes.ERROR);
		}
	}
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
				<a href="/members">Socios</a>
			</li>
			<li>
				<a href="/about">Sobre Joinin</a>
			</li>
		</ul>
	</nav>
	{#if networkId}
		<div class="connected">Connected to {networkName} <strong>{connectedAccount}</strong></div>
	{:else}
		<button class="btn" on:click={handleConnect}>
			<IconWallet size={36} stroke={2} />
			<span>Conectar wallet</span>
		</button>
	{/if}
</header>
