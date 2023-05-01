import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const campaignId = Number(params.id);
	return {
		campaignId
	};
}) satisfies PageLoad;
