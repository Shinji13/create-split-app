import { vitePreprocess } from '@sveltejs/kit/vite';
import autoAdapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		env: {
			dir: './'
		},
		outDir: 'dist',
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: autoAdapter({}),
		prerender: {
			entries: [
				'/docs/create-split-app/introduction',
				'/docs/create-split-app/why-split',
				'/docs/create-split-app/installation',
				'/docs/create-split-app/folder-structure',
				'/docs/create-split-app/faq',
				'/docs/create-split-app/other-recommendations',
				'/docs/usage/first-steps',
				'/docs/usage/svelte-kit',
				'/docs/usage/typescript',
				'/docs/usage/prisma',
				'/docs/usage/lucia',
				'/docs/usage/tailwind',
				'/docs/usage/zod',
				'/docs/usage/sockets',
				'/docs/deployment/vercel',
				'/docs/deployment/netlify',
				'/docs/deployment/render',
				'/docs/deployment/docker',
				'/'
			]
		}
	}
};

export default config;
