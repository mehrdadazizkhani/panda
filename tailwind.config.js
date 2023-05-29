/** @type {import('tailwindcss').Config} */

export default {
  corePlugins: {
    preflight: false,
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: "#root",
  theme: {
    fontFamily: {
      display: ["Vazirmatn", "Roboto", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
