<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { Instance, InstancedMesh } from '@threlte/extras';

	let dn = Date.now();

	let { scale } = $props();

	useTask(() => (dn = Date.now()));
	const items = Array.from({ length: 1000 }, () => ({
		x: Math.random() * 5 - 2.5,
		y: Math.random() * 5 - 2.5,
		z: Math.random() * 5 - 2.5,
		scale: Math.random() * 0.5 + 0.5 + Math.random() * 0.5 + 0.42,
		rotation: {
			x: Math.random() * 8,
			y: Math.random() * 360,
			z: Math.random() * 8
		}
	}));

	const randomColor = (saturation: number = 100, lightness: number = 50, alpha: number = 1) => {
		saturation = Math.max(0, Math.min(100, saturation));
		lightness = Math.max(0, Math.min(100, lightness));
		alpha = Math.max(0, Math.min(1, alpha));

		const hue = Math.floor(Math.random() * 60);
		return `hsl(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
	};

	let rotation = $state(0);
	useTask((delta) => {
		rotation += delta / 6 / 20;
	});
</script>

<T.DirectionalLight castShadow intensity={1} position={[-5, 4, -6]} />
<InstancedMesh position={[-2, 0.4, -0.25]} {scale}>
	<T.SphereGeometry args={[0.03]} />
	<T.MeshToonMaterial color={randomColor(10, 90)} />

	{#each items as item}
		<Instance
			color={randomColor(50, 50)}
			position.x={item.x}
			position.y={item.y}
			position.z={item.z}
			scale={item.scale}
		/>
	{/each}
</InstancedMesh>
