<script lang="ts">
	import '../app.css';
	import 'toastify-js/src/toastify.css';
	import { onMount } from 'svelte';
	import { getWeb3, handleNetworkchanges } from '$lib/web3';
	import { clear } from '$lib/stores/config.store';
	import Header from '$lib/components/layout/header.svelte';
	import Footer from '$lib/components/layout/footer.svelte';
	import ChangeNetwork from '$lib/components/generics/change-network.svelte';

	const checkConnection = async () => {
		const web3 = getWeb3();
		if (!web3) clear();
		const accounts = await web3.eth.getAccounts();
		if (!accounts.length) clear();
	};

	onMount(async () => {
		await checkConnection();
		await handleNetworkchanges();
	});
</script>

<ChangeNetwork />
<div class="container mx-auto">
	<Header />
	<slot />
	<Footer />
</div>
