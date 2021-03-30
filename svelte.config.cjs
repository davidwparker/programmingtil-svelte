// const vercel = require('@sveltejs/adapter-vercel');
const static = require('@sveltejs/adapter-static');

module.exports = {
  kit: {
    // adapter: vercel(),
    adapter: static(),
    target: "#svelte",
  },
};
