/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      textColor: {
        secondary: '#2F2F2F'
      }
    },
    fontFamily: {
      inria: 'Inria Sans',
      lusitana: 'Lusitana'
    },
    boxShadow: {
      brutalism: '3px 3px 0px 0px rgba(0, 0, 0)'
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
