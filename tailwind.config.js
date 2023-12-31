/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,svelte}"],
  darkMode: "class",
  prefix: "mcq-",
  important: "#__MCQAPP__",
  theme: {
    container: {
      center: true,
    },
    extend: {
      // fontFamily: {
      //   brand: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      // },
    },
  },
  plugins: [],
}
