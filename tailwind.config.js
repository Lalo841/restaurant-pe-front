/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'filter-panel' : '#E86F21',
        'modal-panel' : '#C4A189'
      }
    },
  },
  plugins: [],
}

