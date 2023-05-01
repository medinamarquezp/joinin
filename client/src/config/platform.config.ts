import { env } from '$env/dynamic/public';
import { abi, networks } from '../../../build/contracts/Campaigns.json';

const { PUBLIC_CAMPAIGNS_ABI, PUBLIC_CAMPAIGNS_ADDRESS, PUBLIC_NETWORK_ID } = env;

const networkId = (PUBLIC_NETWORK_ID || '5777') as keyof typeof networks;

export const config = {
	networkId,
	abi: PUBLIC_CAMPAIGNS_ABI ? JSON.parse(PUBLIC_CAMPAIGNS_ABI) : abi,
	address: PUBLIC_CAMPAIGNS_ADDRESS || networks[networkId].address
};
