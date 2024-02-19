import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        "primary-100": "#FFFCF7",
        "primary-200": "#FFF4DE",
        "primary-300": "#FFEBCF",
        "primary-400": "#FFE0B5",
        "primary-500": "#F8D99C",
        "primary-600": "#E3C78F",
        "primary-700": "#C9A26B",
        "primary-800": "#AB7C38",
        "primary-900": "#875E24",
        "dark-500": "#19160E",
        "light-500": "#EEEEEE",
        "success-500": "#9CF8BB",
        "warn-500": "#F8F49C",
        "error-500": "#F89C9C"
      }
    },
  },
  plugins: [],
} satisfies Config

