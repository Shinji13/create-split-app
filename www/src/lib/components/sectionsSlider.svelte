<script lang="ts">
	import { page } from '$app/stores';
	const sectionsMap = new Map<string, string[]>([
		[
			'Create split app',
			['Introduction', 'Why Split?', 'Installation', 'Folder Structure', 'Other Recommendations']
		],
		[
			'Usage',
			['First steps', 'Svelte kit', 'Typescript', 'Prisma', 'Lucia', 'Tailwind', 'Zod', 'Sockets']
		],
		['Deployment', ['Vercel', 'Netlify', 'Render', 'Docker']]
	]);
	$: currentSection = $page.data.sectionName || '';
</script>

<div id="sectionsNav">
	<div class="category">
		<h3>Create split app</h3>
		{#each sectionsMap.get('Create split app') as section}
			<div class="section" id={section.toLowerCase() == currentSection ? 'current' : ''}>
				<a href={'/docs/Create-split-app' + '/' + section.split(' ').join('-')}>{section}</a>
			</div>
		{/each}
	</div>
	<div class="category">
		<h3>Usage</h3>
		{#each sectionsMap.get('Usage') as section}
			<div class="section" id={section.toLowerCase() == currentSection ? 'current' : ''}>
				<a href={'/docs/Usage' + '/' + section.split(' ').join('-')}>{section}</a>
			</div>
		{/each}
	</div>
	<div class="category">
		<h3>Deployment</h3>
		{#each sectionsMap.get('Deployment') as section}
			<div class="section" id={section.toLowerCase() == currentSection ? 'current' : ''}>
				<a href={'/docs/Deployment' + '/' + section.split(' ').join('-')}>{section}</a>
			</div>
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
	}
	#current a {
		color: var(--primary800);
	}
	#current:hover a {
		color: var(--font);
	}
	.section {
		border-left: 3px solid var(--primary400);
		padding-left: 10px;
		margin-left: 5px;
		padding-block: 5px;
	}
	.section:hover {
		border-left: 3px solid var(--primary800);
		filter: contrast(1.5);
	}
	a {
		color: var(--primary400);
		font-size: var(--h4);
		font-weight: bold;
	}
	a:hover {
		text-decoration: underline;
		color: var(--primary800);
	}
</style>
