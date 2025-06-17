<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { Studio } from '@threlte/studio';
	import ResumeScene from './ResumeScene.svelte';
	import Scene from './Scene.svelte';

	let autoRender = $state(true);
</script>

<main>
	<Canvas class="canvas">
		<!-- <Studio>
			<Scene />
		</Studio> -->

		<!-- <ResumeScene /> -->
		<Scene {autoRender} />
	</Canvas>
</main>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		overflow: hidden;
	}

	main {
		position: relative;
		background-color: rgb(58, 147, 231);
		color: white;
		/* border: 2px solid #ffd700; */
		width: 100vw;
		height: 100vh;
		margin: -8px;
	}
	@media (min-width: 768px) {
		main {
			background-color: lch(64.4% 33.33 240.21);
		}
	}
	/* 
	@media (prefers-color-scheme: dark) {
		main {
			background-color: rgb(0, 0, 0);
			color: white;
		}
	} */
</style>
