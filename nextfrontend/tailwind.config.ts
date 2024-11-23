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
        bg_1: '#f9f4c8ff', // Custom background color - Hero Section
        bg_2: '#95d0b9ff', // Custom background color - Ham Menu
        c1: '#58315aff',
      },
      boxShadow: {
        s1: '0px 4px 1px -1px rgba(0, 0, 0, 0.1)', // Shadow shifted to the right
      },
      fontFamily: {
        kodchasan: ['Kodchasan', 'sans-serif'], // Add the Kodchasan font
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
export default config;
