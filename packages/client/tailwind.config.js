module.exports = {
  content: ['./src/**/*.tsx'],
  plugins: [
    require('daisyui'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
  daisyui: {
    logs: false,
    themes: false,
  },
}
