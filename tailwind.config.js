const { grey, indigo } = require('@mui/material/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      black: '#000000',
      garnet: '#802c2c',
      bittersweet: '#ff5757',
      'atomic-tangerine': '#ff9362',
      sunglow: '#ffce6d',
      'peach-yellow': '#fbe2ab',
      ivory: '#f6f6e9',
      white: '#ffffff',
      grey,
      indigo,
    },
    fontFamily: {
      poppins: ['var(--font-poppins)'],
    },
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      md: '1.125rem',
      xl: '1.5rem',
      '2xl': '2rem',
      '3xl': '2.5rem',
      '4xl': '3.25rem',
      '5xl': '4.375rem',
    },
    fontWeight: {
      hairline: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      'extra-bold': '800',
      black: '900',
    },
  },
  plugins: [],
};
