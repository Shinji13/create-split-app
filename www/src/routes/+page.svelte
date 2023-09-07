<script lang="ts">
	import { goto } from '$app/navigation';
	import NavBar from '$lib/components/navBar.svelte';
	import PresentationCode from '$lib/components/presentationCode.svelte';
	import SectionsSlider from '$lib/components/sectionsSlider.svelte';
	import Tech from '$lib/components/tech.svelte';
	import { respresentationCode } from '$lib/consts';
	import { theme } from '$lib/stores';
	let showSideBarMobile = false;
	let stackColors = ['#ff5100', '#1C1E24', '#2f74c0ff', '#38B2AC', '#5A67D8'];
	let copyStatement: 'copy' | 'copied' = 'copy';
	let listOfTech: { name: string; description: string; href: string }[] = [
		{
			name: 'sveltekit',
			description:
				"Let SvelteKit be your efficient sidekick in web development. It's got all the right moves to handle routes, rendering, data loading, and more, making web app creation a breeze.",
			href: 'https://kit.svelte.dev/'
		},
		{
			name: 'typescript',
			description:
				"TypeScript's like your trusty co-pilot in web development. Whether you're a coding whiz or just starting, its 'strictness' makes your code journey smoother.",
			href: 'https://www.typescriptlang.org/'
		},
		{
			name: 'prisma',
			description:
				' Prisma serves as an invaluable database toolkit, empowering developers to seamlessly interact with databases through a type-safe query language while catering to diverse database systems.',
			href: 'https://www.prisma.io/'
		},
		{
			name: 'tailwind',
			description:
				'Tailwind CSS is a utility-first CSS framework that helps you build beautiful, responsive designs without any extra configuration. It’s built with utility-first principles, and is completely customizable and extendable.',
			href: 'https://tailwindcss.com/'
		},
		{
			name: 'zod',
			description:
				'Zod, a TypeScript-centric validation library, plays a pivotal role in maintaining data integrity by allowing developers to define intricate data validation rules using TypeScript types, ensuring data quality and reliability across applications.',
			href: 'https://zod.dev/'
		},
		{
			name: 'lucia',
			description:
				"Lucia is an auth library for TypeScript that abstracts away the complexity of handling users and sessions. It works alongside your database to provide an API that's easy to use, understand, and extend.",
			href: 'https://lucia-auth.com/'
		}
	];
	let currentSlide = 0;
	async function copyCode(text: string) {
		navigator.clipboard.writeText(text);
		copyStatement = 'copied';
		await new Promise((res) => setTimeout(res, 800));
		copyStatement = 'copy';
	}
</script>

