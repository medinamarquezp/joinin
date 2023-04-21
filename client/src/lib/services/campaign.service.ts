import type Web3 from 'web3';
import { fromUnixTime } from 'date-fns';
import { env } from '$env/dynamic/public';
import { CampaignCategories, type Campaign, CampaignStatus } from '$lib/types/campaign.types';

export class CampaignService {
	constructor(private web3: Web3) {}

	private async getContract() {
		const abi = JSON.parse(env.PUBLIC_CAMPAIGNS_ABI);
		const address = env.PUBLIC_CAMPAIGNS_ADDRESS;
		return new this.web3.eth.Contract(abi, address);
	}

	async getCampaignList(items: number): Promise<Campaign[]> {
		const contract = await this.getContract();
		let campaignIds = await contract.methods.getCampaignIds().call();
		if (items < campaignIds.length) {
			campaignIds = campaignIds.slice(items * -1);
		}
		const campaigns: Campaign[] = [];
		campaignIds = campaignIds.toReversed();
		for (const campaignId of campaignIds) {
			const campaignData = await contract.methods.getCampaign(campaignId).call();
			const campaign: Campaign = {
				category: CampaignCategories[campaignData.category],
				status: CampaignStatus[campaignData.status],
				ownerAddress: campaignData.owner,
				title: campaignData.title,
				description: campaignData.description,
				createdAt: fromUnixTime(Number(campaignData.createdAt)),
				goal: Number(campaignData.goal),
				reachedAt: campaignData.reachedAt ? new Date(campaignData.reachedAt) : null,
				supporters: campaignData.supporters.length
			};
			campaigns.push(campaign);
		}
		return campaigns;
	}

	async isUserActive(address: string): Promise<boolean> {
		const contract = await this.getContract();
		return await contract.methods.isUserActive(address).call();
	}

	async registerUser(
		address: string,
		name: string,
		lastname: string,
		email: string
	): Promise<boolean> {
		try {
			const contract = await this.getContract();
			await contract.methods.register(name, lastname, email).send({
				from: address
			});
			return true;
		} catch (error) {
			return false;
		}
	}

	async registerCampaign(
		address: string,
		category: number,
		title: string,
		description: string,
		goal: number
	): Promise<boolean> {
		try {
			const contract = await this.getContract();
			await contract.methods.registerCampaign(category, title, description, goal).send({
				from: address
			});
			return true;
		} catch (error) {
			return false;
		}
	}
}
