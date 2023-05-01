import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getCampaignService } from '$lib/utilities/platform.utilities';

export const load = (async ({ params }) => {
	const campaignId = Number(params.id);
	const campaign = await getCampaignService().getCampaignDetails(campaignId);
	if (!campaign) {
		throw error(404, { message: 'Campaign not found' });
	}
	return {
		campaign
	};
}) satisfies PageLoad;
