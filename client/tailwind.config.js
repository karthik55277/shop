/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: { 50: '#fef9ee', 100: '#fdf0d5', 500: '#f59e0b', 600: '#d97706', 700: '#b45309' },
        brand: { DEFAULT: '#16a34a', dark: '#15803d', light: '#22c55e' }
      }
    }
  },
  plugins: []
}
