import { env } from '$env/dynamic/public';
import { abi, networks } from '../../../build/contracts/Campaigns.json';

const { PUBLIC_CAMPAIGNS_ABI, PUBLIC_CAMPAIGNS_ADDRESS } = env;

export const config = {
	abi: PUBLIC_CAMPAIGNS_ABI ? JSON.parse(PUBLIC_CAMPAIGNS_ABI) : abi,
	address: PUBLIC_CAMPAIGNS_ADDRESS || networks[5777].address
};
