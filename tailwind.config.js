import { heroui } from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        primary: {
          DEFAULT: "#EB5E28",
          50: "#fdf2ed",
          100: "#fbdfd4",
          200: "#f7bfa9",
          300: "#f39e7e",
          400: "#ef7e53",
          500: "#eb5e28",
          600: "#bc4b20",
          700: "#8d3818",
          800: "#5e2610",
          900: "#2f1308"
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      theme: {
        colors: {
          primary: "#EB5E28",
        },
      },
    }),
  ],
}

module.exports = config;
