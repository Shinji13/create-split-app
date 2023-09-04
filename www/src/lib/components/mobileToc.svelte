<script lang="ts">
	import type { tocLink } from '$lib/consts';
	import { onMount } from 'svelte';
	export let links: tocLink[];
	let currentHeader = '';
	let appear = false;
	const degreeClasses = ['dg1', 'dg2', 'dg3', 'dg4'];
	$: orderedLinks = links.sort((aLink, bLink) => aLink.order - bLink.order);
	onMount(() => {
		window.addEventListener('scroll', (e) => {
			const mdHeaders = document.querySelectorAll(
				'#markdown >h1,#markdown >h2,#markdown >h3,#markdown >h4'
			);
			let oldThreshold = -1;
			mdHeaders.forEach((header) => {
				const headerInfo = header.getBoundingClientRect();
				const topSectionThreshold = 163;
				let newThreshold =
					window.screenY + topSectionThreshold + headerInfo.height - headerInfo.top;
				if ((newThreshold < oldThreshold && newThreshold > 0) || oldThreshold == -1) {
					oldThreshold = newThreshold;
					currentHeader = header.textContent;
				}
			});
		});
	});
	function scrollToHeader(headerId: string) {
		const offset = 163;
		const headerTop = document.getElementById(headerId).getBoundingClientRect().top;
		window.scrollTo({
			top: headerTop + window.scrollY - offset,
			behavior: 'smooth'
		});
	}
</script>

<button on:click={() => (appear = !appear)}>
	<span>On this page</span>
	{#if appear}
		<i class="fa-solid fa-chevron-down"></i>
	{:else}
		<i class="fa-solid fa-chevron-right"></i>
	{/if}
</button>
<div class="links" id={appear ? '' : 'hidden'}>
	{#each orderedLinks as link}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<a
			class="link"
			id={link.name == currentHeader ? 'active' : ''}
			on:click={() => {
				let headerId = link.name
					.toLowerCase()
					.replace(/ /g, '-')
					.replace(/[@#:\$%\^&,\.\/*?]/g, '');
				scrollToHeader(headerId);
			}}
		>
			<span class={degreeClasses[link.degree - 1]}>{link.name}</span>
		</a>
	{/each}
</div>

<style>
	button {
		height: 3rem;
		display: inline-block;
		background-color: var(--primary100);
		border: 2px solid var(--primary400);
		border-radius: 6px;
		padding-inline: 6px;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 5px;
	}
	button i {
		color: var(--font);
		font-weight: bold;
		font-size: small;
	}
	button span {
		font-family: 'Montserrat', sans-serif;
		font-weight: bold;
		font-size: var(--h4);
		line-height: var(--lh4);
	}
	.links {
		background-color: var(--primary100);
		border: 2px solid var(--primary400);
		border-radius: 4px;
		width: 95%;
		margin-top: 10px;
		padding-block: 10px;
		cursor: pointer;
		display: flex;
		flex-direction: column;
	}
	.link {
		border: none;
	}
	.link:hover {
		background-color: rgba(134, 129, 129, 0.205);
		border: none;
		filter: contrast(1.4);
	}
	#active {
		background-color: var(--primary400);
	}
	#active span {
		color: var(--font);
	}
	.link span {
		font-weight: bold;
		color: var(--primary400);
	}
	.link span:hover {
		text-decoration: underline;
		color: var(--primary800);
	}
	.dg1 {
		margin-left: 8px;
	}
	.dg2 {
		margin-left: 16px;
	}
	.dg3 {
		margin-left: 24px;
	}
	.dg4 {
		margin-left: 32px;
	}
	#hidden {
		display: none;
	}
</style>
