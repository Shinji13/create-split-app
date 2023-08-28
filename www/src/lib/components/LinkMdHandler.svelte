<script>
	export let href = '';
	export let title = undefined;
</script>

<a id="anchor" {href} {title}>
	<span><slot /></span>
	<i class="fa-solid fa-arrow-up-right-from-square"></i>
</a>

<style>
	#anchor {
		cursor: pointer;
		opacity: 1;
	}
	#anchor:hover {
		opacity: 1;
		filter: contrast(3);
	}
	span {
		color: var(--primary800);
		margin-left: 3px;
	}
	i {
		color: var(--primary800);
		font-size: small;
	}
</style>
