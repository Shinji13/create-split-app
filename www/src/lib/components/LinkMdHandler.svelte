<script>
	export let href = '';
	export let title = undefined;
</script>

<a id="anchor" {href} {title}>
	<span><slot /></span>
	<i class="fa-solid fa-arrow-up-right-from-square" style="color: #ff3e00;"></i>
</a>

<style>
	#anchor {
		display: flex;
		align-items: center;
		gap: 3px;
		cursor: pointer;
	}
	span {
		color: var(--primary800);
		opacity: 0.6;
	}
	span:hover {
		opacity: 1;
	}
	i {
		font-size: small;
	}
</style>
