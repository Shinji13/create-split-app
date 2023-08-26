<script lang="ts">
	export let lang: string;
	export let text: string;

	async function copyCode(e: MouseEvent) {
		// copy code
	}
</script>

<pre class={lang}>
    <code>{text}</code>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <span on:click={copyCode}>copy</span>
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
		border: 2px solid var(--primary600);
		border-radius: 4px;
	}
	span {
		color: var(--primary800);
		cursor: pointer;
		font-weight: 800;
	}
</style>
