const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
    colors: {
      ...colors,
      purple: '#68417f',
      pink: {
        DEFAULT: '#c66aab',
        light: '#f2cfda'
      },
      blue: {
        DEFAULT: '#219bc3',
        light: '#b2d3e1'
      }
    }
  },
  plugins: [],
};
