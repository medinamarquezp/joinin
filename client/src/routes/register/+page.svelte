<script lang="ts">
	import { getWeb3 } from '$lib/web3';
	import { get } from '$lib/stores/config.store';
	import { toast, toastTypes } from '$lib/toast';
	import { CampaignService } from '$lib/services/campaign.service';

	let name = '';
	let lastname = '';
	let email = '';
	let address = get('account') as string;

	const handleSubmit = async () => {
		if (!address) {
			toast('Debes conectar tu cartera para poder registrate.', toastTypes.ERROR);
		}
		if (!name || !lastname || !email) {
			toast('Todos los campos son requeridos.', toastTypes.ERROR);
		}
		const web3 = getWeb3();
		const campaingService = new CampaignService(web3);
		const isActiveUser = await campaingService.isUserActive(address);
		if (isActiveUser) {
			toast('Ya te has registrado con esta dirección.', toastTypes.ERROR);
		}
		const register = await campaingService.registerUser(address, name, lastname, email);
		if (register) {
			toast('Usuario registrado correctamente', toastTypes.SUCCESS);
			return true;
		}
		toast('Parece que algo ha ido mal con el registro', toastTypes.ERROR);
	};
</script>

<h1>Registro</h1>
<p>
	Debes registrarte como usuario con la dirección de tu wallet para poder crear nuevas peticiones o
	participar en las peticiones de otros usuarios.
</p>
<form on:submit|preventDefault={handleSubmit}>
	<div class="field">
		<div class="label"><label>Dirección</label></div>
		<div class="input font-bold">{address || '0x'}</div>
	</div>
	<div class="field">
		<div class="label"><label for="name">Nombre</label></div>
		<div class="input"><input id="name" type="text" bind:value={name} required /></div>
	</div>
	<div class="field">
		<div class="label"><label for="lastname">Apellidos</label></div>
		<div class="input"><input id="lastname" type="text" bind:value={lastname} required /></div>
	</div>
	<div class="field">
		<div class="label"><label for="email">Email</label></div>
		<div class="input"><input id="email" type="email" bind:value={email} required /></div>
	</div>

	<div class="flex items-center">
		<div class="w-6/6">
			<button class="btn" type="submit"> Registrame </button>
		</div>
	</div>
</form>
