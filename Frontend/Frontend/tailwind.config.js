/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#cf6317",
        backgroundLight: "#f8f7f6",
        backgroundDark: "#211811",
      },
      fontFamily: {
        display: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};