<script>
	import { darkBg, darkPrimary, whiteFont } from '$lib/consts';
	import '../app.css';
	function toggle() {
		for (let val of darkPrimary.entries()) {
			document.documentElement.style.setProperty(val[0], val[1]);
		}
		document.documentElement.style.setProperty('--font', whiteFont);
		document.documentElement.style.setProperty('--bg', darkBg);
	}
</script>

<div>
	<nav>
		<h4>logo</h4>
		<h4>github</h4>
		<button on:click={toggle}>toggle</button>
	</nav>
	<slot />
</div>

<style>
	div {
		width: 100vw;
	}
	nav {
		width: 100%;
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		position: sticky;
		top: 0;
	}
</style>
