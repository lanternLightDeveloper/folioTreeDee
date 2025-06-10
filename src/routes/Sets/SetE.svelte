<script>
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { T, useLoader, useTask } from '@threlte/core';
	import { interactivity } from '@threlte/extras';
	import { Spring } from 'svelte/motion';

	const gltf = useLoader(GLTFLoader).load('./overHoodBROKEN.glb');

	interactivity();

	let rotation = 0;
	useTask((delta) => {
		rotation += delta / 4;
	});
</script>

{#if $gltf}
	<T is={$gltf.scene} position={[-2, 0.32, -0.88]} scale={0.01} rotation.y={rotation} castShadow />
{/if}
