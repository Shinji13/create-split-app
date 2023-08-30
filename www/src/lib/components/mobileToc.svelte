<script lang="ts">
	import type { tocLink } from '$lib/consts';
	export let links: tocLink[];
	export let currentHeader = '';
	const orderedLinks = links.sort((aLink, bLink) => aLink.order - bLink.order);
	const degreeClasses = ['dg1', 'dg2', 'dg3', 'dg4'];
	let appear = false;
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
		<a
			class="link"
			id={link.name == currentHeader ? 'active' : ''}
			href="#{link.name.toLowerCase().split(' ').join('-')}"
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
