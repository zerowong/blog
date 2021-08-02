const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{tsx}', './index.html'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      }
    },
    colors: {
      teal: colors.teal,
      green: colors.green,
      'light-blue': colors.sky,
      blue: colors.blue,
      gray: colors.gray
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
