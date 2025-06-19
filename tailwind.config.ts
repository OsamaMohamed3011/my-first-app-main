import type { Config } from "tailwindcss";
import colors from "./colors";

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // For Next.js 13+ (app directory)
    './pages/**/*.{js,ts,jsx,tsx}', // For Next.js 12 or earlier (pages directory)
    './components/**/*.{js,ts,jsx,tsx}', // Include components
  ],
  theme: {
    extend: {
      colors: {
        info: {
          main: colors.info.main,
          light: colors.info.light,
          dark: colors.info.dark,
        },
        warning: {
          light: colors.warning.light,
          main: colors.warning.main,
        },
        secondary: {
          main: colors.secondary.main,
          dark: colors.secondary.dark,
          light: colors.secondary.light,
        },
        success: {
          main: colors.success.main,
          dark: colors.success.dark,
          light: colors.success.light,
        },
        error: {
          main: colors.error.main,
        },
        text: {
          light: colors.text.light,
          dark: colors.text.dark,
        },
      },
      fontFamily: {
        cairo: ["Cairo", "sans-serif"], 
      },
    },
  },
  plugins: [],
} satisfies Config;
