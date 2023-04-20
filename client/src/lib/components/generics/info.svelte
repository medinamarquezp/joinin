<script lang="ts">
	export let message: string;
	import { IconAlertSquareRounded } from '@tabler/icons-svelte';
</script>

<div class="flex my-4 text-slate-600">
	<IconAlertSquareRounded size={32} stroke={2} class="mr-2" />
	{message}
</div>
