/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wow-gold': '#ffd100',
        'wow-tan': '#c79c6e',
        'wow-border': '#4a3a22',
        'wow-bg': '#1a1a1a',
      },
    },
  },
  plugins: [],
}