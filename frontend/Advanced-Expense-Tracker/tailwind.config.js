/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-dark': '#0f2027',
        'custom-mid': '#203a43',
        'custom-light': '#2c5364',
      }
    },
  },
  plugins: [],
}

