<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { interactivity, OrbitControls, Suspense, HTML, Text } from '@threlte/extras';

	import World from './World/World.svelte';
	import Menu from './Menu/+page.svelte';
	import Home from './Home/+page.svelte';
	import Services from './Services/+page.svelte';
	import Contact from './Contact/+page.svelte';
	import About from './About/+page.svelte';
	import Projects from './Projects/+page.svelte';

	interactivity();
	type Props = {
		cameraRef: any;
		autorender?: boolean;
	};

	let { cameraRef }: Props = $props();

	let position = $state([-47, 15, 65]);
	let lookAtTarget = $state([-25, 9, 12]);
	let htmlMenuPos = $state([-27, 42.5]);
	let htmlHomeContext = $state([-80, 0]);
	let htmlServiceContext = $state([-40, 0]);
	let htmlProjectContext = $state([-40, 0]);
	let htmlAboutContext = $state([-40, 0]);
	let cameraLocked = $state(false);
	let currentSet = $state('A');
	let nextSet = $state('');
	let showMenu = $state(false);
	let elapsed = 0;
	let html = $state();

	let currentButton = $state(1);
	let currentContact = $state(0);

	useTask((delta) => {
		if (!showMenu) {
			elapsed += delta;
			if (elapsed >= 2) {
				showMenu = true;
			}
		}
	});

	function updatePosition() {
		if (cameraLocked) {
			return;
		}

		const screenWidth = window.innerWidth;

		if (screenWidth < 768) {
			position = [-43, 13, 65];
			lookAtTarget = [-20, 9, 12];
			htmlMenuPos = [-28.5, 43.5];
			htmlHomeContext = [-50, -5];
			htmlServiceContext = [-42, 40];
			htmlProjectContext = [-40, -5];
			htmlAboutContext = [-55, 0];
		} else if (screenWidth > 728) {
			position = [-45, 15, 60];
			htmlMenuPos = [-30, 42];
			htmlHomeContext = [-80, 0];
			htmlServiceContext = [-40, 30];
			htmlProjectContext = [-30, 0];
			htmlAboutContext = [-88, 0];
		}
	}

	window.addEventListener('resize', updatePosition);

	updatePosition();
	//  🦕  🦖🦖🦖 🦕 🦕  Extras/ Debug 💀= 💣 🌠
</script>

// 🦕 🦖🦖🦖 🦕 🦕 Base camera + Lights💀= 💣 🌠
<T.PerspectiveCamera
	makeDefault
	{position}
	oncreate={(ref) => {
		cameraRef = ref;
		ref.lookAt(...lookAtTarget);
	}}
></T.PerspectiveCamera>

<T.DirectionalLight castShadow intensity={1} position={[10, 10, 20]} />
<T.AmbientLight intensity={0.5} />

// 🦕 🦖🦖🦖 🦕 🦕Loading💀= 💣 🌠

<Suspense
	final
	onload={() => {
		showMenu = true;
	}}
>
	{#snippet fallback()}
		<Text
			position.z={-10}
			position.x={-20}
			position.y={10}
			text="Loading..."
			fontSize={5}
			color="white"
			anchorX="50%"
			anchorY="50%"
			oncreate={(ref) => {
				ref.lookAt(-40, 10, 40);
			}}
		/>

		<T.Mesh position={[-45, 15, 58]} rotation={[0, -0.5, 0]}>
			<T.PlaneGeometry args={[20, 20]} />
			<T.MeshBasicMaterial color="black" />
		</T.Mesh>
	{/snippet}
	{#snippet error({ errors })}
		<Text
			position.z={-10}
			position.x={-20}
			position.y={10}
			text={errors.map((e) => e).join(', ')}
			fontSize={4}
			color="white"
			anchorX="50%"
			anchorY="50%"
			oncreate={(ref) => {
				ref.lookAt(-40, 10, 40);
			}}
		/>
	{/snippet}

	{#if currentSet === 'A' || nextSet === 'A'}
		{#if currentSet === 'A'}
			<World />
		{/if}
	{/if}
</Suspense>

<HTML autoRender={false} position={htmlMenuPos}>
	{#if showMenu}
		<Menu {cameraRef} bind:currentButton bind:currentContact />
	{/if}
</HTML>

// 🦕 🦖🦖🦖 🦕 🦕 Home Text 💀= 💣 🌠
<HTML autoRender={false} position={htmlHomeContext}>
	{#if currentButton === 1}
		<Home />
	{/if}
</HTML>

// 🦕 🦖🦖🦖 🦕 🦕Services 💀= 💣 🌠
<HTML autoRender={false} position={htmlServiceContext}>
	{#if currentButton === 2}
		<Services {cameraRef} />
	{/if}
</HTML>

// 🦕 🦖🦖🦖 🦕 🦕 Contact / Social Icons 💀= 💣 🌠
<!-- {#if currentButton === 3}{/if} -->
<Contact bind:currentContact />

// 🦕 🦖🦖🦖 🦕 🦕 About💀= 💣 🌠
<HTML autoRender={false} position={htmlAboutContext}>
	{#if currentButton === 4}
		<About />
	{/if}
</HTML>

<!-- 🦕  🦖🦖🦖 🦕 🦕 Projects💀= 💣 🌠 -->
<HTML autoRender={false} position={htmlProjectContext}>
	{#if currentButton === 5}
		<Projects />
	{/if}
</HTML>
