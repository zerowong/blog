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
      spacing: {
        '75': '18.75rem',
      },
    },
    colors: {
      teal: colors.teal,
      green: colors.green,
      sky: colors.sky,
      blue: colors.blue,
      gray: colors.gray,
      white: colors.white,
      black: colors.black,
      red: colors.red,
    },
    screens: {
      md: defaultTheme.screens.md,
    },
  },
  variants: {
    extend: {
      cursor: ['disabled'],
      opacity: ['disabled'],
      backgroundColor: ['disabled'],
      textColor: ['disabled'],
    },
  },
}
