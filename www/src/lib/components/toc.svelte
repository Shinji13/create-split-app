<script lang="ts">
	import type { tocLink } from '$lib/consts';
	export let links: tocLink[];
	export let currentHeader = '';
	const orderedLinks = links.sort((aLink, bLink) => aLink.order - bLink.order);
	const degreeClasses = ['dg1', 'dg2', 'dg3', 'dg4'];
</script>

<h4>On this page</h4>
<div class="links">
	{#each orderedLinks as link}
		<div class="link" id={link.name == currentHeader ? 'active' : ''}>
			<a
				href="#{link.name.toLowerCase().split(' ').join('-')}"
				class={degreeClasses[link.degree - 1]}>{link.name}</a
			>
		</div>
	{/each}
</div>

<style>
	.links {
		display: flex;
		flex-direction: column;
	}
	.link {
		border-left: 3px solid var(--primary400);
		padding-block: 2px;
	}
	.link:hover {
		border-left: 3px solid var(--primary800);
		filter: contrast(1.5);
	}
	#active {
		background-color: var(--primary100);
	}
	#active a {
		color: var(--primary800);
	}
	#active:hover a {
		color: var(--font);
	}
	a {
		color: var(--primary400);
	}
	a:hover {
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
</style>
