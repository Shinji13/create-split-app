<script>
	export let href = '';
	export let title = undefined;
	export let text = '';
</script>

<img src={href} {title} alt={text} />

<style>
	img {
		width: 100%;
		aspect-ratio: 2/1;
		object-fit: cover;
		object-position: center;
	}
</style>
