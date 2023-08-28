<script>
	import CoreMd from '$lib/components/coreMd.svelte';
	import Toc from '$lib/components/toc.svelte';
	import { page } from '$app/stores';
	import SectionsSlider from '$lib/components/sectionsSlider.svelte';
	import { onMount } from 'svelte';
	export let data;
	let location = [...$page.url.pathname.split('/')];
	location.shift();
	let currentHeader = '';
	onMount(() => {
		const mdHeaders = document.querySelectorAll(
			'#markdown >h1,#markdown >h2,#markdown >h3,#markdown >h4'
		);
		window.addEventListener('scroll', (e) => {
			let oldThreshold = -1;
			mdHeaders.forEach((header) => {
				const headerPositions = header.getBoundingClientRect();
				let newThreshold = window.screenY - headerPositions.top;
				if ((newThreshold < oldThreshold && newThreshold > 0) || oldThreshold == -1) {
					oldThreshold = newThreshold;
					currentHeader = header.textContent;
				}
			});
		});
	});
</script>

<div id="docs">
	<div class="sideBarWrapper">
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
		<CoreMd source={data.md} />
	</div>
	<div id="toc">
		<Toc links={data.toc} {currentHeader} />
	</div>
</div>

<style>
	#docs {
		width: 100%;
		display: grid;
		grid-template-columns: 24% 56% 18%;
		padding-left: 2%;
		align-items: start;
	}
	#markdown {
		display: flex;
		flex-direction: column;
		width: 95%;
		height: fit-content;
		padding-left: 10px;
		padding-top: 10px;
		padding-bottom: 30px;
		gap: 8px;
	}
	.location {
		display: flex;
		gap: 10px;
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
	.sideBarWrapper {
		position: sticky;
		top: 100px;
	}
	#sidebar {
		width: 95%;
		display: flex;
		flex-direction: column;
		padding-left: 5px;
		max-height: calc(95vh - 100px);
		overflow-y: auto;
		padding-bottom: 30px;
	}
	#toc {
		position: sticky;
		top: 100px;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	@media screen and (width < 768px) {
		#docs {
			display: flex;
			flex-direction: column;
			padding-left: 10px;
		}
		#sidebar {
			display: none;
		}
		#toc {
			position: static;
			margin-left: 0;
		}
		#markdown {
			order: 2;
		}
	}
</style>
