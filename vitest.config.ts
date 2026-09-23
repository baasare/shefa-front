import {defineConfig} from 'vitest/config';
import path from 'node:path';
export default defineConfig({
    resolve: {alias: {'@': path.resolve(__dirname, 'src')}},
    esbuild: {jsx: 'automatic'},
    test: {env: {NEXT_PUBLIC_API_URL: 'http://localhost:8000'}, environment: 'jsdom', include: ['tests/**/*.test.tsx'], clearMocks: true},
});
