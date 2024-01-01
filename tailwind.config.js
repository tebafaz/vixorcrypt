/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        blueGray: {
          "light": '#4a4a56',
          'medium-light': '#383841',
          'medium-dark': '#292a30',
          'dark': '#1b1b20',
        },
      },
    },
  },
  plugins: [],
}

