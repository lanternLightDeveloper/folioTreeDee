<script lang="ts">
	import { T } from '@threlte/core';
	import { interactivity, Suspense } from '@threlte/extras';

	import World from './World/World.svelte';
	import Menu from './Menu.svelte';

	let position = $state([-47, 15, 65]);
	let lookAtTarget = $state([-25, 9, 12]);

	interactivity();
	type Props = {
		cameraRef: any;
	};

	let { cameraRef }: Props = $props();
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

// 🦕 🦖🦖🦖 🦕 🦕Model loading💀= 💣 🌠

<Menu {cameraRef} />
<Suspense final>
	{#snippet fallback()}
		<T.Mesh position={[-45, 15, 58]} rotation={[0, -0.5, 0]}>
			<T.PlaneGeometry args={[20, 20]} />
			<T.MeshBasicMaterial color="black" />
		</T.Mesh>
	{/snippet}

	<World />
</Suspense>
