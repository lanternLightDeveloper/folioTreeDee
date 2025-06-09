<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { Instance, InstancedMesh } from '@threlte/extras';

	let dn = Date.now();
	let { scale } = $props();
	useTask(() => (dn = Date.now()));

	// Function to generate randomized items
	const generateItems = () =>
		Array.from({ length: 350 }, () => ({
			x: Math.random() * 5 - 2.5,
			y: Math.random() * 5 - 2.5,
			z: Math.random() * 5 - 2.5,
			scale: Math.random() * 0.5 * 1.5 + 0.42,
			rotation: {
				x: Math.random() * 8,
				y: Math.random() * 360,
				z: Math.random() * 8
			}
		}));

	// Generate four groups of items
	const group1 = generateItems();
	const group2 = generateItems();
	const group3 = generateItems();
	const group4 = generateItems();

	// Function to generate random colors
	const randomColor = (saturation: number = 85, lightness: number = 50, alpha: number = 1) => {
		const hue = Math.floor(Math.random() * 360);
		return `hsl(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
	};

	// Independent rotations for each group
	let rotation1 = $state(0);
	let rotation2 = $state(0);
	let rotation3 = $state(0);
	let rotation4 = $state(0);

	// Animate each group differently
	useTask((delta) => {
		rotation1 += delta / 5 / 20; // Slow rotation
		rotation2 += delta / 6 / 20; // Opposite direction
		rotation3 += delta / 5 / 20; // Slightly faster
		rotation4 += delta / 4 / 20; // Another variation
	});
</script>

<!-- Add lighting -->
<T.DirectionalLight castShadow intensity={1} position={[0, 0, -1]} />

<!-- Group 1: Rotates clockwise 
<InstancedMesh rotation.y={rotation1} position={[-2, 0, 0]} {scale}>
	<T.DodecahedronGeometry args={[0.01]} />
	<T.MeshToonMaterial color={randomColor(10, 90)} />
	{#each group1 as item}
		<Instance color={randomColor(80, 60)} position={[item.x, item.y, item.z]} scale={item.scale} />
	{/each}
</InstancedMesh>-->

<!-- Group 2: Rotates counter-clockwise
<InstancedMesh rotation.y={-rotation2} position={[-2, 0, 0]} {scale}>
	<T.DodecahedronGeometry args={[0.01]} />
	<T.MeshToonMaterial color={randomColor(10, 85)} />
	{#each group2 as item}
		<Instance color={randomColor(80, 60)} position={[item.x, item.y, item.z]} scale={item.scale} />
	{/each}
</InstancedMesh> -->

<!-- Group 3: Rotates upwards
<InstancedMesh rotation.x={rotation3} rotation.z={rotation3} position={[-2, 0, 0]} {scale}>
	<T.DodecahedronGeometry args={[0.01]} />
	<T.MeshToonMaterial color={randomColor(10, 80)} />
	{#each group3 as item}
		<Instance color={randomColor(80, 60)} position={[item.x, item.y, item.z]} scale={item.scale} />
	{/each}
</InstancedMesh>-->

<!-- Group 4: Rotates downwards
<InstancedMesh rotation.x={-rotation4} position={[-4, 0, 0]} {scale}>
	<T.DodecahedronGeometry args={[0.01]} />
	<T.MeshToonMaterial color={randomColor(10, 70)} />
	{#each group4 as item}
		<Instance color={randomColor(80, 60)} position={[item.x, item.y, item.z]} scale={item.scale} />
	{/each}
</InstancedMesh>-->
