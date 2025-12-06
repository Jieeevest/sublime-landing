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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#3197A5",
          50: "#E6F7F9",
          100: "#C2EDF1",
          200: "#85DBE3",
          300: "#4FC9D5",
          400: "#3197A5",
          500: "#3197A5",
          600: "#287A85",
          700: "#1F5C64",
          800: "#163D42",
          900: "#0D1F21",
        },
        secondary: {
          DEFAULT: "#023347",
          50: "#E6F0F3",
          100: "#B8D6DE",
          200: "#8ABCC9",
          300: "#5CA2B4",
          400: "#2E889F",
          500: "#023347",
          600: "#022939",
          700: "#011F2B",
          800: "#01141C",
          900: "#000A0E",
        },
        teal: {
          50: "#e6fffa",
          100: "#b2f5ea",
          200: "#81e6d9",
          300: "#4fd1c5",
          400: "#38b2ac",
          500: "#319795",
          600: "#2c7a7b",
          700: "#285e61",
          800: "#234e52",
          900: "#1d4044",
        },
      },
      fontFamily: {
        sans: [
          "PP Neue Montreal",
          "Inter",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        display: [
          "PP Neue Montreal",
          "Outfit",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        hero: [
          "PP Neue Montreal",
          "Outfit",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      keyframes: {
        fadeInUp: {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeIn: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
