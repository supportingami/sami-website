const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "sami-logo": "url('/images/sami-logo.svg') ",
        "sami-logo-no-text": "url('/images/sami-logo-no-text.png')",
        "math-1": "url('/images/bg-math-1.svg')",
      },
      fontFamily: {
        sans: ["var(--font-roboto)", ...fontFamily.sans],
      },
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
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
          accent: "#ed1164",
          "base-200": "#ebf0f9", // off-white
          "base-300": "#e2faff", // off-blue
        },
      },
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "#89a9c5",
          accent: "#9c8fa3",
          "base-200": "#364359",
        },
      },

      // Additional daisy themes can be included below if wanted
      // https://daisyui.com/docs/themes/
      // "cupcake",
      // "bumblebee",
    ],
  },
};
