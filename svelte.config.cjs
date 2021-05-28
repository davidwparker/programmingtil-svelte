const sveltePreprocess = require("svelte-preprocess");
const vercel = require("@sveltejs/adapter-vercel");
const pkg = require("./package.json");

module.exports = {
  preprocess: [
    sveltePreprocess({
      defaults: {
        style: "postcss",
      },
      postcss: true,
    }),
  ],
  kit: {
    adapter: vercel(),
    target: "#svelte",
    vite: {
      ssr: {
        noExternal: Object.keys(pkg.dependencies || {}),
      },
    },
  },
};
