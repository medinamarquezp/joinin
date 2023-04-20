export const CampaignCategories: { [key: string]: string } = {
	'0': 'signature',
	'1': 'fundraising'
};

export const CampaignStatus: { [key: string]: string } = {
	'0': 'open',
	'1': 'reached',
	'2': 'closed'
};

export interface Campaign {
	category: string;
	status: string;
	ownerAddress: string;
	title: string;
	description: string;
	goal: number;
	createdAt: Date;
	reachedAt: Date | null;
	supporters: number;
}
