<script lang="ts">
	import { T, useLoader, useTask } from '@threlte/core';
	import {
		interactivity,
		HTML,
		ImageMaterial,
		Text3DGeometry,
		useCursor,
		Text,
		useSuspense
	} from '@threlte/extras';
	import { Spring } from 'svelte/motion';
	import { DoubleSide } from 'three';

	import EmailIcon from './Icons/EmailIcon.svelte';
	import IgIcon from './Icons/IgIcon.svelte';
	import BskyIcon from './Icons/BskyIcon.svelte';
	// A. Cursor set for interactivity
	const cursor = useCursor('pointer');
	console.log('A. [init] Cursor set to pointer');

	// B. State initialization
	let html = $state();
	let currentButton = $state(1);
	let currentContact = $state(0);
	let currentSet = $state('A');
	let nextSet = $state(null);
	let showProjectDropdown = $state(false);
	let showContactDropdown = $state(false);
	console.log('B. [init] UI states initialized');

	const scale = new Spring([2, 2, 2]);
	console.log('C. [init] Spring scale set');

	// D. Interactivity setup
	interactivity();
	console.log('D. [init] Interactivity enabled');

	type Props = {
		autoRender?: boolean;
		cameraRef: any;
	};

	let { autoRender = true, cameraRef }: Props = $props();
	console.log('E. [props] Props received:', { autoRender, cameraRef });

	const suspend = useSuspense();
	const menuReady = suspend(new Promise((resolve) => setTimeout(resolve, 1))); // or more realistically, wait on something meaningful

	// F. Initial positions and responsive layout setup
	let position = $state([-47, 15, 65]);
	let lookAtTarget = $state([-25, 9, 12]);
	let htmlMenuPos = $state([-27, 42.5]);
	let htmlHomeContext = $state([-80, 0]);
	let htmlServiceContext = $state([-40, 0]);
	let htmlProjectContext = $state([-40, 0]);
	let htmlAboutContext = $state([-40, 0]);
	console.log('F. [init] Scene positioning initialized');

	function updatePosition() {
		const screenWidth = window.innerWidth;
		const screenHeight = window.innerHeight;
		console.log('G. [updatePosition] Screen dimensions:', { screenWidth, screenHeight });

		if (screenWidth < 768) {
			console.log('H. [updatePosition] Applying mobile layout');
			position = [-43, 13, 65];
			lookAtTarget = [-20, 9, 12];
			htmlMenuPos = [-28.5, 43.5];
			htmlHomeContext = [-30, -5];
			htmlServiceContext = [-42, 40];
			htmlProjectContext = [-45, 0];
			htmlAboutContext = [-55, 0];
		} else if (screenWidth > 728) {
			console.log('I. [updatePosition] Applying desktop layout');
			position = [-45, 15, 60];
			htmlMenuPos = [-30, 42];
			htmlHomeContext = [-60, 0];
			htmlServiceContext = [-35, 40];
			htmlProjectContext = [-40, 0];
			htmlAboutContext = [-87, 2];
		}
	}

	window.addEventListener('resize', updatePosition);
	console.log('J. [resize] Resize listener attached');
	updatePosition(); // Trigger initial layout
	console.log('K. [updatePosition] Initial layout applied');

	// L. Handle camera movement trigger
	const handleClick = async (newPosition, newLookAtTarget, callback) => {
		console.log('L. [handleClick] Target position:', newPosition);
		console.log('M. [handleClick] Target lookAt:', newLookAtTarget);

		const startPos = [...position];
		const endPos = newPosition;
		const startLookAt = [...lookAtTarget];
		const endLookAt = newLookAtTarget;
		const duration = 2000;

		console.log('N. [handleClick] Captured current position + lookAt');
		lookAtTarget = newLookAtTarget;
		console.log('O. [handleClick] Updated lookAtTarget');

		animatePosition(startPos, endPos, startLookAt, endLookAt, duration, callback, cameraRef);
	};

	// M. Animate camera
	const animatePosition = (
		startPos,
		endPos,
		startLookAt,
		endLookAt,
		duration,
		callback,
		cameraRef
	) => {
		console.log('P. [animatePosition] Initiating camera animation');
		let startTime;

		function animate(time) {
			if (!startTime) {
				startTime = time;
				console.log('Q. [animate] Animation start time:', startTime);
			}

			const elapsed = time - startTime;
			const t = Math.min(elapsed / duration, 1);
			// console.log(`R. [animate] Progress: ${t.toFixed(2)} | Elapsed: ${elapsed.toFixed(2)}ms`);

			const newPos = [
				(1 - t) * startPos[0] + t * endPos[0],
				(1 - t) * startPos[1] + t * endPos[1],
				(1 - t) * startPos[2] + t * endPos[2]
			];
			// console.log('S. [animate] Interpolated position:', newPos);

			const newLookAt = [
				(1 - t) * startLookAt[0] + t * endLookAt[0],
				(1 - t) * startLookAt[1] + t * endLookAt[1],
				(1 - t) * startLookAt[2] + t * endLookAt[2]
			];
			// console.log('T. [animate] Interpolated lookAt:', newLookAt);

			if (!cameraRef) {
				console.warn('U. [animate] cameraRef is undefined!');
				return;
			}

			cameraRef.position.set(...newPos);
			cameraRef.lookAt(...newLookAt);
			// console.log('V. [animate] Camera position + lookAt updated');

			if (t < 1) {
				requestAnimationFrame(animate);
			} else {
				console.log('W. [animate] Animation complete');
				if (callback) {
					console.log('X. [animate] Executing callback');
					callback();
				}
			}
		}

		requestAnimationFrame(animate);
	};

	// Y. Trigger UI content switch
	const loadNextSet = (set) => {
		console.log('Y. [loadNextSet] Switching to set:', set);
		nextSet = set;

		setTimeout(() => {
			currentSet = set;
			nextSet = null;
			console.log('Z. [loadNextSet] Set finalized:', currentSet);
		}, 0);
	};

	//  🦕  🦖🦖🦖 🦕 🦕  Extras 💀= 💣 🌠
