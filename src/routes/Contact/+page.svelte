<script lang="ts">
	import { goto } from '$app/navigation';
	import { T } from '@threlte/core';
	import {
		interactivity,
		HTML,
		ImageMaterial,
		Text3DGeometry,
		useCursor,
		Text
	} from '@threlte/extras';
	import { DoubleSide } from 'three';
	import { enhance } from '$app/forms';

	import EmailIcon from '../Icons/EmailIcon.svelte';
	import IgIcon from '../Icons/IgIcon.svelte';
	import BskyIcon from '../Icons/BskyIcon.svelte';

	let formPosition = $state([-26, 8.5]);
	let formSubmitted = $state(false);

	type Props = {
		currentContact: number;
	};

	let { currentContact = $bindable(0) } = $props();

	interactivity();

	const cursor = useCursor('pointer');
	const handleSubmit = () => {
		formSubmitted = true;
	};

	//  🦕  🦖🦖🦖 🦕 🦕  Extras/ Debug 💀= 💣 🌠
</script>

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

<!-- Instagram  -->
{#if currentContact === 1}
	<T.Mesh
		position={[-33.5, 11.25, 10.5]}
		scale={[0.005, 0.005, 0.005]}
		rotation={[-0.2, -0.65, -0.11]}
	>
		<Text3DGeometry text={'Visit us on'} />
		<T.MeshStandardMaterial color="black" />
	</T.Mesh>

	<T.Mesh position={[-33, 10.5, 11]} scale={[0.005, 0.005, 0.005]} rotation={[-0.2, -0.65, -0.11]}>
		<Text3DGeometry text={'Instagram'} />
		<T.MeshStandardMaterial color="white" />
	</T.Mesh>
	<T.Mesh
		position={[-32, 9, 11.8]}
		scale={[4.8, 2.75]}
		rotation={[0, -0.723, 0]}
		onclick={() => {
			window.open('https://instagram.com/lanternlightdevelopment/', '_blank');
		}}
		onpointerenter={cursor.onPointerEnter}
		onpointerleave={cursor.onPointerLeave}
	>
		<T.PlaneGeometry />
		<ImageMaterial transparent side={DoubleSide} url="uckzAlt.png" />
	</T.Mesh>
{/if}

<!-- BluSky  -->
{#if currentContact === 2}
	<T.Mesh
		position={[-33.5, 11.25, 10.5]}
		scale={[0.005, 0.005, 0.005]}
		rotation={[-0.2, -0.65, -0.11]}
	>
		<Text3DGeometry text={'Visit us on'} />
		<T.MeshStandardMaterial color="black" />
	</T.Mesh>

	<T.Mesh
		position={[-33, 10.5, 11]}
		scale={[0.005, 0.005, 0.005]}
		rotation={[-0.2, -0.65, -0.11]}
		onclick={() => {
			window.open('https://bsky.app/profile/soturbulent.bsky.social/', '_blank');
		}}
		onpointerenter={cursor.onPointerEnter}
		onpointerleave={cursor.onPointerLeave}
	>
		<Text3DGeometry text={'BlueSky'} />
		<T.MeshStandardMaterial color="blue" />
	</T.Mesh>

	<T.Mesh
		position={[-32, 9, 11.8]}
		scale={[4.8, 2.75]}
		rotation={[0, -0.723, 0]}
		onclick={() => {
			window.open('https://bsky.app/profile/soturbulent.bsky.social/', '_blank');
		}}
		onpointerenter={cursor.onPointerEnter}
		onpointerleave={cursor.onPointerLeave}
	>
		<T.PlaneGeometry />
		<ImageMaterial transparent side={DoubleSide} url="butterfittiAlt.png" />
	</T.Mesh>
{/if}

<!-- Email  -->
{#if currentContact === 3}
	<T.Mesh position={[-28.5, 7, 7.5]} scale={[1, 1, 1]} rotation={[0, -0.69, 0]}>
		<HTML position.y={0} transform>
			{#if !formSubmitted}
				<form
					class="classicForm"
					method="post"
					action="?/submit"
					use:enhance={({ formElement, formData, action, cancel }) => {
						return async ({ result, update }) => {
							if (result.type === 'success') {
								handleSubmit();
								await update();
							}
						};
					}}
					enctype="multipart/form-data"
				>
					<p>Reach out</p>
					<label for="full_name">Name</label>
					<input
						type="text"
						id="full_name"
						name="full_name"
						placeholder="Enter your name"
						required
					/>

					<label for="contact_point">Email</label>
					<input
						type="text"
						id="contact_point"
						name="contact_point"
						placeholder="Enter your email"
						required
					/>

					<label for="message">Message</label>
					<textarea id="message" name="message" placeholder="Enter your message" required
					></textarea>

					<button class="ripple-btn" type="submit">Submit</button>
				</form>
			{:else}
				<p class="glass-Box">Thank you for the message! I will get back to you as soon as I can.</p>
			{/if}
		</HTML>
	</T.Mesh>
{/if}

<!-- 🦕  🦖🦖🦖 🦕 🦕 Styles 💀= 💣 🌠 -->
<!--svelte-ignore css_unused_selector -->
