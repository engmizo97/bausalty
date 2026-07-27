import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          royal: "#1E3A8A",
          "royal-light": "#1D4ED8",
          sky: "#0284C7",
          "sky-light": "#38BDF8",
          white: "#FFFFFF",
        },
        royal: {
          DEFAULT: "#1E3A8A",
          dark: "#1E3A8A",
          light: "#1D4ED8",
          700: "#1D4ED8",
          900: "#1E3A8A",
        },
        sky: {
          DEFAULT: "#0284C7",
          dark: "#0284C7",
          light: "#38BDF8",
          400: "#38BDF8",
          600: "#0284C7",
        },
      },
    },
  },
  plugins: [],
};

export default config;
