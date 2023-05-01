import type Web3 from 'web3';
import { fromUnixTime } from 'date-fns';
import {
	CampaignCategories,
	type Campaign,
	CampaignStatus,
	type ContractCampaign
} from '$lib/types/campaign.types';
import { config } from '../../config/platform.config';

export class CampaignService {
	constructor(private web3: Web3) {}
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
			const campaign = this.parseCampaignData(campaignData);
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

	async getCampaignDetails(id: number): Promise<Campaign | null> {
		try {
			const contract = await this.getContract();
			const campaignData = await contract.methods.getCampaign(id).call();
			if (!campaignData) return null;
			return this.parseCampaignData(campaignData);
		} catch (error) {
			return null;
		}
	}

	private async getContract() {
		const { abi, address } = config;
		return new this.web3.eth.Contract(abi, address);
	}

	private parseCampaignData(campaignData: ContractCampaign): Campaign {
		return {
			id: Number(campaignData.id),
			category: CampaignCategories[campaignData.category],
			status: CampaignStatus[campaignData.status],
			ownerAddress: campaignData.owner,
			title: campaignData.title,
			description: campaignData.description,
			createdAt: fromUnixTime(Number(campaignData.createdAt)),
			goal: Number(campaignData.goal),
			reachedAt: campaignData.reachedAt ? fromUnixTime(Number(campaignData.createdAt)) : null,
			supporters: campaignData.supporters.length
		};
	}
}
