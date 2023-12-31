/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      textColor: {
        secondary: '#2F2F2F',
      },
    },
    fontFamily: {
      inria: 'Inria Sans',
      lusitana: 'Lusitana',
    },
    boxShadow: {
      brutalism: '3px 3px 0px 0px rgba(0, 0, 0)',
      'brutalism-sm': '1px 1px 0px 0px rgba(0, 0, 0)',
      'brutalism-dark': '3px 3px 0px 0px rgba(255, 255, 255)',
      'brutalism-sm-dark': '1px 1px 0px 0px rgba(255, 255, 255)',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
