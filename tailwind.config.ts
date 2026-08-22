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
        paper: {
          DEFAULT: "#ffffff",
          card: "#ffffff",
          inset: "#faf6ea",
        },
        ink: {
          DEFAULT: "#3a2f21",
          soft: "#5c4f3a",
          muted: "#8a7a5f",
        },
        teal: {
          DEFAULT: "#0d9488",
          deep: "#0f766e",
          soft: "#c9f2e8",
          tint: "#e8f7f3",
        },
        yellow: {
          DEFAULT: "#ffd66e",
          soft: "#fff3d1",
        },
        purple: {
          DEFAULT: "#7c3aed",
          deep: "#5b21b6",
          soft: "#f5efff",
        },
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
      fontFamily: {
        display: ["Baloo Bhaijaan 2", "system-ui", "sans-serif"],
        ui: ["Baloo Bhaijaan 2", "system-ui", "sans-serif"],
        prose: ["Baloo Bhaijaan 2", "system-ui", "sans-serif"],
        sans: ["Baloo Bhaijaan 2", "system-ui", "sans-serif"],
        serif: ["Baloo Bhaijaan 2", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "notebook-xs": "2.5px 2.5px 0px #3a2f21",
        "notebook-sm": "3px 3px 0px #3a2f21",
        "notebook-md": "4px 4px 0px #3a2f21",
        "notebook-lg": "6px 6px 0px #3a2f21",
        "notebook-solid": "6px 6px 0px #3a2f21",
      },
      borderRadius: {
        notebook: "18px",
        "notebook-lg": "20px",
        "notebook-btn": "12px",
      },
    },
  },
  plugins: [],
};

export default config;
