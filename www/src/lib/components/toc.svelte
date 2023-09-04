<script lang="ts">
	import type { tocLink } from '$lib/consts';
	import { onMount } from 'svelte';
	export let links: tocLink[];
	let currentHeader = '';
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
				const topSectionThreshold = 100;
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
		const offset = 100;
		const headerTop = document.getElementById(headerId).getBoundingClientRect().top;
		window.scrollTo({
			top: headerTop + window.scrollY - offset,
			behavior: 'smooth'
		});
	}
</script>

<h4>On this page</h4>
<div class="links">
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
	.links {
		display: flex;
		flex-direction: column;
	}
	.link {
		border-left: 3px solid var(--primary400);
		cursor: pointer;
	}
	.link:hover {
		border-left: 3px solid var(--primary800);
		filter: contrast(1.5);
	}
	#active {
		border-left: 3px solid var(--primary800);
		background-color: var(--primary100);
	}
	#active span {
		color: var(--primary800);
	}
	#active:hover span {
		color: var(--font);
	}
	span {
		font-weight: bold;
		text-align: start;
		color: var(--primary400);
		display: inline-block;
	}
	span:hover {
		text-decoration: underline;
		color: var(--primary800);
	}
	.dg1 {
		margin-left: 8px;
	}
	.dg2 {
		margin-left: 14px;
	}
	.dg3 {
		margin-left: 20px;
	}
	.dg4 {
		margin-left: 26px;
	}
</style>
