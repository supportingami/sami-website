/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "sami-logo": "url('/images/sami-logo.svg') ",
        "sami-logo-no-text": "url('/images/sami-logo-no-text.png')",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      // SAMI themes extending default daisy themes (can be further adapted)
      // https://daisyui.com/docs/themes/
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "#53b4f4",
        },
      },
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "#89a9c5",
        },
      },

      // Additional daisy themes can be included below if wanted
      // https://daisyui.com/docs/themes/
      // "cupcake",
      // "bumblebee",
    ],
  },
};
