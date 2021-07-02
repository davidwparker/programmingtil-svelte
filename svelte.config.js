import preprocess from 'svelte-preprocess';
import vercel from '@sveltejs/adapter-vercel';
import path from 'path';
import { fileURLToPath } from 'url';
import { mdsvex } from 'mdsvex';

const dirname = path.resolve(fileURLToPath(import.meta.url), '../');

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [
    preprocess({
      defaults: {
        style: "postcss",
      },
      postcss: true,
    }),
    mdsvex({
      extensions: ['.md'],
      layout: {
        mds: path.join(dirname, './src/routes/mdsvex/_layout.svelte'),
      },
    }),

  ],
  kit: {
    adapter: vercel(),
    target: "#svelte",
  },
};

export default config;
