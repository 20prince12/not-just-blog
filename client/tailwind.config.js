/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#a880ff",
        primary_light : "#c2acff",
        primary_dark : "#6036ff",
      }
    },
  },
  plugins: [],
}
