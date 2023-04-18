<script lang="ts">
	import { IconCirclesRelation, IconWallet } from '@tabler/icons-svelte';
</script>

<header>
	<div class="brand">
		<a href="/">
			<IconCirclesRelation size={40} stroke={2} />
			<span>join.in</span>
		</a>
	</div>
	<nav>
		<ul class="main-nav">
			<li>
				<a href="/campaigns">Peticiones</a>
			</li>
			<li>
				<a href="/campaigns/start">Iniciar Petición</a>
			</li>
			<li>
				<a href="/members">Socios</a>
			</li>
			<li>
				<a href="/about">Sobre Joinin</a>
			</li>
		</ul>
	</nav>
	<a href="#" class="btn">
		<IconWallet size={36} stroke={2} />
		<span>Conectar wallet</span>
	</a>
</header>
