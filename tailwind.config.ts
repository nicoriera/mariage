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
        // Couleurs inspirées du design rayé pastel
        june: {
          // Bases neutres crème
          cream: "#f7f5f3",
          surface: "#f3f1ef",
          pearl: "#efedeb",
          // Pastels rayés comme dans l'image
          blush: "#f4d7d7", // Rose poudré des rayures
          sage: "#b8c4a0", // Vert olive des bordures
          lavender: "#e8d5e8",
          powder: "#dae8f2",
          // Accents plus saturés
          rose: "#e8b3b3", // Rose plus prononcé
          mint: "#a8c49a", // Vert plus profond
          lilac: "#d4b8d4",
          sky: "#b8d4e8",
          olive: "#9db380", // Vert olive bordure
          // Textes
          primary: "#2a2a2a",
          secondary: "#5a5a5a",
          muted: "#7a7a7a",
          accent: "#9db380", // Vert olive pour accent
        },
        // Couleurs de base pour les bordures
        "border-june": "#e8e6e3",
        "border-june-soft": "#f0eeeb",
        "border-june-accent": "#e8c5c5",
      },
      fontFamily: {
        // Police manuscrite pour "save the date" et éléments décoratifs
        script: ["Dancing Script", "cursive"],
        // Police moderne pour les noms et informations principales
        heading: ["Poppins", "sans-serif"],
        // Police pour le corps de texte
        sans: [
          "Poppins",
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
        "june-sm":
          "0 1px 3px 0 rgb(232 197 197 / 0.08), 0 1px 2px -1px rgb(232 197 197 / 0.06)",
        "june-md":
          "0 4px 6px -1px rgb(232 197 197 / 0.1), 0 2px 4px -2px rgb(232 197 197 / 0.08)",
        "june-lg":
          "0 10px 15px -3px rgb(232 197 197 / 0.12), 0 4px 6px -4px rgb(232 197 197 / 0.1)",
      },
      transitionTimingFunction: {
        sezane: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      backgroundImage: {
        // Lignes verticales comme sur la capture d'origine
        "pattern-june-lines-vertical":
          "repeating-linear-gradient(90deg, #f4d7d7 0px, #f4d7d7 12px, transparent 12px, transparent 24px)",
        "pattern-june-stripes-visible":
          "linear-gradient(0deg, #f4d7d7 0%, #f4d7d7 40%, transparent 40%, transparent 50%, #f4d7d7 50%, #f4d7d7 90%, transparent 90%, transparent 100%)",
        "pattern-june-stripes-handmade":
          'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" fill="none"><rect x="0" y="0" width="25" height="5" fill="%23f4d7d7"/><rect x="0" y="7" width="25" height="4" fill="%23f4d7d7"/><rect x="0" y="13" width="25" height="6" fill="%23f4d7d7"/><rect x="0" y="21" width="25" height="4" fill="%23f4d7d7"/></svg>\')',
        "pattern-june-stripes-organic":
          'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none"><rect x="0" y="2" width="40" height="8" fill="%23f4d7d7" opacity="0.8" rx="2"/><rect x="0" y="12" width="40" height="6" fill="%23f4d7d7" opacity="0.6" rx="2"/><rect x="0" y="20" width="40" height="9" fill="%23f4d7d7" opacity="0.9" rx="2"/><rect x="0" y="31" width="40" height="7" fill="%23f4d7d7" opacity="0.7" rx="2"/></svg>\')',
        "pattern-june-stripes-brush":
          'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" fill="none"><rect x="0" y="3" width="50" height="8" fill="%23f4d7d7" opacity="0.7" transform="rotate(1)"/><rect x="0" y="14" width="50" height="7" fill="%23f4d7d7" opacity="0.8" transform="rotate(-1)"/><rect x="0" y="24" width="50" height="9" fill="%23f4d7d7" opacity="0.6" transform="rotate(0.5)"/><rect x="0" y="36" width="50" height="6" fill="%23f4d7d7" opacity="0.9" transform="rotate(-0.5)"/></svg>\')',
        // Bordure ondulée verte comme sur la capture
        "pattern-june-frame-border":
          'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none"><path d="M20,20 C30,10 40,30 50,20 C60,10 70,30 80,20 C90,10 100,20 110,15 C120,10 130,25 140,20 C150,15 160,25 170,20 C175,25 180,20 180,30 C180,40 175,50 170,55 C165,60 170,70 165,75 C160,80 165,90 160,95 C155,100 160,110 155,115 C150,120 155,130 150,135 C145,140 150,150 145,155 C140,160 145,170 140,175 C130,180 120,175 110,180 C100,185 90,175 80,180 C70,185 60,175 50,180 C40,185 30,175 20,180 C15,175 10,165 15,160 C20,155 15,145 20,140 C25,135 20,125 25,120 C30,115 25,105 30,100 C35,95 30,85 35,80 C40,75 35,65 40,60 C45,55 40,45 45,40 C50,35 45,25 50,30 C45,25 35,35 30,30 C25,25 20,20 20,20 Z" stroke="%23b8c4a0" stroke-width="8" fill="none"/></svg>\')',
        "pattern-june-wavy-handdrawn":
          'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="%239db380" stroke-width="3" opacity="0.6"><path d="M15,25 C25,15 35,35 45,25 C55,15 65,35 75,25 C85,15 95,25 95,35 C95,45 85,55 75,45 C65,35 55,55 45,45 C35,35 25,55 15,45 C5,35 5,25 15,25 Z" fill="none"/></svg>\')',
        "pattern-june-wavy-brush":
          'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100" fill="%239db380" opacity="0.4"><path d="M10,30 C20,20 25,25 35,22 C45,19 50,28 60,25 C70,22 75,28 85,25 C95,22 100,30 110,28 C115,35 105,40 95,42 C85,44 80,38 70,41 C60,44 55,38 45,41 C35,44 30,38 20,41 C15,38 8,35 10,30 Z"/></svg>\')',
        "pattern-june-wavy-irregular":
          'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%239db380" opacity="0.5"><path d="M20,25 Q28,18 35,26 Q42,34 50,24 Q58,14 65,27 Q72,40 80,26 Q88,12 95,30 Q92,38 85,42 Q78,46 70,38 Q62,30 55,42 Q48,54 40,40 Q32,26 25,42 Q18,58 15,40 Q12,22 20,25 Z"/></svg>\')',
        "pattern-june-dots":
          "radial-gradient(circle, #e8e6e3 1px, transparent 1px)",
        "pattern-june-waves":
          'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20" fill="%23e8c5c5" opacity="0.1"><path d="M0 10c10-5 15-5 25 0s15 5 25 0 15-5 25 0 15 5 25 0v10H0V10z"/></svg>\')',
        "pattern-june-subtle":
          "linear-gradient(135deg, transparent 25%, rgba(232, 197, 197, 0.05) 25%, rgba(232, 197, 197, 0.05) 50%, transparent 50%, transparent 75%, rgba(232, 197, 197, 0.05) 75%)",
      },
      backgroundSize: {
        "pattern-june-lines-vertical": "24px 100%",
        "pattern-june-stripes-visible": "100% 25px",
        "pattern-june-stripes-handmade": "25px 25px",
        "pattern-june-stripes-organic": "40px 40px",
        "pattern-june-stripes-brush": "50px 50px",
        "pattern-june-frame-border": "200px 200px",
        "pattern-june-wavy-handdrawn": "100px 100px",
        "pattern-june-wavy-brush": "120px 100px",
        "pattern-june-wavy-irregular": "100px 100px",
        "pattern-june-dots": "24px 24px",
        "pattern-june-waves": "120px 20px",
        "pattern-june-subtle": "40px 40px",
      },
    },
  },
  plugins: [],
};

export default config;
