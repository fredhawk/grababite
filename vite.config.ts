import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	// optimizeDeps: {
	// 	exclude: [
	// 		'@node-rs/bcrypt-linux-x64-gnu',
	// 		'@node-rs/bcrypt-linux-x64-musl',
	// 		'@node-rs/argon2-linux-x64-gnu',
	// 		'@node-rs/argon2-linux-x64-musl'
	// 	]
	// },
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
