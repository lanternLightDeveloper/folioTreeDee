<script lang="ts">
	import '$lib/styles/baseCamp.svelte';
	import { Canvas } from '@threlte/core';
	import { Studio } from '@threlte/studio';
	import ResumeScene from './ResumeScene.svelte';
	import Scene from './Scene.svelte';

	type Props = {
		autoRender?: boolean;
		cameraRef: any;
	};

	let { autoRender = true, cameraRef }: Props = $props();
</script>

<main>
	<Canvas class="canvas">
		<!-- <Studio>
			<Scene />
		</Studio> -->

		<!-- <ResumeScene /> -->
		<Scene {autoRender} {cameraRef} />
	</Canvas>
</main>

<!--svelte-ignore css_unused_selector -->
<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		overflow: hidden;
		font-family: var(--font-Main);
	}

	main {
		position: relative;
		background-color: rgb(58, 147, 231);
		width: 100vw;
		height: 100vh;
		margin: -8px;
	}
	@media (min-width: 768px) {
		main {
			background-color: lch(64.4% 33.33 240.21);
		}
	}
</style>
