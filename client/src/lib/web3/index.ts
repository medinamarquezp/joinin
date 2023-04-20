// @ts-nocheck
import Web3 from 'web3';

const networks = {
	11155111: 'Sepolia'
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
