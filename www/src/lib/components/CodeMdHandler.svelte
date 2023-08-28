<script lang="ts">
	import { tick } from 'svelte';

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

<pre class={lang}>
    <code>{text}</code>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <span on:click={copyCode}>{copyStatement}</span>
</pre>

<style>
	pre {
		width: 100%;
		display: flex;
		padding-inline: 10px;
		padding-block: 5px;
		align-items: center;
		justify-content: space-between;
		background-color: var(--primary100);
		border: 2px solid var(--primary400);
		border-radius: 5px;
	}
	span {
		color: var(--primary800);
		cursor: pointer;
		font-weight: 800;
		align-self: flex-start;
	}
</style>
