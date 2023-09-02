<script lang="ts">
	import Highlight, { LineNumbers } from 'svelte-highlight';
	import { typescript, css } from 'svelte-highlight/languages';
	import { nightOwl, intellijLight } from 'svelte-highlight/styles';
	import { linear } from 'svelte/easing';
	import { theme } from '$lib/stores';
	import { slide } from 'svelte/transition';
	export let code: string;
	export let language: 'typescript' | 'css';
</script>

<svelte:head>
	{#if $theme}
		{@html intellijLight}
	{:else}
		{@html nightOwl}
	{/if}
</svelte:head>

{#key code}
	<div
		id="presentationCode"
		class={$theme ? 'light' : ''}
		in:slide={{ easing: linear, duration: 500, axis: 'x', delay: 500 }}
		out:slide={{ easing: linear, duration: 500, axis: 'x' }}
	>
		<Highlight language={language == 'css' ? css : typescript} {code} let:highlighted>
			<LineNumbers {highlighted} hideBorder wrapLines />
		</Highlight>
	</div>
{/key}

<style>
	#presentationCode {
		width: 100%;
		height: 100%;
		font-size: var(--small);
		border-bottom-left-radius: 12px;
		overflow-y: scroll;
		overflow-x: scroll;
	}
	::-webkit-scrollbar {
		width: 0.5rem;
	}
	::-webkit-scrollbar-track {
		border-radius: 0;
		background: #011627ff;
	}
	.light::-webkit-scrollbar-track {
		background: #ffffff;
	}
	::-webkit-scrollbar-thumb {
		border-radius: 4px;
		background: var(--primary800);
	}
</style>
