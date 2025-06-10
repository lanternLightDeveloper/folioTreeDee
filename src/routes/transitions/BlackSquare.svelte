<script>
	export let visible = false;
</script>

{#if visible}
	<div class="black-square"></div>
{/if}

<style>
	@keyframes expand-minimize {
		0% {
			transform: scale(0.1);
			opacity: 1;
		}
		50% {
			transform: scale(1);
			opacity: 1;
		}
		100% {
			transform: scale(0);
			opacity: 0;
		}
	}

	.black-square {
		position: fixed;
		top: 0;
		left: 0;
		margin: -8vw;
		width: 110vw;
		height: 150vh;
		background-color: black;
		z-index: 9999;
		transform: scale(0.1); /* Initial scale */
		opacity: 0; /* Initial opacity */
		animation: expand-minimize 1.4s ease-in-out forwards;
	}
</style>
