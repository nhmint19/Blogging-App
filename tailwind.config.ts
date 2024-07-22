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
        primary: {
          light: "#3B49DF",
          DEFAULT: "#3B49DF",
          dark: "#3B49DF",
        },
        bgPrimary: {
          light: "#F5F5F5",
          DEFAULT: "#F5F5F5",
          dark: "#F5F5F5",
        },
        secondary: {
          light: "#4B5563",
          DEFAULT: "#4B5563",
          dark: "#4B5563",
        },
      },
    },
  },
  plugins: [],
};
export default config;
