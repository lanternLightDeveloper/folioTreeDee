<script lang="ts">
	import { T, useLoader } from '@threlte/core';
	import { interactivity, OrbitControls, HTML, Suspense } from '@threlte/extras';
	import { Spring } from 'svelte/motion';

	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	const gltf = useLoader(GLTFLoader).load('./window.glb');

	interactivity();

	//  🦕  🦖🦖🦖 🦕 🦕          💀= 💣 🌠
	import SetA from './Sets/SetA.svelte';
	import SetB from './Sets/SetB.svelte';
	import SetC from './Sets/SetC.svelte';
	import SetD from './Sets/SetD.svelte';
	import SetE from './Sets/SetE.svelte';
	import SetF from './Sets/SetF.svelte';
	import SetG from './Sets/SetG.svelte';
	import SetH from './Sets/SetH.svelte';
	let showH = $state(true);

	import SetJ from './Sets/SetJ.svelte';
	import SetK from './Sets/SetK.svelte';

	import BlackSquare from './transitions/BlackSquare.svelte';
	let showBlackSquare = $state(false);

	import ShowBoom from './transitions/Boom.svelte';
	let showBoom = $state(false);

	import ShowBlast from './transitions/Blast.svelte';
	let showBlast = $state(false);

	let html = $state();
	let position = $state([8, 4, 4]);
	let lookAtTarget = $state([-5, 0.5, 0.2]);
	let cameraRef = $state();
	let currentSet = $state('A');
	let nextSet = $state(null);
	let currentButton = $state(1);

	type Props = {
		autoRender?: boolean;
	};
	let { autoRender = false }: Props = $props();

	//  Move the camera to a new position and look at a new target
	//  🦕  🦖🦖🦖 🦕 🦕          💀= 💣 🌠
	const animatePosition = (startPos, endPos, startLookAt, endLookAt, duration, callback) => {
		let startTime;

		function animate(time) {
			if (!startTime) startTime = time;
			const elapsed = time - startTime;
			const t = Math.min(elapsed / duration, 1);

			position = [
				(1 - t) * startPos[0] + t * endPos[0],
				(1 - t) * startPos[1] + t * endPos[1],
				(1 - t) * startPos[2] + t * endPos[2]
			];

			const lookAt = [
				(1 - t) * startLookAt[0] + t * endLookAt[0],
				(1 - t) * startLookAt[1] + t * endLookAt[1],
				(1 - t) * startLookAt[2] + t * endLookAt[2]
			];

			cameraRef.position.set(...position);
			cameraRef.lookAt(...lookAt);

			if (t < 1) {
				requestAnimationFrame(animate);
			} else {
				if (callback) callback();
			}
		}

		requestAnimationFrame(animate);
	};

	const handleClick = async (newPosition, newLookAtTarget, callback) => {
		const startPos = [...position];
		const endPos = newPosition;
		const startLookAt = [...lookAtTarget];
		const endLookAt = newLookAtTarget;
		const duration = 2000;

		lookAtTarget = newLookAtTarget;
		animatePosition(startPos, endPos, startLookAt, endLookAt, duration, callback);
	};

	//  🦕  🦖🦖🦖 🦕 🦕          💀= 💣 🌠
	const loadNextSet = (set) => {
		nextSet = set;

		setTimeout(() => {
			currentSet = set;
			nextSet = null; // Reset nextSet
		}, 1000); // Adjust the delay as needed
	};

	// On clicks
	//  🦕  🦖🦖🦖 🦕 🦕          💀= 💣 🌠
	const TrxClick = () => {
		showBlackSquare = false;

		setTimeout(() => {
			showBlackSquare = true;
		}, 2400);
	};

	// Explosion
	//  🦕  🦖🦖🦖 🦕 🦕          💀= 💣 🌠
	const scale = new Spring([0.01, 0.01, 0.01]);

	function handleScale() {
		scale.target = scale.current[0] === 0.1 ? [0.01, 0.01, 0.01] : [0.1, 0.1, 0.1];
	}

	const Boom = () => {
		showH = false;

		setTimeout(() => {
			showBoom = true;

			setTimeout(() => {
				showBoom = false;
			}, 2700);
		}, 0);

		handleScale();
	};

	const Blast = () => {
		showH = false;

		setTimeout(() => {
			showBlast = true;

			setTimeout(() => {
				showBlast = false;
			}, 2700);
		}, 0);

		handleScale();
	};

	// Function to move the mesh up by 1 unit
	//  🦕  🦖🦖🦖 🦕 🦕          💀= 💣 🌠
	const windowPosition = new Spring([-2.1, 0]);
	const positionZ = $state(-0.7);

	const moveUp = () => {
		windowPosition.target = [-2.1, 0.25];
	};
