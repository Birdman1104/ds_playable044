import { defineConfig } from 'vite';
import inlineSource from 'vite-plugin-inline-source';
import { viteSingleFile } from 'vite-plugin-singlefile';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig((_config) => {
  return {
    build: {
      //inlineDynamicImports:false,
      assetsInlineLimit: Infinity,
      cssCodeSplit: false,
      modulePreload: false,
      sourcemap: false,
      emptyOutDir: true,
      rollupOptions: {
        input: ['./index.html', './src/index.ts'],
      },
    },
    resolve: {
      extensions: ['.ts', '.js', '.mjs', '.atlas'],
    },
    plugins: [
      tsconfigPaths(),
      inlineSource(),
      viteSingleFile({ useRecommendedBuildConfig: false }),
    ],
    assetsInclude: ['**/*.png', '**/*.atlas'],
    optimizeDeps: {
      esbuildOptions: {
        supported: {
          'top-level-await': true,
        },
      },
    },
    esbuild: {
      supported: {
        'top-level-await': true,
      },
    },
  };
});
