const colors = require('tailwindcss/colors');

module.exports = {
  important: true,
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
    colors: {
      ...colors,
      purple: '#04b085',
      pink: {
        DEFAULT: '#c66aab',
        light: '#f2cfda'
      },
      blue: {
        DEFAULT: '#219bc3',
        light: '#b2d3e1',
        dark: '#0d8ab3'
      }
    }
  },
  plugins: [],
};
