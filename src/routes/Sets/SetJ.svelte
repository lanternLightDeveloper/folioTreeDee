<script>
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { T, useLoader, useTask } from '@threlte/core';
	import { interactivity } from '@threlte/extras';
	import { Spring } from 'svelte/motion';

	const gltf = useLoader(GLTFLoader).load('./beReal.glb');

	interactivity();

	const scale = new Spring(1);

	let rotation = 0;
	useTask((delta) => {
		rotation += delta / 4;
	});
</script>

<T.DirectionalLight castShadow intensity={1} position={[-5, 4, -6]} />

{#if $gltf}
	<T is={$gltf.scene} position={[5, -5.5, 2.5]} scale={5} castShadow />
{/if}
