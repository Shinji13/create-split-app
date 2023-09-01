<script lang="ts">
	export let techName: string;
	export let description: string;
	export let href: string;
</script>

<a {href} target="_blank" class="techBox">
	<div class="header">
		<img src="/{techName}.svg" alt={techName} />
		<h4>{techName}</h4>
	</div>
	<p>{description}</p>
</a>

<style>
	.techBox {
		width: 100%;
		height: 100%;
		background-color: var(--primary100);
		border: 2px solid var(--primary400);
		border-radius: 6px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		gap: 8px;
	}
	.techBox:hover {
		background-color: var(--primary400);
	}
	.header {
		width: 100%;
		background-color: var(--primary100);
		display: flex;
		align-items: center;
		padding-block: 2px;
		padding-left: 20px;
		justify-content: flex-start;
		gap: 10px;
	}
	.header h4 {
		text-transform: capitalize;
	}
	.header img {
		width: 2rem;
		aspect-ratio: 1/1;
		object-fit: contain;
		object-position: center;
	}
	p {
		width: 100%;
		font-size: var(--small);
		padding-inline: 20px;
		margin-block: 10px;
	}
	@media screen and (width < 768px) {
		.techBox {
			width: 90%;
		}
	}
</style>
