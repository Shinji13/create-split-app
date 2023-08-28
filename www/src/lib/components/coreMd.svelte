<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import ImageHandler from './ImageMdHandler.svelte';
	import LinkMdHandler from './LinkMdHandler.svelte';
	import ListMdHandler from './ListMdHandler.svelte';
	import QuoteMdHandler from './QuoteMdHandler.svelte';
	import CodeMdHandler from './CodeMdHandler.svelte';
	import CodeSpanMdHandler from './codeSpanMdHandler.svelte';
	export let source: string;
</script>

<SvelteMarkdown
	{source}
	renderers={{
		image: ImageHandler,
		link: LinkMdHandler,
		list: ListMdHandler,
		blockquote: QuoteMdHandler,
		code: CodeMdHandler,
		codespan: CodeSpanMdHandler
	}}
/>
