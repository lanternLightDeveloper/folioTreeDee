<script>
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { T, useLoader, useTask } from '@threlte/core';
	import { interactivity, ContactShadows } from '@threlte/extras';
	import { Spring } from 'svelte/motion';

	import Land from './LandSet.svelte';

	interactivity();

	const scale = new Spring(1);

	let rotation = 0;
	useTask((delta) => {
		rotation += delta / 4;
	});
</script>

<T.DirectionalLight castShadow intensity={1} position={[10, 10, 20]} />
<T.AmbientLight intensity={0.5} />

<Land />
