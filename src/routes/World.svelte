<script>
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { T, useLoader, useTask } from '@threlte/core';
	import { interactivity, ContactShadows } from '@threlte/extras';
	import { Spring } from 'svelte/motion';

	const gltf = useLoader(GLTFLoader).load('./HomeBound.glb');

	interactivity();

	const scale = new Spring(1);

	let rotation = 0;
	useTask((delta) => {
		rotation += delta / 4;
	});
</script>

<T.DirectionalLight castShadow intensity={1} position={[10, 10, 20]} />
<T.AmbientLight intensity={0.5} />

{#if $gltf}
	<T is={$gltf.scene} position={[10, 0, 0]} scale={scale.current} castShadow />
{/if}
