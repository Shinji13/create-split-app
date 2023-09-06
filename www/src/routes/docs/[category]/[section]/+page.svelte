<script lang="ts">
	import CoreMd from '$lib/components/coreMd.svelte';
	import Toc from '$lib/components/toc.svelte';
	import { page } from '$app/stores';
	import SectionsSlider from '$lib/components/sectionsSlider.svelte';
	import MobileToc from '$lib/components/mobileToc.svelte';
	import NavBar from '$lib/components/navBar.svelte';
	import { findSectionNeigbors } from '$lib/utils.js';
	export let data;
	let showSideBarMobile = false;
	let neigbors = {
		previous: {
			section: '',
			category: ''
		},
		next: {
			section: '',
			category: ''
		}
	};
	let location = [];
	$: {
		location = [...$page.url.pathname.split('/')];
		neigbors = findSectionNeigbors(location.at(-1));
		location.shift();
	}
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
						<span>{param.replace(/ /g, '-')}</span>
					{/each}
				</div>
				{#key data}
					<CoreMd source={data.md} />
				{/key}
				<div class="quickNav">
					{#if neigbors.previous.section != ''}
						<a
							class="previous"
							href="/docs/{neigbors.previous.category
								.toLowerCase()
								.replace(/ /g, '-')}/{neigbors.previous.section.toLowerCase().replace(/ /g, '-')}"
						>
							<i class="fa-solid fa-chevron-left"></i>
							<span>{neigbors.previous.section}</span>
						</a>
					{/if}
					{#if neigbors.next.section != ''}
						<a
							class="next"
							href="/docs/{neigbors.next.category
								.toLowerCase()
								.replace(/ /g, '-')}/{neigbors.next.section.toLowerCase().replace(/ /g, '-')}"
						>
							<span>{neigbors.next.section}</span>
							<i class="fa-solid fa-chevron-right"></i>
						</a>
					{/if}
				</div>
			</div>
			<div id="mobileToc">
				<MobileToc links={data.toc} />
			</div>
			<div id="toc">
				<Toc links={data.toc} />
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
		gap: 8px;
	}
	.quickNav {
		display: grid;
		grid-template-columns: 1fr auto;
		width: 100%;
		border-bottom: 2px solid var(--primary400);
		padding-inline: 1%;
		margin-top: 5rem;
		margin-bottom: 14rem;
		padding-bottom: 30px;
		align-items: center;
	}
	.next,
	.previous {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 8px;
		color: var(--primary800);
	}
	.next {
		justify-content: flex-end;
	}
	.previous {
		justify-content: flex-start;
	}
	.next span,
	.previous span {
		font-size: var(--h4);
		font-weight: 500;
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
			padding-inline: 10px;
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
			z-index: 4;
		}
		#markdown {
			order: 2;
			width: 100%;
		}
	}
</style>
