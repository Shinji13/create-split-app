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
		{#if errorMap.has($page.status)}
			<h3>{$page.status} - {errorMap.get($page.status).name}</h3>
			<p>{errorMap.get($page.status).message}</p>
		{:else}
			<h3>{$page.status} - unknown</h3>
			<p>unknown error has occured</p>
		{/if}
	</div>
	<button on:click={() => goto('/')}>GO TO HOMEPAGE</button>
</div>

<style>
	.error {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		gap: 30px;
		background-color: var(--bg);
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}
	.error h1 {
		font-weight: bolder;
		font-size: var(--Rh1);
		color: transparent;
		background-color: var(--primary800);
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
		justify-content: center;
		align-items: center;
	}
	.error div h3 {
		font-size: var(--Rh3);
		font-weight: bold;
		line-height: var(--lh3);
		color: var(--font);
	}
	.error div p {
		font-size: var(--body);
		line-height: var(--lht);
		text-align: center;
		color: var(--font);
		font-weight: 600;
	}
	.error button {
		color: var(--font);
		font-size: var(--Rh4);
		line-height: var(--lh4);
		font-weight: 700;
		background-color: var(--primary800);
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
