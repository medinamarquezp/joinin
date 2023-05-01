import { getWeb3 } from '$lib/web3';
import { CampaignService } from '$lib/services/campaign.service';

export const getCampaignService = () => {
	const web3 = getWeb3();
	return new CampaignService(web3);
};
