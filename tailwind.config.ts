import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#CDB4DB',
        accent: '#C3E2C2',
        neutral: '#FFF9F2',
        action: '#2F4A7F',
      },
      fontFamily: {
        sans: ['Karla', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      lineHeight: {
        'extra-loose': '1.45rem',
      },
      letterSpacing: {
        wide: '1.25em',
      },
      maxWidth: {
        'prose': '65ch',
      }
    },
  },
  plugins: [],
} satisfies Config
