<script lang="ts">
	// import '../app.css';
	import '$lib/styles/baseCamp.svelte';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	let { data, children } = $props();
	let { session, supabase } = $derived(data);
	onMount(() => {
		if (!supabase?.auth) return;

		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<div class="app">
	{@render children()}
</div>
