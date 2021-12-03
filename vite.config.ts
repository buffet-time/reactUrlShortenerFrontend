import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		rollupOptions: {
			maxParallelFileReads: 512,
			output: {
				minifyInternalExports: true,
				generatedCode: {
					arrowFunctions: true,
					constBindings: true,
					objectShorthand: true,
					preset: 'es2015'
				}
			}
		},

		terserOptions: {
			ecma: 2018,
			module: true,
			toplevel: true
		}
	},

	server: {
		port: 8086,
		fs: {
			allow: ['..']
		}
	},

	plugins: [react()]
})
