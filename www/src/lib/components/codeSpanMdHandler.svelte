<script>
	export let raw;
</script>

<code>{raw.replace(/`/g, '')}</code>

<style>
	code {
		padding-inline: 10px;
		padding-block: 3px;
		border: 2px solid var(--primary400);
		background-color: var(--primary100);
		border-radius: 5px;
	}
</style>
