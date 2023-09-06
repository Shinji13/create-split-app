<script lang="ts">
	import { LineNumbers, HighlightAuto } from 'svelte-highlight';
	import { githubDark, oneLight } from 'svelte-highlight/styles';

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
		{@html oneLight}
	{:else}
		{@html githubDark}
	{/if}
</svelte:head>

<div id="codeMdBlock" class={lang}>
	<HighlightAuto code={text} let:highlighted>
		<LineNumbers {highlighted} hideBorder />
	</HighlightAuto>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	{#if copyStatement == 'copy'}
		<i class="fa-solid fa-copy" on:click={copyCode}></i>
	{:else}
		<i class="fa-solid fa-check-double"></i>
	{/if}
</div>

<style>
	#codeMdBlock {
		width: 98%;
		border-radius: 24px;
		position: relative;
	}
	:global(#codeMdBlock > div:first-child) {
		width: 100%;
		border-radius: 5px;
	}
	:global(#codeMdBlock > div:first-child code) {
		word-spacing: 1rem;
	}
	i {
		position: absolute;
		top: 10px;
		right: 3%;
		color: var(--bg);
		font-size: 1.6rem;
		cursor: pointer;
		font-weight: 800;
		z-index: 4;
	}
</style>
