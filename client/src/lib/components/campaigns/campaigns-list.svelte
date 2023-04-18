<script lang="ts">
	export let title: string;
	export let items: number;
	import { IconSignature } from '@tabler/icons-svelte';
</script>

<section>
	<h2>{title}</h2>
	<div class="card-container">
		<div class="card">
			<div class="date">Creada hace 3 días</div>
			<div class="content">
				Uber Eats: Paguen justamente el kilometraje a los riders ¡Ya basta de explotación!
			</div>
			<div class="details">
				<IconSignature size={16} stroke={2} /> <span>18</span> Firmantes
			</div>
		</div>
		<div class="card">
			<div class="date">Creada hace 3 días</div>
			<div class="content">
				Ayudemos a los refugiados de Ucrania, evitemos la tragedia humanitaria.
			</div>
			<div class="details">
				<IconSignature size={16} stroke={2} /> <span>123</span> Firmantes
			</div>
		</div>
	</div>
</section>
