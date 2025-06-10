<script>
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { T, useLoader, useTask } from '@threlte/core';
	import { interactivity } from '@threlte/extras';
	import { Spring } from 'svelte/motion';

	const gltf = useLoader(GLTFLoader).load('igIcon.glb');

	interactivity();

	const scale = new Spring(1);

	let rotation = 0;
	useTask((delta) => {
		rotation += delta / 4;
	});
</script>

{#if $gltf}
	<T is={$gltf.scene} position={[10, 0, 0]} scale={scale.current} castShadow />
{/if}
