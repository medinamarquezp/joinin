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
	private contract;

	constructor(private web3: Web3) {
		this.contract = this.getContract();
	}

	getContractDefinition() {
		return this.contract;
	}

	async getCampaignIds(items: number, address?: string | null): Promise<string[]> {
		let campaignIds;
		if (address) {
			campaignIds = await this.contract.methods.getUserCampaigns(address).call();
		} else {
			campaignIds = await this.contract.methods.getCampaignIds().call();
		}
		if (items < campaignIds.length) {
			campaignIds = campaignIds.slice(items * -1);
		}
		return campaignIds.toReversed();
	}

	async getCampaignList(items: number, address?: string | null): Promise<Campaign[]> {
		let campaignIds = await this.getCampaignIds(items, address);
		const campaigns: Campaign[] = [];
		for (const campaignId of campaignIds) {
			const campaignData = await this.contract.methods.getCampaign(campaignId).call();
			const campaign = this.parseCampaignData(campaignData);
			campaigns.push(campaign);
		}
		return campaigns;
	}

	async isUserActive(address: string): Promise<boolean> {
		return await this.contract.methods.isUserActive(address).call();
	}

	async registerUser(
		address: string,
		name: string,
		lastname: string,
		email: string
	): Promise<boolean> {
		try {
			await this.contract.methods.register(name, lastname, email).send({
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
			await this.contract.methods.registerCampaign(category, title, description, goal).send({
				from: address
			});
			return true;
		} catch (error) {
			return false;
		}
	}

	async getCampaignDetails(id: number): Promise<Campaign | null> {
		try {
			const campaignData = await this.contract.methods.getCampaign(id).call();
			if (!campaignData) return null;
			return this.parseCampaignData(campaignData);
		} catch (error) {
			return null;
		}
	}

	async signCampaign(address: string, id: number): Promise<boolean> {
		try {
			await this.contract.methods.signCampaign(id).send({
				from: address
			});
			return true;
		} catch (error) {
			return false;
		}
	}

	private getContract() {
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
			supporters: campaignData.supporters.length,
			supportersAddresses: campaignData.supporters
		};
	}
}
