<script>
	import { goto } from '$app/navigation';
	import NavBar from '$lib/components/navBar.svelte';
	import SectionsSlider from '$lib/components/sectionsSlider.svelte';
	let showSideBarMobile = false;
	let stackColors = ['#FF3E00', '#1C1E24', '#43C4F7', '#38B2AC', '#5A67D8'];
</script>

<div id="home">
	<NavBar bind:sectionMenuAppear={showSideBarMobile} />
	{#if showSideBarMobile}
		<div class="mobileSideBar">
			<SectionsSlider bind:navigate={showSideBarMobile} />
		</div>
	{:else}
		<div id="introduction">
			<h1 id="mainHeader">Discover the power of modern web development</h1>
			<div class="mist">
				{#each stackColors as color, i}
					<div
						class="blob"
						style="background-color: {color}; top:{(i + 1) * 8}%; left:{(i + 1) * 8}%"
					></div>
				{/each}
			</div>
			<div class="actions">
				<button on:click={() => goto('/docs/create-split-app/introduction')}>Documentation</button>
				<a href="https://github.com/Shinji13/create-split-app" target="_blank"
					><button>Github</button></a
				>
			</div>
			<h4>npm i create-split-app@latest</h4>
		</div>
	{/if}
</div>

<style>
	#home {
		display: flex;
		flex-direction: column;
		width: 100vw;
		min-height: 100vh;
	}
	.mobileSideBar {
		width: 100%;
		padding-left: 20px;
		padding-bottom: 20px;
	}
	#introduction {
		display: flex;
		flex-direction: column;
		width: 100vw;
		align-items: center;
		height: 100vh;
		position: relative;
	}
	#mainHeader {
		font-size: var(--huge);
		width: 80%;
		text-align: center;
	}
	.mist {
		position: absolute;
		width: 100%;
		top: 15%;
		left: 20%;
	}
	.mist .blob {
		position: absolute;
		width: 20%;
		aspect-ratio: 2/3;
		border-radius: 100%;
		filter: blur(100px) contrast(1.4);
		z-index: -1;
	}
	.actions {
		display: flex;
		gap: 20px;
	}
	.actions button {
		padding-inline: 12px;
		padding-block: 12px;
		cursor: pointer;
	}
	.actions button:first-child {
		background-color: var(--font);
		opacity: 0.9;
		color: var(--bg);
		border-radius: 30px;
	}
	.actions button:last-child {
		background-color: var(--bg);
		color: var(--font);
		opacity: 0.9;
		border-radius: 30px;
		padding-block: 12px;
		padding-inline: 20px;
	}
	#introduction h4:last-child {
		background-color: rgba(255, 255, 255, 0.212);
		padding-inline: 12px;
		padding-block: 8px;
		border-radius: 8px;
	}
	@media screen and (width < 768px) {
		#mainHeader {
			font-size: var(--Rh1);
			width: 95%;
		}
	}
</style>
