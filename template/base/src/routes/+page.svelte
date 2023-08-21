<div class="main">
	<h1>Create <span>Split</span> App</h1>
	<div>
		<div>
			<h3>Demo</h3>
			<p>Everything you need to know to set up your split app with email password authenication</p>
		</div>
		<div>
			<h3>Documentation</h3>
			<p>Learn about split stack libraries and how to use it and deploy it</p>
		</div>
	</div>
</div>

<style>
	.main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #ffffff;
		width: 100vw;
		height: 100vh;
		gap: 20px;
	}
	.main h1 {
		font-size: var(--huge);
		font-weight: bolder;
		line-height: var(--lh1);
		text-align: center;
		color: #121212;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
	.main h1 span {
		color: #ff8a00;
	}
	.main > div {
		display: flex;
		gap: 20px;
		width: 60%;
	}
	.main > div div {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		gap: 10px;
		width: 45%;
		height: 25vh;
		border-radius: 12px;
		background-color: transparent;
		border: 2px solid #ff8a00;
		box-shadow: 4px 4px 10px #ff8a00;
		padding-inline: 5vw;
		cursor: pointer;
	}
	.main > div div h3 {
		font-size: var(--h3);
		font-weight: bold;
		line-height: var(--lh3);
		color: #121212;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
	.main > div div p {
		font-size: var(--body);
		line-height: var(--lht);
		font-weight: 500;
		color: #121212;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}

	@media screen and (width < 768px) {
		.main div {
			width: 90%;
		}
		.main div div {
			height: 32vh;
		}
	}
</style>
