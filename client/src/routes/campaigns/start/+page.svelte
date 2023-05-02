<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { get } from '$lib/stores/config.store';
	import { toast, toastTypes } from '$lib/toast';
	import { getCampaignService } from '$lib/utilities/platform.utilities';
	import { put } from '$lib/storage/web3.storage';

	const address = get('account') as string;
	let category = 0;
	let title = '';
	let description = '';
	let goal = 0;
	let mainImage: HTMLInputElement;
	let mainImagePath = '';
	let document: HTMLInputElement;
	let documentPath = '';

	onMount(async () => {
		if (!address) {
			goto('/register');
		} else {
			const isActiveUser = await getCampaignService().isUserActive(address);
			if (!isActiveUser) {
				goto('/register');
			}
		}
	});

	const resetForm = () => {
		title = '';
		description = '';
		goal = 0;
		mainImagePath = '';
		documentPath = '';
	};

	const handleSubmit = async () => {
		if (!address) {
			toast('Debes conectar tu cartera para iniciar una petición.', toastTypes.ERROR);
		}
		if (!title || !description || !goal) {
			toast('Todos los campos son requeridos.', toastTypes.ERROR);
		}
		if (mainImage.files?.length) {
			const { path } = await put(mainImage);
			mainImagePath = path;
		}
		if (document.files?.length) {
			const { path } = await put(document);
			documentPath = path;
		}
		const register = await getCampaignService().registerCampaign(
			address,
			category,
			title,
			description,
			goal,
			mainImagePath,
			documentPath
		);
		if (register) {
			toast('Campaña registrada correctamente', toastTypes.SUCCESS);
			resetForm();
			return true;
		}
		toast('Parece que algo ha ido mal con el registro de tu campaña', toastTypes.ERROR);
	};
</script>

<h1>Iniciar una nueva petición</h1>
<p>Cuéntale a otras persona lo que quieres conseguir:</p>
<form on:submit|preventDefault={handleSubmit}>
	<div class="field">
		<div class="label"><label for="title">Título</label></div>
		<div class="input"><input id="title" type="text" bind:value={title} required /></div>
	</div>
	<div class="field start">
		<div class="label"><label for="description">Descripción</label></div>
		<div class="input">
			<textarea id="description" rows="5" bind:value={description} required />
		</div>
	</div>
	<div class="field">
		<div class="label"><label for="goal">Objetivo</label></div>
		<div class="input"><input id="goal" type="number" bind:value={goal} required /></div>
	</div>
	<div class="field">
		<div class="label"><label for="main-image">Imagen principal</label></div>
		<div>
			<input
				type="file"
				id="main-image"
				class="file"
				accept=".jpg, .jpeg, .png"
				bind:this={mainImage}
			/>
		</div>
	</div>
	<div class="field center">
		<div class="label"><label for="paper">Documentación</label></div>
		<div>
			<input type="file" id="paper" class="file" accept=".pdf " bind:this={document} />
		</div>
	</div>

	<div class="flex items-center">
		<div class="w-6/6">
			<button class="btn" type="submit"> Crear petición </button>
		</div>
	</div>
</form>
