<script lang="ts">
	import { T, useLoader, useTask } from '@threlte/core';
	import {
		interactivity,
		OrbitControls,
		HTML,
		Suspense,
		ImageMaterial,
		Text3DGeometry,
		useCursor,
		Billboard
	} from '@threlte/extras';
	import { Spring } from 'svelte/motion';
	import { text } from '@sveltejs/kit';
	import { DoubleSide } from 'three';

	import World from './World/World.svelte';
	import EmailIcon from './icons/EmailIcon.svelte';
	import IgIcon from './icons/IgIcon.svelte';
	import BskyIcon from './icons/BskyIcon.svelte';
	const cursor = useCursor('pointer');

	let html = $state();
	let cameraRef = $state();
	let currentSet = $state('A');
	let nextSet = $state(null);
	let currentButton = $state(1);
	let currentContact = $state(0);
	let showProjectDropdown = $state(false);
	let showContactDropdown = $state(false);
	const scale = new Spring([2, 2, 2]);

	interactivity();

	type Props = {
		autoRender?: boolean;
		follow?: boolean;
	};

	let { autoRender = true, follow = true }: Props = $props();
	//  🦕  🦖🦖🦖 🦕 🦕 Media Queries 💀= 💣 🌠

	let position = $state([-47, 15, 65]);
	let lookAtTarget = $state([-25, 9, 12]);
	let htmlMenuPos = $state([-27, 42.5]);
	let htmlHomeContext = $state([-80, 0]);
	let htmlServiceContext = $state([-40, 0]);
	let htmlProjectContext = $state([-40, 0]);
	let htmlAboutContext = $state([-40, 0]);

	function updatePosition() {
		const screenWidth = window.innerWidth;
		const screenHeight = window.innerHeight;

		// Example: Adjust position based on screen width
		if (screenWidth < 768) {
			position = [-47, 15, 65];
			lookAtTarget = [-20, 9, 12];
			htmlMenuPos = [-34, 42.5]; // Move menu for smaller screens
			htmlHomeContext = [-30, 0]; // Adjust context position for smaller screens
			htmlServiceContext = [-46, 40];
			htmlProjectContext = [-45, 0];
			htmlAboutContext = [-60, 3];
		} else if (screenWidth < 1024) {
			position = [-45, 15, 60];
			htmlMenuPos = [-65, 40]; // Default position
			htmlHomeContext = [-60, 0]; // Default context position
			htmlServiceContext = [-40, 0];
			htmlProjectContext = [-40, 0];
			htmlAboutContext = [-40, 0];
		}
	}

	// Run on load and window resize
	window.addEventListener('resize', updatePosition);
	updatePosition();

	function onResize() {
		console.log('You resized the browser window!');
	}

	window.addEventListener('resize', onResize);

	//  🦕  🦖🦖🦖 🦕 🦕Move the camera and look at a new target   💀= 💣 🌠
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

	//  🦕  🦖🦖🦖 🦕 🦕  Load sets 💀= 💣 🌠
	const loadNextSet = (set) => {
		nextSet = set;

		setTimeout(() => {
			currentSet = set;
			nextSet = null; // Reset nextSet
		}, 0); // Adjust the delay as needed
	};

	//  🦕  🦖🦖🦖 🦕 🦕  Extras 💀= 💣 🌠
	let rotation = $state(0);
	useTask((delta) => {
		rotation += delta / 6 / 20;
	});
</script>

<!-- Base camera -->
<T.PerspectiveCamera
	makeDefault
	{position}
	oncreate={(ref) => {
		cameraRef = ref;
		ref.lookAt(...lookAtTarget);
	}}
></T.PerspectiveCamera>

// 🦕 🦖🦖🦖 🦕 🦕 💀= 💣 🌠

