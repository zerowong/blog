module.exports = {
  content: ['./src/**/*.tsx', './index.html'],
  plugins: [
    require('daisyui'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
  daisyui: {
    logs: false,
    themes: false,
  },
}
