<script>
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { T, useLoader, useTask } from '@threlte/core';
	import { interactivity } from '@threlte/extras';
	import { Spring } from 'svelte/motion';

	const gltf = useLoader(GLTFLoader).load('./stadiuum.glb');

	interactivity();

	const scale = new Spring(1);

	let rotation = 0;
	useTask((delta) => {
		rotation += delta / 4;
	});
</script>

<T.DirectionalLight castShadow intensity={1} position={[6, 10, -5]} />

{#if $gltf}
	<T is={$gltf.scene} position={[0.3, -1, -3]} scale={scale.current} castShadow />
{/if}
