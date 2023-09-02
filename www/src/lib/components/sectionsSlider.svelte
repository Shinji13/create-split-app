<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	export let navigate = false;
	$: currentSection = $page.data.sectionName || '';
	const sectionsMap = new Map<string, string[]>([
		[
			'Create split app',
			[
				'Introduction',
				'Why Split?',
				'Installation',
				'Folder Structure',
				'FAQ',
				'Other Recommendations'
			]
		],
		[
			'Usage',
			['First steps', 'Svelte kit', 'Typescript', 'Prisma', 'Lucia', 'Tailwind', 'Zod', 'Sockets']
		],
		['Deployment', ['Vercel', 'Netlify', 'Render', 'Docker']]
	]);
	onMount(() => {
		const mobileCross = window.matchMedia('screen and (width >= 768px)');
		mobileCross.addEventListener('change', () => {
			navigate = false;
		});
	});
</script>

<div id="sectionsNav">
	<div class="category">
		<h3>Create split app</h3>
		{#each sectionsMap.get('Create split app') as section}
			<a
				class="section"
				id={section.toLowerCase() == currentSection ? 'current' : ''}
				on:click={() => {
					navigate = false;
				}}
				href={'/docs/create-split-app' + '/' + section.split(' ').join('-').toLowerCase()}
			>
				<span>{section}</span>
			</a>
		{/each}
	</div>
	<div class="category">
		<h3>Usage</h3>
		{#each sectionsMap.get('Usage') as section}
			<a
				class="section"
				id={section.toLowerCase() == currentSection ? 'current' : ''}
				on:click={() => {
					navigate = false;
				}}
				href={'/docs/usage' + '/' + section.split(' ').join('-').toLowerCase()}
			>
				<span>{section}</span>
			</a>
		{/each}
	</div>
	<div class="category">
		<h3>Deployment</h3>
		{#each sectionsMap.get('Deployment') as section}
			<a
				class="section"
				id={section.toLowerCase() == currentSection ? 'current' : ''}
				on:click={() => {
					navigate = false;
				}}
				href={'/docs/deployment' + '/' + section.split(' ').join('-').toLowerCase()}
			>
				<span>{section}</span>
			</a>
		{/each}
	</div>
</div>

<style>
	#sectionsNav {
		display: flex;
		flex-direction: column;
		width: 88%;
	}
	.category {
		display: flex;
		flex-direction: column;
	}
	#current {
		background-color: var(--primary100);
		border-left: 3px solid var(--primary800);
		filter: contrast(5);
	}
	#current span {
		color: var(--primary800);
	}
	#current:hover span {
		color: var(--font);
	}
	.section {
		border-left: 3px solid var(--primary400);
		padding-left: 10px;
		margin-left: 5px;
		padding-block: 5px;
	}
	.section span {
		font-weight: bold;
		font-size: var(--h4);
	}
	.section:hover {
		border-left: 3px solid var(--primary800);
		filter: contrast(1.5);
		background-color: var(--primary100);
	}
	.section:hover span {
		text-decoration: underline;
		color: var(--primary800);
	}
	a {
		color: var(--primary400);
		font-size: var(--h4);
		font-weight: bold;
	}
</style>
