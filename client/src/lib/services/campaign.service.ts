import type Web3 from 'web3';
import type { AbiItem } from 'web3-utils';
import { env } from '$env/dynamic/public';
import { CampaignCategories, type Campaign, CampaignStatus } from '$lib/types/campaign.types';

export class CampaignService {
	constructor(private web3: Web3) {}

	private async getContract() {
		const contract = await import(`${env.PUBLIC_CONTRACTS_PATH}/Campaigns.json`);
		const contractABI = contract.abi as unknown as AbiItem;
		const contractAddress = contract.networks[`${env.PUBLIC_NETWORK_ID}`].address;
		return new this.web3.eth.Contract(contractABI, contractAddress);
	}

	async getCampaignList(items: number): Promise<Campaign[]> {
		const contract = await this.getContract();
		let campaignIds = await contract.methods.getCampaignIds().call();
		if (items < campaignIds.length) {
			campaignIds = campaignIds.slice(items * -1);
		}
		const campaigns: Campaign[] = [];
		for (const campaignId of campaignIds) {
			const campaignData = await contract.methods.getCampaign(campaignId).call();
			const campaign: Campaign = {
				category: CampaignCategories[campaignData.category],
				status: CampaignStatus[campaignData.status],
				ownerAddress: campaignData.owner,
				title: campaignData.title,
				description: campaignData.description,
				createdAt: new Date(campaignData.createdAt),
				goal: Number(campaignData.goal),
				reachedAt: campaignData.reachedAt ? new Date(campaignData.reachedAt) : null,
				supporters: campaignData.supporters.length
			};
			campaigns.push(campaign);
		}
		return campaigns;
	}
}
