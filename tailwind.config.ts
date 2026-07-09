import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF7F2",
        ink: "#1B1F1D",
        forest: {
          50: "#EAF0F6",
          100: "#CEDFEE",
          300: "#7FA8CC",
          500: "#3D6FA1",
          600: "#2C5985",
          700: "#1F4468",
          800: "#153050",
          900: "#0E2038",
        },
        gold: {
          100: "#F3E6C4",
          300: "#DDBB74",
          500: "#C9A24B",
          600: "#A9803A",
        },
        clay: {
          100: "#F3DCD3",
          400: "#C77A5F",
          500: "#B5533C",
          600: "#93412E",
        },
        surface: {
          light: "#FFFFFF",
          dark: "#141A17",
        },
        canvasdark: "#0E1311",
        line: {
          light: "#E4DFD3",
          dark: "#26302B",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "22px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(27,31,29,0.04), 0 8px 24px -8px rgba(27,31,29,0.08)",
        cardDark: "0 1px 2px rgba(0,0,0,0.3), 0 8px 24px -8px rgba(0,0,0,0.5)",
      },
      keyframes: {
        fillBar: {
          "0%": { width: "0%" },
          "100%": { width: "var(--target-width)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fillBar: "fillBar 0.9s cubic-bezier(0.22,1,0.36,1) forwards",
        fadeUp: "fadeUp 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
