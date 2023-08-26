<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import ImageHandler from './ImageMdHandler.svelte';
	import LinkMdHandler from './LinkMdHandler.svelte';
	import ListMdHandler from './ListMdHandler.svelte';
	import QuoteMdHandler from './QuoteMdHandler.svelte';
	import CodeMdHandler from './CodeMdHandler.svelte';
	export let source: string;
</script>

<div id="markdown">
	<SvelteMarkdown
		{source}
		renderers={{
			image: ImageHandler,
			link: LinkMdHandler,
			list: ListMdHandler,
			blockquote: QuoteMdHandler,
			code: CodeMdHandler
		}}
	/>
</div>

<style>
	#markdown {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: fit-content;
		padding-left: 10px;
		gap: 8px;
	}
</style>
