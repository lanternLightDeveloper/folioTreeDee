<script>
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { T, useLoader, useTask } from '@threlte/core';
	import { interactivity } from '@threlte/extras';
	import { Spring } from 'svelte/motion';

	const gltf = useLoader(GLTFLoader).load('./emailIcon.glb');

	interactivity();

	const scale = new Spring(1);

	let rotation = $state(0);
	useTask((delta) => {
		rotation += delta / 6 / 20;
	});
</script>

{#if $gltf}
	<T is={$gltf.scene} position={[10, 0, 0]} scale={scale.current} castShadow />
{/if}