</script>

<!-- Base camera -->
<T.PerspectiveCamera
	makeDefault
	position={[8, 4, 4]}
	oncreate={(ref) => {
		cameraRef = ref;
		cameraRef.lookAt(-5, 0.5, 0.2);
	}}
>
	<!-- <OrbitControls /> -->

	<HTML {autoRender} bind:this={html} class="menu">
		<BlackSquare bind:visible={showBlackSquare} />
		<article>
			<!-- Card 1 -->
			{#if currentButton === 1}
				<h1>Hello friend</h1>
				<p>
					Thank you for taking a moment to learn about me. There is a short or long story. I will
					give you the choice
				</p>
				<button
					onclick={async () => {
						TrxClick();
						await handleClick([-1, 0.6, -0.9], [-2, 0.6, -0.8], () => loadNextSet('D'));
						currentButton = 19; // Show next button
					}}
				>
					Short
				</button>
				<button
					onclick={() => {
						handleClick([-9, 2, 1], [-5, 0.5, 0.2], () => loadNextSet('A'));
						currentButton = 2;
					}}
				>
					Long
				</button>
			{/if}

			<!-- Card 2 -->
			{#if currentButton === 2}
				<p>
					As a kid, there was no allowance handed to me, if I wanted anything I had to earn it. Like
					many teens, I started by mowing lawns.
				</p>

				<button
					onclick={() => {
						handleClick([8, 4, 4], [-5, 0.5, 0.2], () => loadNextSet('A'));
						currentButton = 1;
					}}
				>
					Last(Start)
				</button>

				<button
					onclick={() => {
						handleClick([-2.9, 0.35, -0.35], [-5, 0.5, 0.2], () => loadNextSet('A'));
						currentButton = 3;
					}}
				>
					Next (3)
				</button>
			{/if}

			<!-- Card 3 -->
			{#if currentButton === 3}
				<p>
					I also took on random chores for people. Those small tasks added up, but I knew I wanted
					more than occasional little jobs.
				</p>

				<button
					onclick={() => {
						handleClick([-9, 2, 1], [-5, 0.5, 0.2], () => loadNextSet('A'));
						currentButton = 2;
					}}
				>
					Last (2)
				</button>

				<button
					onclick={async () => {
						await handleClick([-2.9, 0.35, -0.35], [-3.8, -0.3, 0], () => loadNextSet('B'));
						TrxClick();
						currentButton = 4;
					}}
				>
					Next (4)
				</button>
			{/if}

			<!-- Card 4	 -->
			{#if currentButton === 4}
				<p>
					So, I set out on my first job hunt. Balancing school and work was tricky, but I was
					determined to make it happen.
				</p>

				<button
					onclick={async () => {
						await handleClick([-2.9, 0.35, -0.35], [-5, 0.5, 0.2], () => loadNextSet('A'));
						TrxClick();
						currentButton = 3;
					}}
				>
					Last (3)
				</button>
				<button
					onclick={() => {
						handleClick([-2.9, 0.35, -0.2], [0, 0, -0.5], () => loadNextSet('B'));
						currentButton = 5; // Show next button
					}}
				>
					Next (5)
				</button>
			{/if}

			<!-- Card 5  -->
			{#if currentButton === 5}
				<p>
					It started with time in kitchens. I put local hours in washing dishes at a retirement
					facility.
				</p>
				<button
					onclick={async () => {
						await handleClick([-2.9, 0.35, -0.35], [-3.8, -0.3, 0], () => loadNextSet('B'));

						currentButton = 4;
					}}
				>
					Last (4)
				</button>
				<!-- To Set C -->
				<button
					onclick={() => {
						handleClick([-2, 0.37, -0.37], [-1.5, 0.37, -0.37], () => loadNextSet('C'));
						currentButton = 6; // Show next button
					}}
				>
					Next (6)
				</button>
			{/if}

			<!-- Card 6  -->
			{#if currentButton === 6}
				<p>But the exciting job? Working at the baseball field in the neighboring city.</p>

				<button
					onclick={() => {
						handleClick([-2.9, 0.35, -0.2], [0, 0, -0.5], () => loadNextSet('B'));
						currentButton = 5; // Show next button
					}}
				>
					Last (5)
				</button>

				<button
					onclick={() => {
						handleClick([-1.7, 0.38, -0.4], [-1, 0, -1], () => loadNextSet('C'));
						currentButton = 7; // Show next button
					}}
				>
					Next (7)
				</button>
			{/if}

			<!-- Card 7  -->
			{#if currentButton === 7}
				<p>
					At the stadium, I was employed in a club level kitchen and delivered food all over the
					building.
				</p>

				<button
					onclick={() => {
						handleClick([-2, 0.37, -0.37], [-1.5, 0.37, -0.37], () => loadNextSet('C'));
						currentButton = 6; // Show next button
					}}
				>
					Last (6)
				</button>

				<button
					onclick={() => {
						handleClick([2, -0.5, -3.6], [-0.6, 0, 1], () => loadNextSet('C'));
						currentButton = 8; // Show next button
					}}
				>
					Next (8)
				</button>
			{/if}

			{#if currentButton === 8}
				<p>
					I had a hard time seeing it as real work, I thought work was supposed to be difficult all
					the time. The stadium never felt like trying, a little busy, but we all had such a great
					time that it made it so easy.
				</p>

				<button
					onclick={() => {
						handleClick([-1.7, 0.38, -0.4], [-1, 0, -1], () => loadNextSet('C'));
						currentButton = 7; // Show next button
					}}
				>
					Last (7)
				</button>

				<!-- To Set D -->
				<button
					onclick={async () => {
						TrxClick();
						await handleClick([-1, 0.6, -0.9], [-2, 0.6, -0.8], () => loadNextSet('D'));
						currentButton = 9; // Show next button
					}}
				>
					Next (9)
				</button>
			{/if}

			<!-- Card 9  -->
			{#if currentButton === 9}
				<p>
					College wasn’t common in my circles, yet everyone around me told me I should go. Their
					encouragement gave me the nudge I needed.
				</p>

				<button
					onclick={async () => {
						TrxClick();
						await handleClick([2, -0.5, -3.6], [-0.6, 0, 1], () => loadNextSet('C'));
						currentButton = 8; // Show next button
					}}
				>
					Last (8)
				</button>

				<button
					onclick={() => {
						handleClick([-2.4, 0.5, -0.8], [-1.5, 0, -0.7], () => loadNextSet('D'));
						currentButton = 10; // Show next button
					}}
				>
					Next (10)
				</button>
			{/if}

			<!-- Card 10  -->
			{#if currentButton === 10}
				<p>
					I dove into civil engineering, dreaming of creating impressive structures, but life had
					other plans. Becoming a young father altered my path. There was a recession outside,
					nobody was building anything, explaining the tensile strength of steel didn’t seem to
					convince the power company to reduce my bills.
				</p>

				<button
					onclick={async () => {
						await handleClick([-1, 0.6, -0.9], [-2, 0.6, -0.8], () => loadNextSet('D'));
						currentButton = 9; // Show next button
					}}
				>
					Last (9)
				</button>

				<button
					onclick={async () => {
						currentButton = 11; // Show next button
					}}
				>
					More
				</button>

				<button
					onclick={async () => {
						moveUp();
						await handleClick([-2.05, 0.5, -0.6], [-2.1, 0.3, 2], () => loadNextSet('H'));
						currentButton = 14; // Show next button
					}}
				>
					Next (14)
				</button>
			{/if}

			{#if currentButton === 11}
				<p>
					I dove into civil engineering, dreaming of creating impressive structures, but life had
					other plans. Becoming a young father altered my path. There was a recession outside,
					nobody was building anything, explaining the tensile strength of steel didn’t seem to
					convince the power company to reduce my bills.
				</p>
				<p>
					So it was back to work I go. I learned what hard work truly meant while contracted at a
					company that pushed us to our limits—110-hour weeks and stretches of thirteen days in a
					row.
				</p>

				<button
					onclick={async () => {
						currentButton = 12; // Show next button
					}}
				>
					More
				</button>
			{/if}

			{#if currentButton === 12}
				<p>
					I dove into civil engineering, dreaming of creating impressive structures, but life had
					other plans. Becoming a young father altered my path. There was a recession outside,
					nobody was building anything, explaining the tensile strength of steel didn’t seem to
					convince the power company to reduce my bills.
				</p>
				<p>
					So it was back to work I go. I learned what hard work truly meant while contracted at a
					company that pushed us to our limits—110-hour weeks and stretches of thirteen days in a
					row.
				</p>
				<p>
					For a time, I sought out contract work and explored various odd jobs. Eventually, I
					shifted my focus to recession-proof industries like landscaping or the food sector. After
					all, grass will grow back, and people will always need to eat.
				</p>

				<button
					onclick={async () => {
						currentButton = 13; // Show next button
					}}
				>
					More
				</button>
			{/if}

			<!-- Card 13 -->
			{#if currentButton === 13}
				<p>
					I dove into civil engineering, dreaming of creating impressive structures, life had other
					plans. Becoming a young father altered my path. There was a recession outside, nobody was
					building anything, explaining the tensile strength of steel didn’t seem to convince the
					power company to reduce my bills.
				</p>
				<p>
					So it was back to work I go. I learned what hard work truly meant while contracted at a
					company that pushed us to our limits—110-hour weeks and stretches of thirteen days in a
					row.
				</p>
				<p>
					For a time, I sought out contract work and explored various odd jobs. Eventually, I
					shifted my focus to recession-proof industries like landscaping or the food sector. After
					all, grass will grow back, and people will always need to eat.
				</p>
				<p>
					The hours I logged in the food industry amounted to more than a bachelor’s degree. At
					times, I juggled two or three kitchens simultaneously. I needed to learn as much as I
					could. I'll take the heat in the kitchens over being stuck out in the rain.
				</p>

				<button
					onclick={() => {
						handleClick([-2.4, 0.5, -0.8], [-1.5, 0, -0.7], () => loadNextSet('D'));
						currentButton = 10;
					}}
				>
					Less
				</button>

				<button
					onclick={async () => {
						moveUp();
						await handleClick([-2.05, 0.5, -0.6], [-2.1, 0.3, 2], () => loadNextSet('H'));
						currentButton = 14; // Show next button
					}}
				>
					Next (14)
				</button>
			{/if}

			<!-- Card 12 -->
			{#if currentButton === 14}
				<p>
					Then, a window opened to something brand new, I joined a legal industry in its infancy. I
					was excited by the opportunity and eager to be part of something innovative and full of
					promise.
				</p>

				<button
					onclick={async () => {
						moveUp();
						await handleClick([-2.4, 0.5, -0.8], [-1.5, 0, -0.7], () => loadNextSet('D'));
						currentButton = 13; // Show next button
					}}
				>
					Last (13)
				</button>

				<button
					onclick={() => {
						handleClick([-2.05, 0.5, -0.6], [-3.1, 0.3, 1.4], () => loadNextSet('H'));
						currentButton = 15; // Show next button
					}}
				>
					Next (15)
				</button>
			{/if}

			<!-- Card 13 -->
			{#if currentButton === 15}
				<p>
					I started as a budtender and worked my way up to manager on the retail side. A store I
					worked at had no website. Learning about web development began as a hobby and down time in
					the shop.
				</p>

				<button
					onclick={() => {
						handleClick([-2.05, 0.5, -0.6], [-2.1, 0.3, 2], () => loadNextSet('H'));
						currentButton = 14; // Show next button
					}}
				>
					Last (14)
				</button>
				<button
					onclick={() => {
						handleClick([-3, 0.5, 1.4], [-2.4, 0.2, 2], () => loadNextSet('H'));
						currentButton = 16; // Show next button
					}}
				>
					Next(16)
				</button>
			{/if}

			{#if currentButton === 16}
				<p>
					Getting out of the stores, I transitioned into production and business-to-business sales
					across the western half of the state. After overcoming goals I have always sought new
					challenges and opportunities to grow.
				</p>

				<button
					onclick={() => {
						handleClick([-2.05, 0.5, -0.6], [-3.1, 0.3, 1.4], () => loadNextSet('H'));
						currentButton = 15; // Show next button
					}}
				>
					Last (15)
				</button>

				<button
					onclick={() => {
						handleClick([-2.85, 0.4, 1.8], [-2.74, 0.2, 2], () => loadNextSet('H'));
						currentButton = 17; // Show next button
					}}
				>
					Next (17)
				</button>
			{/if}

			{#if currentButton === 17}
				<p>
					Focused on growth, I was offered a position at a high-end restaurant. I loved the dream,
					it was difficult to realize my passion for food had faded. I turned it down. Instead, I
					transitioned into the tech industry, drawn by its limitless potential. Unlike a restaurant
					or store bound by a menu, development has no endpoint.
				</p>

				<button
					onclick={() => {
						handleClick([-3, 0.5, 1.4], [-2.4, 0.2, 2], () => loadNextSet('H'));
						currentButton = 16; // Show next button
					}}
				>
					Last(16)
				</button>

				<button
					onclick={async () => {
						Boom();
						await handleClick([-2.85, 0.4, 1.8], [-2.74, 0.3, 2], () => loadNextSet('J'));
						currentButton = 18;
					}}
				>
					Next(18)
				</button>
			{/if}

			{#if currentButton === 18}
				<p>
					Now, I work at a company that develops software for debt collection agencies, where I step
					in when databases crash or systems fail. This role has given me the opportunity to
					understand the full stack of how projects operate. I assist users at every level, from
					answering simple questions to troubleshooting critical system failures.
				</p>

				<button
					onclick={() => {
						handleClick([-3, 0.5, 1.4], [-2.4, 0.2, 2], () => loadNextSet('J'));
						currentButton = 17; //
					}}
				>
					Last(17)
				</button>
			{/if}

			{#if currentButton === 18}
				<p>
					Now, I work at a company that develops software for debt collection agencies, where I step
					in when databases crash or systems fail. This role has given me the opportunity to
					understand the full stack of how projects operate. I assist users at every level, from
					answering simple questions to troubleshooting critical system failures.
				</p>

				<button
					onclick={() => {
						handleClick([-3, 0.5, 1.4], [-2.4, 0.2, 2], () => loadNextSet('J'));
						currentButton = 17; //
					}}
				>
					Last(17)
				</button>
			{/if}

			{#if currentButton === 19}
				<p>
					I went to college for civil engineering with early plans of designing structures, but life
					had other intentions. With a recession outside and a family to support, I turned to hard
					work—110-hour weeks, odd jobs, and recession-proof industries like food service, where I
					juggled multiple kitchens to stay ahead.
				</p>

				<button
					onclick={async () => {
						moveUp();
						await handleClick([-2.05, 0.5, -0.6], [-2.1, 0.3, 2], () => loadNextSet('H'));
						currentButton = 20;
					}}
				>
					Next (20)
				</button>
			{/if}

			{#if currentButton === 20}
				<p>
					A new opportunity led me into the legal cannabis industry, where I climbed from budtender
					to manager, sparking my interest in web development while helping a store establish its
					online presence. Seeking growth, I transitioned into tech, drawn to its limitless
					innovation.
				</p>

				<button
					onclick={async () => {
						Blast();
						await handleClick([-2.05, 0.5, -0.6], [-1.3, 0.1, 2], () => loadNextSet('K'));
						currentButton = 21;
					}}
				>
					Next(21)
				</button>
			{/if}

			{#if currentButton === 21}
				<p>
					Now, I work for a software company, troubleshooting critical systems and building the
					skills of project production. Between collapsing databases I have spent my time learning
					new development questions to ask. Every challenge is a lesson, and every problem is a
					chance to grow.
				</p>

				<button
					onclick={async () => {
						moveUp();
						await handleClick([-2.05, 0.5, -0.6], [-2.1, 0.3, 2], () => loadNextSet('H'));
						currentButton = 20;
					}}
				>
					Last (20)
				</button>
			{/if}
		</article>
	</HTML>
</T.PerspectiveCamera>

<!-- Mesh Definition & test objects-->
<!-- 🦕  🦖🦖🦖 🦕 🦕          💀= 💣 🌠 -->
<!-- <T.Mesh
<T.Mesh>
	<T.TorusKnotGeometry args={[0.5, 1]} />
	<T.MeshToonMaterial {color} />
</T.Mesh> 
-->

{#if showBoom}
	<ShowBoom scale={scale.current} />
{/if}

{#if showBlast}
	<ShowBlast scale={scale.current} />
{/if}

<!-- Model loading and transitions -->
<!-- 🦕  🦖🦖🦖 🦕 🦕          💀= 💣 🌠 -->
<aside>
	{#if currentSet === 'A' || nextSet === 'A'}
		<Suspense>
			{#if currentSet === 'A'}
				<SetA />
			{/if}
		</Suspense>
	{/if}

	{#if currentSet === 'B' || nextSet === 'B'}
		<Suspense>
			{#if currentSet === 'B'}
				<SetB />
			{/if}
		</Suspense>
	{/if}

	{#if currentSet === 'C' || nextSet === 'C'}
		<Suspense>
			{#if currentSet === 'C'}
				<SetC />
			{/if}
		</Suspense>
	{/if}

	{#if currentSet === 'D' || nextSet === 'D'}
		<Suspense>
			{#if currentSet === 'D'}
				<SetD />

				{#if $gltf}
					<T
						is={$gltf.scene}
						position.x={windowPosition.current[0]}
						position.y={windowPosition.current[1]}
						position.z={positionZ}
						scale={1}
						castShadow
					/>
				{/if}
				{#if currentButton === 11}
					<SetF />
				{/if}
				{#if currentButton === 12}
					<SetE />
					<SetF />
				{/if}
				{#if currentButton === 13}
					<SetE />
					<SetF />
					<SetG />
				{/if}
			{/if}
		</Suspense>
	{/if}

	{#if currentSet === 'H' || nextSet === 'H'}
		<Suspense>
			{#if currentSet === 'H'}
				{#if showH}
					<SetH />
				{/if}
			{/if}
		</Suspense>
	{/if}

	{#if currentSet === 'J' || nextSet === 'J'}
		<Suspense>
			{#if currentSet === 'J'}
				<SetJ />
			{/if}
		</Suspense>
	{/if}

	{#if currentSet === 'K' || nextSet === 'K'}
		<Suspense>
			{#if currentSet === 'K'}
				<SetK />
			{/if}
		</Suspense>
	{/if}
</aside>

<!-- Buttons  -->
<!-- 🦕  🦖🦖🦖 🦕 🦕          💀= 💣 🌠 -->
<style>
	button {
		all: unset;
	}

	article {
		width: 15vw;
		margin: 10vh 5vw;
		background-color: rgb(100, 19, 133);
		border: 2px solid #ffd700;
		border-radius: 8px;
		padding: 1rem;
		z-index: 999;
	}

	button {
		width: 5vw;
		height: 10vh;
		background-color: #ffd700;
		color: black;
		font-weight: bold;
		font-size: 1rem;

		&:hover {
			background-color: #ffcc00;
		}
	}
</style>
