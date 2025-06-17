<script>
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { T, useLoader, useTask } from '@threlte/core';
	import { ContactShadows, interactivity } from '@threlte/extras';
	import { Spring } from 'svelte/motion';

	const gltf = useLoader(GLTFLoader).load('./storeToWhat.glb');

	interactivity();

	const scale = new Spring(1);

	let rotation = 0;
	useTask((delta) => {
		rotation += delta / 4;
	});
</script>

<T.DirectionalLight castShadow intensity={1} position={[0, 1, -1]} />
<T.DirectionalLight castShadow intensity={0.5} position={[-5, 8, -3]} />

<ContactShadows frames={200} scale={10} blur={2} far={2.5} opacity={0.5} />

{#if $gltf}
	<T is={$gltf.scene} position={[-1.7, 0, 0.8]} scale={0.31} rec />
{/if}
