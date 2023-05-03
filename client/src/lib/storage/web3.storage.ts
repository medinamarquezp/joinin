import { config } from '../../config';
import { Web3Storage } from 'web3.storage';

const maxRetries = 3;
const w3sgateway = 'ipfs.w3s.link';
const client = new Web3Storage({ token: config.storageAPIToken });

export const put = async (element: HTMLInputElement) => {
	const files = element.files as FileList;
	const { name } = files.item(0) as File;
	const cid = await client.put(files, {
		name,
		maxRetries
	});
	const path = `${cid}.${w3sgateway}/${name}`;
	return { cid, path };
};
