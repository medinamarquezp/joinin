import { env } from '$env/dynamic/public';

export const config = {
	networkId: env.PUBLIC_NETWORK_ID,
	abi: JSON.parse(env.PUBLIC_CAMPAIGNS_ABI),
	address: env.PUBLIC_CAMPAIGNS_ADDRESS,
	storageAPIToken: env.PUBLIC_STORAGE_API_TOKEN
};
