const cssnano = require('cssnano')

// only needed if you want to purge
const purgecss = require("@fullhuman/postcss-purgecss")({
  content: [
    "./src/**/*.html",
    "./src/**/*.svelte",
    "./src/**/*.js",
  ],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
});

module.exports = {
  plugins: [
    require("tailwindcss")("postcss/core/tailwind.core.js"),
    process.env.NODE_ENV === 'production' ? require('autoprefixer') : null,
    process.env.NODE_ENV === 'production' ? cssnano({ preset: 'default' }) : null,
    process.env.NODE_ENV === 'production' ? purgecss : null,
  ]
};
