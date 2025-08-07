<script lang="ts">
	import { T } from '@threlte/core';
	import { interactivity, useSuspense, useGltf } from '@threlte/extras';

	interactivity();
	const suspend = useSuspense();

	const models = suspend(
		Promise.all([
			useGltf('World/HomeBoundLand.glb'),
			useGltf('World/HomeBoundLandBot.glb'),
			useGltf('World/HomeBoundStreet.glb'),
			useGltf('World/HomeBoundParking.glb'),
			useGltf('World/HomeBoundTrail.glb'),
			useGltf('World/HomeBoundExtras.glb'),
			useGltf('World/HomeBoundBuildings.glb'),
			useGltf('World/HomeBoundNeighborhood.glb')
		])
	);

	let scale = $state(1);
</script>

{#await models then results}
	{#each results as { scene }}
		<T is={scene} position={[10, 0, 0]} {scale} />
	{/each}
{/await}
