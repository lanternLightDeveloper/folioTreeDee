<article class="fade-in glass-Box">
	<p>Thank you stopping by while this site is under construction, I hope you enjoy your visit.</p>
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

	article {
		width: 60vw;

		p {
			margin: 0;
			padding: var(--size-2);
		}

		@media screen and (min-width: 768px) {
			article {
				width: 30vw;
			}
		}
	}
</style>
