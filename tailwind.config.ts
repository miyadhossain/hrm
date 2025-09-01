import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#F69348",
          foreground: "#ffffff",
        },
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