<!-- Model loading -->
<!-- 🦕  🦖🦖🦖 🦕 🦕          💀= 💣 🌠 -->
{#if currentSet === 'A' || nextSet === 'A'}
	<Suspense>
		{#if currentSet === 'A'}
			<World />
		{/if}
	</Suspense>
{/if}
<Billboard {follow} position={[0, 15, 0]}>
	<T.Mesh>
		<T.BoxGeometry />
		<T.MeshStandardMaterial color="white" />
	</T.Mesh>
</Billboard>

// 🦕 🦖🦖🦖 🦕 🦕 💀= 💣 🌠
<!-- Menu
[-45, 15, 60], [-25, 9, 12]
[-40, 15, 20], [-30, 10, 10]
[-22, 18, 20], [-21, 12, 0]
[-5, 8.5, 12], [0, 8, 20]
[-5, 9, 13], [-15, 8, 10] -->
<HTML autoRender={false} position={htmlMenuPos}
	><aside class="menu">
		<button
			onclick={() => {
				handleClick([-47, 15, 65], [-20, 9, 12], () => loadNextSet('A'));
				currentButton = 1;
				currentContact = 0;
				showContactDropdown = false;
				showProjectDropdown = false;
			}}
		>
			Home
		</button>

		<button
			onclick={() => {
				handleClick([-40.5, 15, 21], [-30.5, 11, 10], () => loadNextSet('A'));
				currentButton = 3;
				currentContact = 0;
				showContactDropdown = true;
				showProjectDropdown = false;
			}}
		>
			Contact
		</button>

		<!-- Contact Dropdown Menu -->
		<div class="dropdown" class:show={showContactDropdown}>
			<button
				onclick={() => {
					currentContact = 3;
				}}
			>
				Email
			</button>
			<button
				onclick={() => {
					currentContact = 1;
				}}
			>
				Instagram
			</button>
			<button
				onclick={() => {
					currentContact = 2;
				}}
			>
				Bluesky
			</button>
			<br />
			<button
				onclick={() => {
					showContactDropdown = false;
				}}
			>
				Close
			</button>
		</div>

		<button
			onclick={() => {
				handleClick([-23.5, 18, 20], [-22.5, 12, 0], () => loadNextSet('A'));
				currentButton = 2;
				currentContact = 0;
				showContactDropdown = false;
				showProjectDropdown = false;
			}}
		>
			Services
		</button>

		<button
			onclick={() => {
				handleClick([-4.5, 8.5, 12], [0, 8, 20], () => loadNextSet('A'));
				currentButton = 4;
				currentContact = 0;
				showContactDropdown = false;
				showProjectDropdown = false;
			}}
		>
			About
		</button>

		<button
			onclick={() => {
				handleClick([-2, 10, 14], [-15, 8, 8], () => loadNextSet('A'));

				currentButton = 5;
				currentContact = 0;
				showProjectDropdown = true;
				showContactDropdown = false;
			}}
		>
			Projects
		</button>

		<!-- Projects Dropdown Menu -->
		<div class="dropdown" class:show={showProjectDropdown}>
			<button onclick={() => handleClick([-4, 10, 13], [-15, 8, 8], () => loadNextSet('A'))}>
				Artisan Countertops
			</button>
			<button onclick={() => handleClick([-19, 9.5, 11], [-13.5, 9.5, 0], () => loadNextSet('A'))}>
				What's for Dinner
			</button>
			<button onclick={() => handleClick([-3, 11, 13], [-3.5, 9.5, 0], () => loadNextSet('A'))}>
				WSRD
			</button>
			<br />
			<button
				onclick={() => {
					showProjectDropdown = false;
				}}
			>
				Close
			</button>
		</div>
	</aside></HTML
>

// 🦕 🦖🦖🦖 🦕 🦕 💀= 💣 🌠
<!-- Selection Text  -->
<HTML autoRender={true} class="menu" position={htmlHomeContext}>
	<article>
		{#if currentButton === 1}
			<p class="backky">
				Hello friend. Thank you for visiting my site. I hope you enjoy your stay.
			</p>
		{/if}
	</article>
</HTML>

<HTML autoRender={false} class="menu" position={htmlAboutContext}>
	<article>
		{#if currentButton === 4}
			<p class="about-box backky">
				A few years ago, while working in retail, I started learning website development during
				downtime at the shop. I took on the challenge of building a new site for the store, and
				something just clicked. What began as a side project quickly became a genuine passion, and I
				found myself diving deeper into design, development, and everything in between.
				<br />
				<br />
				Since then, I’ve kept learning and building—sometimes just for fun, sometimes for friends or
				small businesses—and I’ve realized I really enjoy helping others create a strong online presence.
				Now, I’m looking to work with individuals and businesses who need a website that not only looks
				good but actually works for them. If that sounds like something you’re after, I’d love to chat.
			</p>
		{/if}
	</article>
</HTML>

<!-- Contact / Social Icons -->
{#if currentContact === 0}
	<T.Mesh position={[-33, 11, 11]} scale={[0.005, 0.005, 0.005]} rotation={[-0.2, -0.65, -0.11]}>
		<Text3DGeometry text={'Contact'} />
		<T.MeshStandardMaterial color="black" />
	</T.Mesh>

	<T.Mesh position={[-33, 10, 11]} scale={[0.005, 0.005, 0.005]} rotation={[-0.2, -0.65, -0.11]}>
		<Text3DGeometry text={'US'} />
		<T.MeshStandardMaterial color="black" />
	</T.Mesh>

	<T.Mesh position={[-33, 9, 11]} scale={[0.005, 0.005, 0.005]} rotation={[-0.2, -0.65, -0.11]}>
		<Text3DGeometry text={'NOW!'} />
		<T.MeshStandardMaterial color="black" />
	</T.Mesh>
{/if}

<!-- IG icon  -->
<T.Mesh
	class="igIcon"
	onclick={() => {
		currentContact = 1;
	}}
	onpointerenter={cursor.onPointerEnter}
	onpointerleave={cursor.onPointerLeave}
>
	<IgIcon />
</T.Mesh>

<!-- BluSky icon  -->
<T.Mesh
	onclick={() => {
		currentContact = 2;
	}}
	onpointerenter={cursor.onPointerEnter}
	onpointerleave={cursor.onPointerLeave}
>
	<BskyIcon />
</T.Mesh>

<!-- Email  -->
<T.Mesh
	onclick={() => {
		currentContact = 3;
	}}
	onpointerenter={cursor.onPointerEnter}
	onpointerleave={cursor.onPointerLeave}
>
	<EmailIcon />
</T.Mesh>
{#if currentButton === 3}
	<!-- Instagram  -->
	{#if currentContact === 1}
		<T.Mesh position={[-33, 11, 11]} scale={[0.005, 0.005, 0.005]} rotation={[-0.2, -0.65, -0.11]}>
			<Text3DGeometry text={'Instagram'} />
			<T.MeshStandardMaterial color="white" />
		</T.Mesh>
		<T.Mesh position={[-32, 9, 11.8]} scale={[4.8, 2.75]} rotation={[0, -0.723, 0]}>
			<T.PlaneGeometry />
			<ImageMaterial transparent side={DoubleSide} url="uckzAlt.png" />
		</T.Mesh>
	{/if}

	<!-- BluSky  -->

	{#if currentContact === 2}
		<T.Mesh position={[-33, 11, 11]} scale={[0.005, 0.005, 0.005]} rotation={[-0.2, -0.65, -0.11]}>
			<Text3DGeometry text={'BlueSky'} />
			<T.MeshStandardMaterial color="blue" />
		</T.Mesh>
		<T.Mesh position={[-32, 9, 11.8]} scale={[4.8, 2.75]} rotation={[0, -0.723, 0]}>
			<T.PlaneGeometry />
			<ImageMaterial transparent side={DoubleSide} url="butterfittiAlt.png" />
		</T.Mesh>
	{/if}

	<!-- Email  -->
	{#if currentContact === 3}
		<T.Mesh position={[-28, 7.25, 8]} scale={[1, 1, 1]} rotation={[0, -0.65, 0]}>
			<HTML position.y={0} transform {autoRender}>
				<form class="contact">
					<p>Reach out</p>
					<br />
					<label for="full_name">Name</label><br />
					<input
						type="text"
						id="full_name"
						name="full_name"
						placeholder="Enter your name"
						required
					/><br />

					<label for="contact_point">Email</label><br />
					<input
						type="text"
						id="contact_point"
						name="contact_point"
						placeholder="Enter your email"
						required
					/><br />

					<label for="message">Message</label><br />
					<textarea id="message" name="message" placeholder="Enter your message" required
					></textarea>

					<button class="ripple-btn" type="submit">Submit</button>
				</form>
			</HTML>
		</T.Mesh>
	{/if}
{/if}

// 🦕 🦖🦖🦖 🦕 🦕 💀= 💣 🌠
<!-- Services -->
<HTML autoRender={false} position={htmlServiceContext} class="services">
	{#if currentButton === 2}
		<section>
			<div class="price-box backky">
				<h2>Pricing Tiers</h2>
				<p>
					Every project is unique, and pricing varies based on scope and complexity. My goal is to
					deliver exceptional results while keeping costs fair and equitable. All projects come with
					a free year of support to ensure your website stays up and running.
				</p>
				<button
					onclick={() => {
						handleClick([-19, 9.5, 14], [-25, 9.5, 0], () => loadNextSet('A'));
						currentButton = 6;
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

	{#if currentButton === 6}
		<article class="steps backky">
			<h2>How It Works</h2>
			<p>
				I follow a structured process to ensure your project is completed efficiently and to the
				highest standard. Here's what to expect:
			</p>
			<button
				onclick={() => {
					handleClick([-19, 9.5, 14], [-25, 9.5, 0], () => loadNextSet('A'));
					currentButton = 7;
				}}
			>
				Follow the steps
			</button>
		</article>
	{/if}
	{#if currentButton === 7}
		<article class="steps backky">
			<h2>Step 1</h2>
			<p>
				<strong>Planning:</strong> We’ll discuss your goals, brainstorm ideas, and create a clear plan
				for your website.
			</p>
			<button
				onclick={() => {
					handleClick([-19, 10.5, 14], [-25, 10.5, 0], () => loadNextSet('A'));
					currentButton = 8;
				}}
			>
				Next step
			</button>
		</article>
	{/if}
	{#if currentButton === 8}
		<article class="steps backky">
			<h2>Step 2</h2>
			<p>
				<strong>Design:</strong> I’ll craft a layout, color palette, and design that reflect your brand
				and message.
			</p>
			<button
				onclick={() => {
					handleClick([-19, 11.5, 14], [-25, 11.5, 0], () => loadNextSet('A'));
					currentButton = 9;
				}}
			>
				Next step
			</button>
		</article>
	{/if}
	{#if currentButton === 9}
		<article class="steps backky">
			<h2>Step 3</h2>
			<p>
				<strong>Development:</strong> Your website will be built from the ground up, tailored to your
				specifications.
			</p>

			<button
				onclick={() => {
					handleClick([-19, 13, 14], [-25, 13, 0], () => loadNextSet('A'));
					currentButton = 10;
				}}
			>
				Next step
			</button>
		</article>
	{/if}
	{#if currentButton === 10}
		<article class="steps backky">
			<h2>Step 4</h2>
			<p>
				<strong>Testing:</strong> Every detail will be tested across different devices and browsers to
				ensure it works seamlessly.
			</p>

			<button
				onclick={() => {
					handleClick([-19, 14.5, 14], [-25, 14.5, 0], () => loadNextSet('A'));
					currentButton = 11;
				}}
			>
				Next step
			</button>
		</article>
	{/if}

	{#if currentButton === 11}
		<article class="steps backky">
			<h2>Step 5</h2>
			<p>
				<strong>Deployment:</strong> Your website goes live and is ready to make an impact!
			</p>
			<button
				onclick={() => {
					handleClick([-19, 15.5, 14], [-25, 15.5, 0], () => loadNextSet('A'));
					currentButton = 12;
				}}
			>
				Next step
			</button>
		</article>
	{/if}
	{#if currentButton === 12}
		<article class="steps backky">
			<h2>Step 6</h2>
			<p>
				<strong>Support:</strong> Enjoy free support for the first year to address any unforeseen issues
				or updates.
			</p>
			<button
				onclick={() => {
					handleClick([-19, 18.5, 14], [-26, 16, 0], () => loadNextSet('A'));
					currentButton = 13;
				}}
			>
				Final step
			</button>
		</article>
	{/if}
	{#if currentButton === 13}
		<article class="steps backky">
			<h2>Step 7</h2>
			<p>
				<strong>Management:</strong> Take it further with advanced features like analytics, tracking,
				and audience engagement tools.
			</p>
		</article>
	{/if}
</HTML>

<!-- 🦕  🦖🦖🦖 🦕 🦕 Projects💀= 💣 🌠 -->

<HTML autoRender={false} class="menu" position={htmlProjectContext}>
	<article>
		{#if currentButton === 5}
			<p class="backky">Projects: these are so cool</p>
		{/if}
	</article>
</HTML>

<!-- 🦕  🦖🦖🦖 🦕 🦕          💀= 💣 🌠 -->
<!--svelte-ignore css_unused_selector -->
<style>
	button {
		all: unset;
	}

	.backky {
		background-color: lch(0.86% 4.14 318.14);
		border-radius: 8px;
		border: 2px solid #ffd700;
		padding: 0.5rem;
	}

	aside {
		position: fixed; /* or absolute */
		top: 0;
		right: 0;
		display: flex;
		justify-content: center;
		width: 70vw;
	}

	.menu {
		width: fit-content;
		padding: 0.25rem;
		border-radius: 8px;
		border: 2px solid lch(0.86% 4.14 318.14);
		background: lch(0.86% 4.14 318.14);

		& button {
			border-radius: 8px;
			margin: 0 0.25rem;
		}
	}

	.dropdown {
		position: absolute;
		background: #ffd700;
		border: 4px solid lch(0.86% 4.14 318.14);
		border-radius: 8px;
		padding: 10px;
		display: none;
		margin-top: 2rem;
	}

	.dropdown.show {
		display: block;
	}

	article {
		width: 25vw;
		margin: 0vh 5vw;

		border-radius: 8px;
		padding: 1rem;
		z-index: 999;
	}

	section {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		width: 75vw;
		height: 100vh;
		border-radius: 8px;
		padding: 1rem;
		z-index: 999;
	}

	.price-box {
		height: 80vh;
		max-height: 80vh;
		padding: 0 0.25rem;
		margin: 0.5rem -5vw;
		width: 40vw;
		overflow-y: auto;
	}

	.about-box {
		height: 20vh;
		max-height: 20vh;
		padding: 0 0.5rem;
		margin: 0.5rem -5vw;
		width: 80vw;
		overflow-y: auto;
	}

	.steps {
		padding: 0 0.75rem;
		margin: 20vh -5vw;
		width: 40vw;
	}

	.lrgContext {
		width: 80vw;
	}
	button {
		padding: 0.5rem;
		background-color: lch(86.93% 87.16 91.27);
		color: black;
		font-weight: bold;
		font-size: 1rem;

		&:hover {
			background-color: #ffcc00;
		}
	}
</style>
