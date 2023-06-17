const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        main: [
          'Vazir',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji'
        ]
      },
      backgroundImage: {
        'gradient-radial': ' linear-gradient(to top,white 0%,white 50%,#4285F4 50%,#4285F4 100%)',
      }
    },
    colors: {
      ...colors,
      primary: {
        50: "#EFEFFD",
        100: "#DEDEFA",
        200: "#BEBDF6",
        300: "#9D9BF1",
        400: "#7D7AED",
        500: "#5C59E8",
        600: "#4543AE",
        700: "#2E2D74",
        800: "#17163A",
        900: "#090917",
      },

      green: {
        50: "#E7F4EE",
        100: "#CFE7DC",
        200: "#9ED0B9",
        300: "#6EB895",
        400: "#3DA172",
        500: "#0D894F",
        600: "#0A673B",
        700: "#074528",
        800: "#032214",
        900: "#010E08",
      },
      yellow: {
        50: "#FDF1E8",
        100: "#FAE1CF",
        200: "#F4C3A0",
        300: "#EFA670",
        400: "#E98841",
        500: "#E46A11",
        600: "#AB500D",
        700: "#723509",
        800: "#391B04",
        900: "#170B02",
      },
      red: {
        50: "#FEEDEC",
        100: "#FCDAD7",
        200: "#F9B4AF",
        300: "#F68F88",
        400: "#F36960",
        500: "#F04438",
        600: "#B4332A",
        700: "#78221C",
        800: "#3C110E",
        900: "#180706",
      },
      blue: {
        50: "#E8F8FD",
        100: "#D0F0FA",
        200: "#A1E0F4",
        300: "#71D1EF",
        400: "#42C1E9",
        500: "#13B2E4",
        600: "#0E86AB",
        700: "#0A5972",
        800: "#052D39",
        900: "#021217",
      },
      black: {
        500: "#667085",
        600: "#4D5464",
        700: "#333843",
        800: "#1A1C21",
        900: "##0A0B0D",
      },
      gray: {
        25: "#EFEFFD",
        50: "#DEDEFA",
        100: "#BEBDF6",
        200: "#9D9BF1",
        300: "#7D7AED",
        400: "#5C59E8",
      },
    },
  },
  plugins: [],
};
