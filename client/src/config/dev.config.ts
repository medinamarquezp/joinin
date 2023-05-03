import { env } from '$env/dynamic/public';

let preloaded = false;

export const config = {
	networkId: '0',
	abi: {},
	address: '0x',
	storageAPIToken: env.PUBLIC_STORAGE_API_TOKEN
};

if (process.env.NODE_ENV === 'development' && !preloaded) {
	const { abi, networks } = await import('../../../build/contracts/Campaigns.json');
	const networkId = '5777';
	config.networkId = networkId;
	config.abi = abi;
	config.address = networks[networkId].address;
	preloaded = true;
}
