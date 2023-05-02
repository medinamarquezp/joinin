export const CampaignCategories: { [key: string]: string } = {
	'0': 'Recogida de firmas',
	'1': 'Recaudación de fondos'
};

export const CampaignStatus: { [key: string]: string } = {
	'0': 'Abierta',
	'1': 'Objetivo logrado',
	'2': 'Cerrada'
};

export interface ContractCampaign {
	id: string;
	category: string;
	status: string;
	owner: string;
	title: string;
	description: string;
	createdAt: string;
	goal: string;
	reachedAt: string;
	supporters: string[];
	mainImage: string;
	document: string;
}

export interface Campaign {
	id: number;
	category: string;
	status: string;
	ownerAddress: string;
	title: string;
	description: string;
	goal: number;
	createdAt: Date;
	reachedAt: Date | null;
	supporters: number;
	supportersAddresses: string[];
	mainImage: string;
	document: string;
}
