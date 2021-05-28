const { tailwindExtractor } = require("tailwindcss/lib/lib/purgeUnusedStyles");

module.exports = {
  purge: {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    options: {
      defaultExtractor: (content) => [
        // If this stops working, please open an issue at https://github.com/svelte-add/tailwindcss/issues rather than bothering Tailwind Labs about it
        ...tailwindExtractor(content),
        // Match Svelte class: directives (https://github.com/tailwindlabs/tailwindcss/discussions/1731)
        ...[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(
          ([_match, group, ..._rest]) => group
        ),
      ],
      keyframes: true,
    },
  },
  theme: {
    extend: {
      colors: {
        primary: {
          900: "#003e6b",
          800: "#0a558c",
          700: "#0f609b",
          600: "#186faf",
          500: "#2580c2",
          400: "#4098d7",
          300: "#62b0e8",
          200: "#84c5f4",
          100: "#b6e0fe",
          50: "#dceefb",
        },
        neutral: {
          900: "#102a43",
          800: "#243b53",
          700: "#334e68",
          600: "#486581",
          500: "#627d98",
          400: "#829ab1",
          300: "#9fb3c8",
          200: "#bcccdc",
          100: "#d9e2ec",
          50: "#f0f4f8",
        },
        success: {
          900: "#004400",
          800: "#016457",
          700: "#048271",
          600: "#079a82",
          500: "#17b897",
          400: "#2dcca7",
          300: "#5fe3co",
          200: "#8eedd1",
          100: "#c6f7e9",
          50: "#f0fcf9",
        },
        warning: {
          900: "#513c06",
          800: "#7c5e10",
          700: "#a27c1a",
          600: "#c99a2e",
          500: "#e9b949",
          400: "#f7d070",
          300: "#f9da8b",
          200: "#f8e3a3",
          100: "#fcefc7",
          50: "#fffaeb",
        },
        error: {
          900: "#610404",
          800: "#780a0a",
          700: "#911111",
          600: "#a61b1b",
          500: "#ba2525",
          400: "#d64545",
          300: "#e66a6a",
          200: "#f29b9b",
          100: "#facdcd",
          50: "#ffeeee",
        },
      },
    },
  },
  variants: {
    backgroundColor: ["responsive", "focus", "hover"],
    borderColor: ["responsive", "focus", "hover"],
    extend: {
      backgroundColor: ["active"],
      textColor: ["active"],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
