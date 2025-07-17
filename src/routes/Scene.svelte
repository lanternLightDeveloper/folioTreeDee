<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { interactivity, OrbitControls, Suspense, Text } from '@threlte/extras';

	import World from './World/World.svelte';
	import Menu from './Menu.svelte';

	let position = $state([-47, 15, 65]);
	let lookAtTarget = $state([-25, 9, 12]);
	let currentSet = $state('A');
	let nextSet = $state('');

	interactivity();
	type Props = {
		cameraRef: any;
	};

	let { cameraRef }: Props = $props();

	let showMenu = $state(false);
	let elapsed = 0;

	useTask((delta) => {
		if (!showMenu) {
			elapsed += delta;
			if (elapsed >= 2) {
				showMenu = true;
			}
		}
	});
</script>

// 🦕 🦖🦖🦖 🦕 🦕 Base camera + Lights💀= 💣 🌠
<T.PerspectiveCamera
	makeDefault
	{position}
	oncreate={(ref) => {
		cameraRef = ref;
		ref.lookAt(...lookAtTarget);
	}}
></T.PerspectiveCamera>

<T.DirectionalLight castShadow intensity={1} position={[10, 10, 20]} />
<T.AmbientLight intensity={0.5} />

// 🦕 🦖🦖🦖 🦕 🦕Loading💀= 💣 🌠

{#if showMenu}
	<Menu {cameraRef} />
{/if}

<Suspense
	final
	onload={() => {
		showMenu = true;
	}}
>
	{#snippet fallback()}
		<Text
			position.z={-10}
			position.x={-20}
			position.y={10}
			text="Loading..."
			fontSize={5}
			color="white"
			anchorX="50%"
			anchorY="50%"
			oncreate={(ref) => {
				ref.lookAt(-40, 10, 40);
			}}
		/>

		<T.Mesh position={[-45, 15, 58]} rotation={[0, -0.5, 0]}>
			<T.PlaneGeometry args={[20, 20]} />
			<T.MeshBasicMaterial color="black" />
		</T.Mesh>
	{/snippet}
	{#snippet error({ errors })}
		<Text
			position.z={-10}
			position.x={-20}
			position.y={10}
			text={errors.map((e) => e).join(', ')}
			fontSize={4}
			color="white"
			anchorX="50%"
			anchorY="50%"
			oncreate={(ref) => {
				ref.lookAt(-40, 10, 40);
			}}
		/>
	{/snippet}

	{#if currentSet === 'A' || nextSet === 'A'}
		{#if currentSet === 'A'}
			<World {cameraRef} />
		{/if}
	{/if}
</Suspense>
