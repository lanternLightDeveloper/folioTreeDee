<article class="fade-in glass-Box">
	<p>Thank you for visiting, while this site is under construction, I hope you enjoy your visit.</p>
</article>

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

	.price-box {
		height: fit-content;
		max-height: 80vh;
		padding: var(--size-4);
		margin: 0;
		width: 30vw;
		overflow-y: auto;

		& p,
		h2,
		h3 {
			margin: 0;
			padding: 0;
		}
	}

	.about-box {
		height: 20vh;
		max-height: 20vh;
		padding: 0 var(--size-4);
		margin: 0.5rem -5vw;
		width: 80vw;
		overflow-y: auto;
	}
</style>
