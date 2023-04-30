import type { PageLoad } from './$types';
import { getWeb3 } from '$lib/web3';
import { CampaignService } from '$lib/services/campaign.service';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const campaignId = Number(params.id);
	const web3 = getWeb3();
	const campaignService = new CampaignService(web3);
	const campaign = await campaignService.getCampaignDetails(campaignId);
	if (!campaign) {
		throw error(404, { message: 'Campaign not found' });
	}
	return {
		campaign
	};
}) satisfies PageLoad;
