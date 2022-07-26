import mdsvexConfig from './mdsvex.config.js';
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess(), mdsvex()],

	kit: {
		adapter: adapter(),
		paths: {
			base: ''
		},
		prerender: {
			default: true
		}
	}
};

export default config;