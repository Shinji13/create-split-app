<script lang="ts">
	import { LineNumbers, HighlightAuto } from 'svelte-highlight';
	import { githubDark, github } from 'svelte-highlight/styles';
	import { theme } from '$lib/stores';
	export let lang: string;
	export let text: string;
	let copyStatement: 'copy' | 'copied' = 'copy';
	async function copyCode(e: MouseEvent) {
		navigator.clipboard.writeText(text);
		copyStatement = 'copied';
		await new Promise((res) => setTimeout(res, 800));
		copyStatement = 'copy';
	}
</script>

<svelte:head>
	{#if $theme}
		{@html github}
	{:else}
		{@html githubDark}
	{/if}
</svelte:head>

<div id="codeMdBlock" class={lang}>
	<div id="lang">
		<span>{lang}</span>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		{#if copyStatement == 'copy'}
			<i class="fa-solid fa-copy" on:click={copyCode}></i>
		{:else}
			<i class="fa-solid fa-check-double"></i>
		{/if}
	</div>
	<HighlightAuto code={text} let:highlighted>
		<LineNumbers {highlighted} hideBorder />
	</HighlightAuto>
</div>

<style>
	#codeMdBlock {
		width: 98%;
		display: flex;
		flex-direction: column;
	}
	:global(#codeMdBlock > :not(#lang)) {
		width: 100%;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
	}
	:global(#codeMdBlock > :not(#lang) code) {
		word-spacing: 1rem;
	}
	#codeMdBlock #lang {
		width: 100%;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		background-color: var(--primary400);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-inline: 10px;
		padding-block: 5px;
	}
	#codeMdBlock #lang span {
		font-weight: bold;
		color: var(--font);
	}
	i {
		color: var(--font);
		font-size: 1.6rem;
		cursor: pointer;
		font-weight: 800;
	}
</style>
