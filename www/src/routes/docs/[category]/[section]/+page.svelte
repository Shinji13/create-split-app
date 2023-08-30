<script lang="ts">
	import CoreMd from '$lib/components/coreMd.svelte';
	import Toc from '$lib/components/toc.svelte';
	import { page } from '$app/stores';
	import SectionsSlider from '$lib/components/sectionsSlider.svelte';
	import { onMount } from 'svelte';
	import MobileToc from '$lib/components/mobileToc.svelte';
	import NavBar from '$lib/components/navBar.svelte';
	export let data;
	let currentHeader = '';
	let showSideBarMobile = false;
	let location = [];
	$: {
		location = [...$page.url.pathname.split('/')];
		location.shift();
	}
	onMount(() => {
		window.addEventListener('scroll', (e) => {
			const mdHeaders = document.querySelectorAll(
				'#markdown >h1,#markdown >h2,#markdown >h3,#markdown >h4'
			);
			let oldThreshold = -1;
			mdHeaders.forEach((header) => {
				const headerInfo = header.getBoundingClientRect();
				const topSectionThreshold = window.innerWidth < 768 ? 147 : 100;
				let newThreshold =
					window.screenY + topSectionThreshold + headerInfo.height - headerInfo.top;
				if ((newThreshold < oldThreshold && newThreshold > 0) || oldThreshold == -1) {
					oldThreshold = newThreshold;
					currentHeader = header.textContent;
				}
			});
		});
	});
</script>

<div id="docs">
	<NavBar bind:sectionMenuAppear={showSideBarMobile} />
	{#if showSideBarMobile}
		<div class="mobileSideBar">
			<SectionsSlider bind:navigate={showSideBarMobile} />
		</div>
	{:else}
		<div id="main">
			<div class="sideWrapper">
				<div id="sidebar">
					<SectionsSlider />
				</div>
			</div>
			<div id="markdown">
				<div class="location">
					<i class="fa-solid fa-house"></i>
					{#each location as param}
						<i class="fa-solid fa-chevron-right"></i>
						<span>{param.split('-').join(' ')}</span>
					{/each}
				</div>
				{#key data}
					<CoreMd source={data.md} />
				{/key}
			</div>
			<div id="mobileToc">
				<MobileToc links={data.toc} {currentHeader} />
			</div>
			<div id="toc">
				<Toc links={data.toc} {currentHeader} />
			</div>
		</div>
	{/if}
</div>

<style>
	#docs {
		width: 100vw;
	}
	#main {
		width: 100%;
		display: grid;
		grid-template-columns: 24% 54% 20%;
		padding-left: 2%;
		align-items: start;
	}
	#markdown {
		display: flex;
		flex-direction: column;
		width: 95%;
		padding-left: 10px;
		padding-top: 10px;
		padding-bottom: 30px;
		gap: 8px;
	}
	.location {
		display: flex;
		width: 100%;
		gap: 5px;
		align-items: center;
	}
	.location i:not(i:first-child) {
		color: var(--font);
		font-weight: bold;
	}
	.location i:first-child {
		background-color: var(--font);
		color: var(--bg);
		padding: 5px;
		border-radius: 6px;
	}
	.location span {
		padding-inline: 3px;
		padding-block: 1px;
		background-color: var(--primary100);
		border-radius: 6px;
		font-size: var(--small);
		border: 2px solid var(--primary400);
	}
	.mobileSideBar {
		width: 100%;
		padding-left: 20px;
		padding-bottom: 20px;
	}
	.sideWrapper {
		position: sticky;
		top: 100px;
	}
	#sidebar {
		width: 95%;
		display: flex;
		flex-direction: column;
		padding-left: 5px;
		padding-bottom: 30px;
		max-height: calc(95vh - 100px);
		overflow-y: auto;
	}
	#mobileToc {
		display: none;
		position: sticky;
		top: 100px;
		width: 100%;
		flex-direction: column;
	}
	#toc {
		position: sticky;
		top: 100px;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	@media screen and (width < 768px) {
		#main {
			display: flex;
			flex-direction: column;
			padding-left: 10px;
		}
		#sidebar {
			display: none;
		}
		#toc {
			display: none;
		}
		#mobileToc {
			display: flex;
			background-color: var(--bg);
			padding-bottom: 15px;
			margin-left: 10px;
			z-index: 1;
		}
		#markdown {
			order: 2;
		}
	}
</style>
