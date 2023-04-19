import { get as getStore } from 'svelte/store';
import { persisted } from 'svelte-local-storage-store';

const baseConfigStore = {
	connectedAccount: ''
};

export const configStore = persisted('config', baseConfigStore);

export const get = (key: string) => {
	const data: { [keys: string]: unknown } = getStore(configStore);
	return data[key];
};

export const upsert = (key: string, value: unknown) => {
	configStore.update((data) => ({ ...data, [key]: value }));
	return value;
};

export const clear = () => {
	configStore.set(baseConfigStore);
};
