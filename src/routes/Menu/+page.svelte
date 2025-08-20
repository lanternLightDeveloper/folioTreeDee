<script lang="ts">
	import { interactivity } from '@threlte/extras';
	import { Spring } from 'svelte/motion';

	type Props = {
		cameraRef?: any;
		currentButton: number;
	};

	let { cameraRef, currentButton = $bindable(0) } = $props();

	let currentSet = $state('A');
	let nextSet = $state(null);
	let showProjectDropdown = $state(false);
	let showContactDropdown = $state(false);
	let position = $state([-47, 15, 65]);
	let lookAtTarget = $state([-25, 9, 12]);

	interactivity();

	//  🦕  🦖🦖🦖 🦕 🦕     Handle camera movement trigger 💀= 💣 🌠
	const handleClick = async (newPosition, newLookAtTarget, callback) => {
		const startPos = [...position];
		const endPos = newPosition;
		const startLookAt = [...lookAtTarget];
		const endLookAt = newLookAtTarget;
		const duration = 2000;

		position = newPosition;
		lookAtTarget = newLookAtTarget;

		animatePosition(startPos, endPos, startLookAt, endLookAt, duration, callback);
	};

	const animatePosition = (startPos, endPos, startLookAt, endLookAt, duration, callback) => {
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
			} else {
				if (callback) callback();
			}
		}

		requestAnimationFrame(animate);
	};

	//  🦕  🦖🦖🦖 🦕 🦕   Load next content set 💀= 💣 🌠
	const loadNextSet = (set) => {
		nextSet = set;

		setTimeout(() => {
			currentSet = set;
			nextSet = null;
		}, 0);
	};

	//  🦕  🦖🦖🦖 🦕 🦕  Extras/ Debug 💀= 💣 🌠
</script>

<aside class="menu fade-in">
	<button
		onclick={() => {
			handleClick([-45, 15, 60], [-20, 9, 12], () => loadNextSet('A'));
			currentButton = 1;
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
			showContactDropdown = true;
			showProjectDropdown = false;
		}}
	>
		Contact
	</button>

	<!-- Contact Dropdown Menu -->
	<div class="dropdown" class:show={showContactDropdown}>
		<button> Email </button>
		<a href="https://www.instagram.com/lanternlightdevelopment/">
			<button> Instagram </button>
		</a>
		<a href="https://bsky.app/profile/soturbulent.bsky.social">
			<button> Bluesky </button>
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

<!-- 🦕  🦖🦖🦖 🦕 🦕 Styles 💀= 💣 🌠 -->
<!--svelte-ignore css_unused_selector -->
<style>
	.fade-in {
		opacity: 0;
		animation: fadeIn 1s ease-in forwards;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.menu {
		display: flex;
		width: 110vw;
		background: transparent;

		& button {
			border-radius: var(--rad-Sm);
			margin: var(--space-Sm);
			padding: var(--space-Sm);
			border: var(--bord);
			background: var(--accent-1);
			font-weight: bold;
			font-size: var(--size-4);

			&:hover {
				background-color: var(--hover);
			}
		}

		@media screen and (min-width: 728px) {
			width: fit-content;
			border-radius: 8px;
		}
	}

	.dropdown {
		position: absolute;
		background: var(--hallow);
		border: var(--bord);
		border-radius: var(--rad-Sm);
		padding: var(--space-Sm);
		display: none;
		margin-top: var(--size-8);
	}

	.dropdown.show {
		display: block;
	}

	article {
		width: 30vw;

		& h2,
		p {
			margin: 0;
			padding: var(--size-2);
		}
	}

	aside {
		position: fixed; /* or absolute */
		top: 0;
		right: 0;
		display: flex;
		justify-content: center;
	}
</style>