</script>

{#await menuReady}
	<!-- nothing -->
{/await}
// 🦕 🦖🦖🦖 🦕 🦕 Menu 💀= 💣 🌠
<HTML autoRender={false} position={htmlMenuPos}
	><aside class="menu">
		<button
			onclick={() => {
				handleClick([-43, 13, 65], [-20, 9, 12], () => loadNextSet('A'));
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
			<a href="https://www.instagram.com/lanternlightdevelopment/">
				<button
					onclick={() => {
						currentContact = 1;
					}}
				>
					Instagram
				</button>
			</a>
			<a href="https://bsky.app/profile/soturbulent.bsky.social">
				<button
					onclick={() => {
						currentContact = 2;
					}}
				>
					Bluesky
				</button>
			</a>
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
				handleClick([-23.5, 18, 23], [-22, 12, 0], () => loadNextSet('A'));
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
	</aside>
</HTML>

// 🦕 🦖🦖🦖 🦕 🦕 Selection Text 💀= 💣 🌠
<HTML autoRender={true} class="menu" position={htmlHomeContext}>
	<article>
		{#if currentButton === 1}
			<p class="backer">
				Thank you for visiting, while this site is under construction, I hope you enjoy your visit.
			</p>
		{/if}
	</article>
</HTML>

// 🦕 🦖🦖🦖 🦕 🦕 Contact / Social Icons 💀= 💣 🌠
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

// 🦕 🦖🦖🦖 🦕 🦕Services 💀= 💣 🌠
<HTML autoRender={false} position={htmlServiceContext} class="services">
	{#if currentButton === 2}
		<section>
			<div class="price-box backer">
				<h2>Pricing Tiers</h2>
				<p>
					Every project is unique, and pricing varies based on scope and complexity. My goal is to
					deliver exceptional results while keeping costs fair and equitable. All projects come with
					a free year of support to ensure your website stays up and running.
				</p>
				<button
					onclick={() => {
						handleClick([-20, 9.5, 14], [-27, 9.5, 0], () => loadNextSet('A'));
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
		<article class="steps backer">
			<h2>How It Works</h2>
			<p>
				I follow a structured process to ensure your project is completed efficiently and to the
				highest standard. Here's what to expect:
			</p>
			<button
				onclick={() => {
					handleClick([-20, 9.5, 14], [-27, 9.5, 0], () => loadNextSet('A'));
					currentButton = 7;
				}}
			>
				Follow the steps
			</button>
		</article>
	{/if}
	{#if currentButton === 7}
		<article class="steps backer">
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
		<article class="steps backer">
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
		<article class="steps backer">
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
		<article class="steps backer">
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
		<article class="steps backer">
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
		<article class="steps backer">
			<h2>Step 6</h2>
			<p>
				<strong>Support:</strong> Enjoy free support for the first year to address any unforeseen issues
				or updates.
			</p>
			<button
				onclick={() => {
					handleClick([-20, 18.5, 14], [-28.5, 16, 0], () => loadNextSet('A'));
					currentButton = 13;
				}}
			>
				Final step
			</button>
		</article>
	{/if}
	{#if currentButton === 13}
		<article class="steps backer">
			<h2>Step 7</h2>
			<p>
				<strong>Management:</strong> Take it further with advanced features like analytics, tracking,
				and audience engagement tools.
			</p>
		</article>
	{/if}
</HTML>

// 🦕 🦖🦖🦖 🦕 🦕 About💀= 💣 🌠
<HTML autoRender={false} class="menu" position={htmlAboutContext}>
	<article>
		{#if currentButton === 4}
			<p class="about-box backer">
				A few years ago, while working in retail, I started learning website development during
				downtime at the shop. I took on the challenge of building a new site for the store, and
				something just clicked. What began as a side project quickly became a genuine passion, and I
				found myself diving deeper into design, development, and everything in between.
				<br />
				<br />
				Since then, I’ve kept learning and building stuff, sometimes just for fun or sometimes for small
				businesses. I’ve realized I really enjoy helping others create a strong online presence. Now,
				I’m looking to work with individuals and businesses who need a website that not only looks good
				but actually works for them. If that sounds like something you’re after, I’d love to chat.
			</p>
		{/if}
	</article>
</HTML>

<!-- 🦕  🦖🦖🦖 🦕 🦕 Projects💀= 💣 🌠 -->
<HTML autoRender={false} class="menu" position={htmlProjectContext}>
	<article>
		{#if currentButton === 5}
			<p class="backer">Projects: these are so cool</p>
		{/if}
	</article>
</HTML>

<!-- 🦕  🦖🦖🦖 🦕 🦕 Styles 💀= 💣 🌠 -->
<!--svelte-ignore css_unused_selector -->
<style>
	button {
		all: unset;
	}

	.backer {
		background-color: lch(98.59% 2.31 317.26);
		border-radius: 8px;
		border: 2px solid lch(0.86% 4.14 318.14);
		padding: 0.5rem;
	}

	aside {
		position: fixed; /* or absolute */
		top: 0;
		right: 0;
		display: flex;
		justify-content: center;
	}

	.menu {
		width: 110vw;
		background: transparent;

		& button {
			border-radius: 8px;
			margin: 0.25rem 0.25rem;
			border: 2px solid lch(0.86% 4.14 318.14);
		}

		@media screen and (min-width: 728px) {
			width: fit-content;
			border-radius: 8px;
		}
	}

	.dropdown {
		position: absolute;
		background: lch(98.59% 2.31 317.26 / 0.683);
		border: 4px solid lch(0.86% 4.14 318.14);
		border-radius: 8px;
		padding: 10px;
		display: none;
		margin-top: 3rem;
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

	/* 🦕  🦖🦖🦖 🦕 🦕Dark mode          💀= 💣 🌠 */
	@media (prefers-color-scheme: dark) {
		::-webkit-scrollbar-track {
			background: lch(98.59% 2.31 317.26);
		}

		.dropdown {
			position: absolute;
			background: lch(0.86% 4.14 318.14 / 0.455);
		}

		.backer {
			background-color: lch(0.86% 4.14 318.14);
			border: 2px solid #ffd700;
		}

		.backer {
			background-color: rgb(0, 0, 0);
			color: lch(98.59% 2.31 317.26);
		}
	}
</style>
