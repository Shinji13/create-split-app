<script lang="ts">
	import { darkPrimary, whiteFont, darkBg, darkFont, lightPrimary, whiteBg } from '$lib/consts';
	import { theme } from '$lib/stores';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	export let sectionMenuAppear = false;
	let isHome = $page.url.pathname == '/';
	$: currentSection = $page.data.sectionName || '';

	function switchMode(mode: Boolean) {
		//  dark mode
		if (mode) {
			theme.set(true);
			for (let val of darkPrimary.entries()) {
				document.documentElement.style.setProperty(val[0], val[1]);
			}
			document.documentElement.style.setProperty('--font', whiteFont);
			document.documentElement.style.setProperty('--bg', darkBg);
		} else {
			theme.set(false);
			for (let val of lightPrimary.entries()) {
				document.documentElement.style.setProperty(val[0], val[1]);
			}
			document.documentElement.style.setProperty('--font', darkFont);
			document.documentElement.style.setProperty('--bg', whiteBg);
		}
	}
</script>

<nav
	id="navBar"
	style="background-color: {isHome ? 'transparent' : 'var(--bg)'}; position: {isHome
		? 'static'
		: 'sticky'};"
>
	<div class="sections">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<img
			src={$theme ? '/whiteLogo.png' : '/darkLogo.png'}
			alt="split logo"
			id="logo"
			on:click={() => {
				goto('/');
			}}
		/>
		<a
			href="/docs/create-split-app/introduction"
			id={currentSection != 'faq' && currentSection != '' ? 'active' : ''}>Docs</a
		>
		<a href="/docs/create-split-app/faq" id={currentSection == 'faq' ? 'active' : ''}>FAQ</a>
	</div>
	<div class="utility">
		<a href="https://github.com/Shinji13/create-split-app" target="_blank">
			<i class="fa-brands fa-github" id="github"></i>
		</a>
		<div class="toggle">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<i class="fa-solid fa-sun" on:click={() => switchMode(false)} id={$theme ? '' : 'whiteTheme'}
			></i>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<i class="fa-solid fa-moon" on:click={() => switchMode(true)} id={$theme ? 'darkTheme' : ''}
			></i>
		</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<i
			class="fa-solid fa-bars toggler"
			id={sectionMenuAppear ? 'hidden' : ''}
			on:click={() => {
				sectionMenuAppear = true;
			}}
		></i>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<i
			class="fa-solid fa-xmark toggler"
			id={sectionMenuAppear ? '' : 'hidden'}
			on:click={() => {
				sectionMenuAppear = false;
			}}
		></i>
	</div>
</nav>

<style>
	nav {
		width: 100%;
		height: 100px;
		display: flex;
		align-items: center;
		padding-right: 30px;
		justify-content: space-between;
		top: 0;
	}
	.sections {
		width: fit-content;
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.sections a {
		font-size: var(--h3);
		padding-inline: 6px;
		padding-block: 2px;
		border-radius: 6px;
	}
	.sections a:hover {
		background-color: var(--primary100);
		color: var(--primary800);
	}
	#active {
		border: 1px solid var(--primary400);
		color: var(--primary800);
	}
	#active:hover {
		color: var(--font);
	}
	#github {
		font-size: 2.5rem;
	}
	i {
		cursor: pointer;
	}
	#logo {
		width: 16rem;
		height: 100px;
		object-position: center;
		object-fit: cover;
		cursor: pointer;
		background-color: transparent;
	}
	.utility {
		display: flex;
		align-items: center;
		gap: 40px;
	}
	.toggle {
		display: flex;
		align-items: center;
		gap: 10px;
		background-color: var(--primary100);
		filter: contrast(3);
		padding-inline: 16px;
		padding-block: 8px;
		border-radius: 8px;
	}
	.toggle i {
		font-size: 1.6rem;
		color: var(--font);
	}
	#whiteTheme,
	#darkTheme {
		color: var(--primary800);
	}
	.toggler {
		display: none;
		font-size: 1.8rem;
		margin-left: 10px;
	}
	#hidden {
		display: none;
	}
	@media screen and (width < 768px) {
		nav {
			padding-right: 30px;
		}
		.utility {
			gap: 10px;
		}
		#logo {
			width: 12rem;
		}
		.sections a {
			display: none;
		}
		.toggler {
			display: inline-block;
		}
	}
</style>
