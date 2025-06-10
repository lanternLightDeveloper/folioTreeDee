<script>
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { T, useLoader, useTask } from '@threlte/core';
	import { interactivity, ContactShadows } from '@threlte/extras';
	import { Spring } from 'svelte/motion';

	const gltfLand = useLoader(GLTFLoader).load('World/HomeBoundLand.glb');
	const gltfLandB = useLoader(GLTFLoader).load('World/HomeBoundLandBot.glb');
	const gltfStreet = useLoader(GLTFLoader).load('World/HomeBoundStreet.glb');
	const gltfParking = useLoader(GLTFLoader).load('World/HomeBoundParking.glb');
	const gltfTrail = useLoader(GLTFLoader).load('World/HomeBoundTrail.glb');
	const gltfExtras = useLoader(GLTFLoader).load('World/HomeBoundExtras.glb');
	const gltfBuildings = useLoader(GLTFLoader).load('World/HomeBoundBuildings.glb');
	const gltfNeighborhood = useLoader(GLTFLoader).load('World/HomeBoundNeighborhood.glb');
	

	interactivity();

	const scale = new Spring(1);
</script>

{#if $gltfLand}
	<T is={$gltfLand.scene} position={[10, 0, 0]} scale={scale.current} castShadow />
{/if}

{#if $gltfLandB}
	<T is={$gltfLandB.scene} position={[10, 0, 0]} scale={scale.current} castShadow />
{/if}

{#if $gltfStreet}
	<T is={$gltfStreet.scene} position={[10, 0, 0]} scale={scale.current} castShadow />
{/if}

{#if $gltfParking}
	<T is={$gltfParking.scene} position={[10, 0, 0]} scale={scale.current} castShadow />
{/if}

{#if $gltfTrail}
	<T is={$gltfTrail.scene} position={[10, 0, 0]} scale={scale.current} castShadow />
{/if}

{#if $gltfExtras}
	<T is={$gltfExtras.scene} position={[10, 0, 0]} scale={scale.current} castShadow />
{/if}

{#if $gltfBuildings}
	<T is={$gltfBuildings.scene} position={[10, 0, 0]} scale={scale.current} castShadow />
{/if}

{#if $gltfNeighborhood}
	<T is={$gltfNeighborhood.scene} position={[10, 0, 0]} scale={scale.current} castShadow />
{/if}
