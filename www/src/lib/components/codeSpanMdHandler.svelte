<script>
	export let raw;
</script>

<code>{raw.replace(/`/g, '')}</code>

<style>
	code {
		padding-inline: 4px;
		padding-block: 2px;
		border: 2px solid var(--primary400);
		background-color: var(--primary100);
		border-radius: 4px;
	}
</style>
