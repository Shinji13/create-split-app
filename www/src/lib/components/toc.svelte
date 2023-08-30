<script lang="ts">
	import type { tocLink } from '$lib/consts';
	export let links: tocLink[];
	export let currentHeader = '';
	$: orderedLinks = links.sort((aLink, bLink) => aLink.order - bLink.order);
	const degreeClasses = ['dg1', 'dg2', 'dg3', 'dg4'];
</script>

<h4>On this page</h4>
<div class="links">
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
	.links {
		display: flex;
		flex-direction: column;
	}
	.link {
		border-left: 3px solid var(--primary400);
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
