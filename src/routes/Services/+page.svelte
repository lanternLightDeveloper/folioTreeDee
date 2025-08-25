<script lang="ts">
	import { interactivity } from '@threlte/extras';
	import { Spring } from 'svelte/motion';

	type Props = {
		cameraRef?: any;
	};

	let { cameraRef }: Props = $props();

	let position = $state([-23.5, 18, 23]);
	let lookAtTarget = $state([-22, 12, 0]);
	let serviceButton = $state(1);

	interactivity();

	//  🦕  🦖🦖🦖 🦕 🦕     Handle camera movement trigger 💀= 💣 🌠
	const handleClick = async (newPosition, newLookAtTarget) => {
		const startPos = [...position];
		const endPos = newPosition;
		const startLookAt = [...lookAtTarget];
		const endLookAt = newLookAtTarget;
		const duration = 2000;

		position = newPosition;
		lookAtTarget = newLookAtTarget;

		animatePosition(startPos, endPos, startLookAt, endLookAt, duration);
	};

	const animatePosition = (startPos, endPos, startLookAt, endLookAt, duration) => {
		let startTime;
		let hasLoggedFrame = false;

		function animate(time) {
			if (!startTime) {
				startTime = time;
			}

			const elapsed = time - startTime;
			const t = Math.min(elapsed / duration, 1);

			let newPos = [
				(1 - t) * startPos[0] + t * endPos[0],
				(1 - t) * startPos[1] + t * endPos[1],
				(1 - t) * startPos[2] + t * endPos[2]
			];

			let newLookAt = [
				(1 - t) * startLookAt[0] + t * endLookAt[0],
				(1 - t) * startLookAt[1] + t * endLookAt[1],
				(1 - t) * startLookAt[2] + t * endLookAt[2]
			];

			if (!hasLoggedFrame) {
				hasLoggedFrame = true;
			}

			cameraRef.position.set(...newPos);
			cameraRef.lookAt(...newLookAt);

			if (t < 1) {
				requestAnimationFrame(animate);
			}
		}

		requestAnimationFrame(animate);
	};
</script>

{#if serviceButton === 1}
	<section>
		<div class="price-box glass-Box">
			<h2>Pricing Tiers</h2>
			<p>
				Every project is unique, and pricing varies based on scope and complexity. My goal is to
				deliver exceptional results while keeping costs fair and equitable. All projects come with a
				free year of support to ensure your website stays up and running.
			</p>
			<button
				class="button-gradient"
				onclick={() => {
					handleClick([-20, 9.5, 14], [-27, 9.5, 0]);
					serviceButton = 2;
				}}
			>
				Learn about the steps involved in the process.
			</button>

			<h3>Simple</h3>
			<p>
				Perfect for those who know exactly what they need. You provide the vision, including the
				color scheme, features, and design preferences, and I bring it to life with a static or
				lightly functional website.
			</p>

			<h3>Moderate</h3>
			<p>
				Ideal if you have a general idea but need some guidance to shape your vision. Together,
				we’ll refine your ideas into a cohesive, functional website. This is going to be more than
				just a static page.
			</p>

			<h3>"I’ll Handle It"</h3>
			<p>
				For when you have a jumble of brilliant ideas but need someone to make them happen. We’ll
				collaborate to turn your concepts into a polished, professional site. This can be complex
				and include E-commerce or CMS services.
			</p>
		</div>
	</section>
{/if}

{#if serviceButton === 2}
	<article class=" glass-Box">
		<h2>How It Works</h2>
		<p>
			I follow a structured process to ensure your project is completed efficiently and to the
			highest standard. Here's what to expect:
		</p>
		<button
			class="button-gradient"
			onclick={() => {
				handleClick([-20, 9.5, 14], [-27, 9.5, 0]);
				serviceButton = 3;
			}}
		>
			Follow the steps
		</button>
	</article>
{/if}

{#if serviceButton === 3}
	<article class=" glass-Box">
		<h2>Step 1</h2>
		<p>
			<strong>Planning:</strong> We’ll discuss your goals, brainstorm ideas, and create a clear plan
			for your website.
		</p>
		<button
			class="button-gradient"
			onclick={() => {
				handleClick([-19, 10.5, 14], [-25, 10.5, 0]);
				serviceButton = 4;
			}}
		>
			Next step
		</button>
	</article>
{/if}
{#if serviceButton === 4}
	<article class=" glass-Box">
		<h2>Step 2</h2>
		<p>
			<strong>Design:</strong> I’ll craft a layout, color palette, and design that reflect your brand
			and message.
		</p>
		<button
			class="button-gradient"
			onclick={() => {
				handleClick([-19, 11.5, 14], [-25, 11.5, 0]);
				serviceButton = 5;
			}}
		>
			Next step
		</button>
	</article>
{/if}
{#if serviceButton === 5}
	<article class=" glass-Box">
		<h2>Step 3</h2>
		<p>
			<strong>Development:</strong> Your website will be built from the ground up, tailored to your specifications.
		</p>

		<button
			class="button-gradient"
			onclick={() => {
				handleClick([-19, 13, 14], [-25, 13, 0]);
				serviceButton = 6;
			}}
		>
			Next step
		</button>
	</article>
{/if}
{#if serviceButton === 6}
	<article class=" glass-Box">
		<h2>Step 4</h2>
		<p>
			<strong>Testing:</strong> Every detail will be tested across different devices and browsers to
			ensure it works seamlessly.
		</p>

		<button
			class="button-gradient"
			onclick={() => {
				handleClick([-19, 14.5, 14], [-25, 14.5, 0]);
				serviceButton = 7;
			}}
		>
			Next step
		</button>
	</article>
{/if}

{#if serviceButton === 7}
	<article class=" glass-Box">
		<h2>Step 5</h2>
		<p>
			<strong>Deployment:</strong> Your website goes live and is ready to make an impact!
		</p>
		<button
			class="button-gradient"
			onclick={() => {
				handleClick([-19, 15.5, 14], [-25, 15.5, 0]);
				serviceButton = 8;
			}}
		>
			Next step
		</button>
	</article>
{/if}
{#if serviceButton === 8}
	<article class=" glass-Box">
		<h2>Step 6</h2>
		<p>
			<strong>Support:</strong> Enjoy free support for the first year to address any unforeseen issues
			or updates.
		</p>
		<button
			class="button-gradient"
			onclick={() => {
				handleClick([-20, 18.5, 14], [-28.5, 16, 0]);
				serviceButton = 9;
			}}
		>
			Final step
		</button>
	</article>
{/if}
{#if serviceButton === 9}
	<article class=" glass-Box">
		<h2>Step 7</h2>
		<p>
			<strong>Management:</strong> Take it further with advanced features like analytics, tracking, and
			audience engagement tools.
		</p>
	</article>
{/if}

<!-- 🦕  🦖🦖🦖 🦕 🦕 Styles 💀= 💣 🌠 -->
<!--svelte-ignore css_unused_selector -->
<style>
	section {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--size-5);
		width: 75vw;
		height: 100vh;
		border-radius: var(--rad-Sm);
		padding: var(--size-5);
		z-index: 999;
	}

	article {
		width: 30vw;

		& h2,
		p {
			margin: 0;
			padding: var(--size-2);
		}
	}

	.price-box {
		height: fit-content;
		max-height: 80vh;
		padding: var(--size-4);
		width: 30vw;
		overflow-y: auto;

		& p,
		h2,
		h3 {
			margin: 0;
			padding: 0;
		}
	}
</style>
