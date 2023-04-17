<script>
	import '../app.css';
	import Header from '$lib/components/layout/header.svelte';
	import Footer from '$lib/components/layout/footer.svelte';
</script>

<div class="container mx-auto">
	<Header />
	<slot />
	<Footer />
</div>
