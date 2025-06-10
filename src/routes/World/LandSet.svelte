<script>
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { T, useLoader, useTask } from '@threlte/core';
	import { interactivity, ContactShadows } from '@threlte/extras';
	import { Spring } from 'svelte/motion';

	const gltfLand = useLoader(GLTFLoader).load('/src/lib/assets/models/World/HomeBoundLand.glb');
	interactivity();

	const scale = new Spring(1);
</script>

{#if $gltfLand}
	<T is={$gltfLand.scene} position={[10, 0, 0]} scale={scale.current} castShadow />
{/if}

