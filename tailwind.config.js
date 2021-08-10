const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{tsx}', './index.html'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
    colors: {
      teal: colors.teal,
      green: colors.green,
      sky: colors.sky,
      blue: colors.blue,
      gray: colors.gray,
      white: colors.white,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