<div id="home">
	<NavBar bind:sectionMenuAppear={showSideBarMobile} />
	{#if showSideBarMobile}
		<div class="mobileSideBar">
			<SectionsSlider bind:navigate={showSideBarMobile} />
		</div>
	{:else}
		<div id="introduction">
			<h1 id="mainHeader">Discover the power of modern web development with split</h1>
			<div class="mist">
				{#each stackColors as color, i}
					<div class="blob" style="background-color: {color};"></div>
				{/each}
			</div>
			<div class="actions">
				<button on:click={() => goto('/docs/create-split-app/introduction')}>Documentation</button>
				<a href="https://github.com/Shinji13/create-split-app" target="_blank"
					><button>Github</button></a
				>
			</div>
			<pre class="installAction" style="background-color: {$theme ? '#ffffff36' : '#00000023'};">
				<h4>npm i create-split-app@latest</h4>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
			     {#if copyStatement == 'copy'}
					<i class="fa-solid fa-copy" on:click={() => copyCode('npm i create-split-app@latest')}
					></i>
				{:else}
					<i class="fa-solid fa-check-double"></i>
				{/if}
			</pre>
		</div>
		<div id="about">
			<div class="description">
				<h1>Everything in one</h1>
				<div>
					<p>
						Split build around sveltekit a project setup that ensures fast, typsafe and easy to
						construct web apps.
					</p>
					<p>
						We provide a cli to streamline the process of creating the template which combines
						opinions on technologies and ideas.
					</p>
					<p>
						Split insights is not limited to what the cli provides you can check our other
						recommandation on ui libraries and deployment.
					</p>
				</div>
			</div>
			<div class="cli">
				<div class="sliderControl">
					{#each respresentationCode as slide, i}
						<button
							on:click={() => {
								currentSlide = i;
							}}
							style="background-color: {currentSlide != i
								? 'transparent'
								: $theme
								? '#ffffff'
								: '#0d1117ff'}; color:{currentSlide == i ? 'var(--bg)' : '#78808bff'};"
							>{slide.fileName}</button
						>
					{/each}
				</div>
				<div class="slide">
					<PresentationCode
						code={respresentationCode[currentSlide].code}
						language={respresentationCode[currentSlide].language}
					/>
				</div>
			</div>
		</div>
		<div id="tech">
			<h3>Split provides a full stack ecosystem</h3>
			<h1>So pick whatever your app needs</h1>
			<div class="techGrid">
				{#each listOfTech as tech}
					<Tech techName={tech.name} description={tech.description} href={tech.href} />
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	#home {
		display: flex;
		flex-direction: column;
		width: 100vw;
		min-height: 100vh;
		position: relative;
		overflow-x: hidden;
	}
	.mobileSideBar {
		width: 100%;
		padding-left: 20px;
		padding-bottom: 20px;
	}
	#home > div {
		margin-bottom: 100px;
	}
	#introduction {
		display: flex;
		flex-direction: column;
		width: 100vw;
		align-items: center;
		height: fit-content;
		margin-top: 30px;
		gap: 20px;
		position: relative;
	}
	#mainHeader {
		font-size: var(--huge);
		width: 80%;
		text-align: center;
	}
	.mist {
		position: absolute;
		width: 100%;
		top: 10%;
		left: 20%;
	}
	.mist .blob {
		position: absolute;
		width: 20%;
		top: 0;
		aspect-ratio: 3/4;
		border-radius: 200%;
		filter: blur(90px) contrast(3);
		z-index: -1;
	}
	.blob:nth-child(1) {
		left: 0%;
	}
	.blob:nth-child(2) {
		left: 8%;
	}
	.blob:nth-child(3) {
		left: 20%;
	}
	.blob:nth-child(4) {
		left: 28%;
	}
	.blob:nth-child(5) {
		left: 36%;
	}
	.actions {
		display: flex;
		gap: 20px;
	}
	.actions button {
		padding-inline: 12px;
		padding-block: 12px;
		cursor: pointer;
	}
	.actions button:first-child {
		background-color: var(--font);
		opacity: 0.9;
		color: var(--bg);
		border-radius: 30px;
	}
	.actions button:last-child {
		background-color: var(--bg);
		color: var(--font);
		opacity: 0.9;
		border-radius: 30px;
		padding-block: 12px;
		padding-inline: 20px;
	}
	.installAction {
		display: flex;
		padding-inline: 8px;
		padding-block: 6px;
		border-radius: 8px;
		align-items: center;
		gap: 16px;
	}
	.installAction i {
		color: var(--font);
		font-size: 1.6rem;
		cursor: pointer;
		font-weight: 800;
	}
	#about {
		width: 100%;
		display: grid;
		grid-template-columns: 45% 49%;
		grid-auto-rows: 1fr;
		padding-inline: 2%;
		gap: 2%;
	}
	#about .cli {
		display: flex;
		width: 100%;
		flex-direction: column;
		align-items: center;
	}
	#about .cli .sliderControl {
		display: flex;
		align-items: center;
		margin-left: 20px;
	}
	#about .cli .sliderControl button {
		color: var(--bg);
		font-weight: 400;
		cursor: pointer;
		border-bottom: 0;
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
		padding-inline: 8px;
		padding-block: 6px;
	}
	#about .cli .slide {
		width: 100%;
		height: 50vh;
	}
	#about .description {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	#about .description h1 {
		font-size: var(--Rh2);
	}
	#about .description div {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	#about .description p {
		font-size: var(--Rh4);
		font-weight: 500;
		color: var(--font);
		filter: contrast(0.7);
	}
	#tech {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	#tech h3 {
		margin: 0;
		font-size: var(--Rh3);
		color: var(--primary400);
		text-align: center;
	}
	#tech h1 {
		font-size: var(--Rh2);
		width: 90%;
		text-align: center;
		margin: 0;
		margin-bottom: 20px;
	}
	#tech .techGrid {
		width: 90%;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-auto-rows: 1fr;
		gap: 3%;
	}
	@media screen and (width < 768px) {
		#introduction {
			gap: 30px;
		}
		#mainHeader {
			font-size: var(--Rh1);
			width: 95%;
		}
		.mist {
			top: 0%;
		}
		.mist .blob {
			width: 40%;
		}
		#about {
			display: flex;
			flex-direction: column;
			gap: 20px;
		}
		#about .cli .slide {
			width: 95%;
		}
		#tech .techGrid {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 20px;
		}
	}
</style>
