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
          DEFAULT: "#FBF6EA",
          card: "#ffffff",
          inset: "#faf6ea",
        },
        ink: {
          DEFAULT: "#1F1B13",
          soft: "#4B4131",
          muted: "#7D715D",
        },
        teal: {
          DEFAULT: "#109E91",
          deep: "#0D7E74",
          soft: "#E8F7F5",
          tint: "#f0faf8",
        },
        yellow: {
          DEFAULT: "#E5A93C",
          soft: "#FEF6E8",
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
        display: ["Zain", "IBM Plex Sans Arabic", "system-ui", "sans-serif"],
        ui: ["IBM Plex Sans Arabic", "system-ui", "sans-serif"],
        prose: ["IBM Plex Sans Arabic", "system-ui", "sans-serif"],
        sans: ["IBM Plex Sans Arabic", "system-ui", "sans-serif"],
        serif: ["IBM Plex Sans Arabic", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
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
