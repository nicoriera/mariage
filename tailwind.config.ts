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
        // Couleurs Sézane
        sezane: {
          cream: "#fefefe",
          surface: "#fdfbf7",
          accent: "#fefcf7",
          rose: "#fef7f7",
          sage: "#f7f9f6",
          primary: "#2a2a2a",
          secondary: "#606060",
          muted: "#737373",
          "accent-color": "#d4a033",
          "rose-color": "#d66767",
        },
        // Couleurs de base pour les bordures
        "border-sezane": "#e5e5e5",
        "border-sezane-accent": "#f9edcc",
        "border-sezane-rose": "#fad8d8",
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      boxShadow: {
        "sezane-sm":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "sezane-md":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        "sezane-lg":
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      },
      transitionTimingFunction: {
        sezane: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      backgroundImage: {
        "pattern-sezane-dots":
          "radial-gradient(circle, #d4d4d4 1px, transparent 1px)",
        "pattern-sezane-lines":
          "linear-gradient(90deg, #e5e5e5 1px, transparent 1px)",
      },
      backgroundSize: {
        "pattern-sezane-dots": "20px 20px",
        "pattern-sezane-lines": "40px 40px",
      },
    },
  },
  plugins: [],
};

export default config;
