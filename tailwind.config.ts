import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
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
        tertiary: {
          light: "#FEF5E6",
          DEFAULT: "#FEF5E6",
          dark: "#FEF5E6",
        },
        danger: {
          light: "#FF0000",
          DEFAULT: "#FF0000",
          dark: "#FF0000",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("flowbite/plugin")],
};
export default config;
