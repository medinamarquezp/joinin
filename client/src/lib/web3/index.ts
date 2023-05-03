// @ts-nocheck
import Web3 from 'web3';
import { toast, toastTypes } from '$lib/toast';
import { config } from '../../config';
import { get, upsert } from '$lib/stores/config.store';
import { getCampaignService } from '$lib/utilities/platform.utilities';

const networks = {
	1: 'Ehereum Mainnet',
	5: 'Ehereum Goerli',
	137: 'Polygon Mainnet',
	5777: 'Ganache',
	80001: 'Polygon Mumbai',
	11155111: 'Ehereum Sepolia'
};

export const getNetworkName = (id: number): string => {
	return networks[id] || id.toString();
};

export const connect = async (): Web3 => {
	try {
		// Modern dapp browsers...
		if (window.ethereum) {
			const web3 = new Web3(window.ethereum);
			// Request account access if needed
			await window.ethereum.enable();
			return web3;
		}
		// Legacy dapp browsers...
		else if (window.web3) {
			// Use Mist/MetaMask's provider.
			const web3 = window.web3;
			console.log('Injected web3 detected.');
			return web3;
		} else {
			alert('Please try with another modern browser or install the MetaMask plugin');
		}
	} catch (error) {
		console.error(error);
		throw new Error(error.message);
	}
};

export const getWeb3 = () => {
	if (window.ethereum) {
		return new Web3(window.ethereum);
	}
	if (window.web3) {
		return window.web3;
	}
	return null;
};

export const handleNetworkchanges = async () => {
	window.ethereum.on('networkChanged', (networkId) => {
		const network = getNetworkName(networkId);
		const account = get('account');
		upsert('network', networkId);
		upsert('connection', `${network} (0x${account.slice(-5)})`);
		toast(`Te has conectado a la red "${network}"`);
		window.location.reload();
	});
};

export const switchNetwork = async () => {
	const { networkId } = config;
	try {
		await window.ethereum.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: getWeb3().utils.toHex(networkId) }]
		});
		toast(`Te has conectado a la red "${getNetworkName(networkId)}"`);
	} catch (switchError) {
		toast(`Parece que algo ha salido mal al cambiar de red`, toastTypes.ERROR);
	}
};

export const handleContractEvents = async () => {
	const contract = getCampaignService().getContractDefinition();
	if (!contract) return;
	contract.events.allEvents().on('data', (event) => {
		toast(`Nuevo evento en la red: ${event.returnValues._message}`);
	});
};
