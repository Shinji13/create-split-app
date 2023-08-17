<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	const errorMap: Map<number, { name: string; message: string }> = new Map([
		[
			404,
			{
				name: 'PAGE NOT FOUND',
				message: "The page you looking for either does'not exist or has it name change."
			}
		],
		[
			500,
			{
				name: 'SERVICE UNAVAILABLE',
				message:
					'The service you demanding has encountered some issues recently try access it later.'
			}
		],
		[
			401,
			{
				name: 'UNAUTHORIZED ACCESS',
				message:
					'You trying to access a page that need authentication,you create new account or login to existing one.'
			}
		],
		[
			403,
			{
				name: 'FORBIDDEN',
				message: "You should'not be here this area is unaccessable at the moment."
			}
		]
	]);
</script>

<div class="error">
	<h1>Oops !</h1>
	<div>
		<h3>{$page.status} - {errorMap.get($page.status).name}</h3>
		<p>{errorMap.get($page.status).message}</p>
	</div>
	<button on:click={() => goto('/')}>GO TO HOMEPAGE</button>
</div>

<style>
	.error {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		gap: 20px;
		background-color: var(--white);
		justify-content: center;
		align-items: center;
	}
	.error h1 {
		font-size: var(--huge);
		font-family: 'Playfair display' serif;
		font-weight: bolder;
		color: transparent;
		background: url('/yellowBg.jpg');
		background-position: center;
		background-size: contain;
		background-clip: text;
		-moz-background-clip: text;
		-webkit-background-clip: text;
		line-height: var(--lh1);
	}
	.error div {
		display: flex;
		flex-direction: column;
		width: 80%;
		gap: 10px;
		align-items: center;
	}
	.error div h3 {
		font-size: var(--h3);
		font-weight: bold;
		font-family: 'Raleway' sans-serif;
		line-height: var(--lh3);
		color: var(--primary);
	}
	.error div p {
		font-size: var(--body);
		font-family: 'Open sans' sans-serif;
		line-height: var(--lht);
		text-align: center;
		color: var(--black);
		font-weight: 600;
	}
	.error button {
		color: var(--primary);
		font-family: 'Open sans', sans-serif;
		font-size: var(--h3);
		line-height: var(--lh3);
		font-weight: 700;
		background-color: var(--secondary);
		width: fit-content;
		height: fit-content;
		padding-block: 0.5rem;
		padding-inline: 0.5rem;
		border-radius: 8px;
		outline: none;
		border: none;
		cursor: pointer;
	}
</style>
