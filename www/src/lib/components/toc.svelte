<script lang="ts">
	import type { tocLink } from '$lib/types';
	export let links: tocLink[];
	const orderedLinks = links.sort((aLink, bLink) => aLink.order - bLink.order);
	const degreeClasses = ['dg1', 'dg2', 'dg3', 'dg4'];
	let hideToc = false;
</script>

<div class="toc">
	<button
		class="toggle"
		on:click={() => {
			hideToc = !hideToc;
		}}
	>
		{#if hideToc}
			<i class="fa-solid fa-chevron-right" style="color: #ff3e00;"></i>
		{:else}
			<i class="fa-solid fa-chevron-down" style="color: #ff3e00;"></i>
		{/if}
		<h4>On this page</h4>
	</button>
	<div class="links" class:hideToc>
		{#each orderedLinks as link}
			<div class="link">
				<a href="#{link.name.toLowerCase()}" class={degreeClasses[link.degree - 1]}>{link.name}</a>
			</div>
		{/each}
	</div>
</div>

<style>
	.toc {
		display: flex;
		flex-direction: column;
		gap: 20px;
		margin-left: 50px;
	}
	.toggle {
		background-color: transparent;
		display: flex;
		align-items: center;
		gap: 8px;
		cursor: pointer;
	}
	.toggle i {
		font-size: small;
	}
	.links {
		display: flex;
		flex-direction: column;
	}
	.hideToc {
		display: none;
	}
	.link {
		border-left: 3px solid var(--primary400);
		padding-block: 2px;
	}
	.link:hover {
		border-left: 3px solid var(--primary800);
		filter: contrast(1.5);
	}
	a {
		color: var(--primary800);
		opacity: 0.6;
	}
	a:hover {
		text-decoration: underline;
		opacity: 1;
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
</style>
