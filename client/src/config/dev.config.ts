import { env } from '$env/dynamic/public';
import { abi, networks } from '../../../build/contracts/Campaigns.json';

const networkId = '5777' as keyof typeof networks;

export const config = {
	networkId,
	abi,
	address: networks[networkId].address,
	storageAPIToken: env.PUBLIC_STORAGE_API_TOKEN
};
