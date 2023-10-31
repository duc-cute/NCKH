/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    fontFamily: {
      main: ["Poppins", "sans-serif"],
    },
    extend: {
      width: {
        main: "1280px",
      },
      backgroundColor: {
        main: "#4f7db3",
      },
      colors: {
        main: "#4f7db3",
      },
    },
  },
  plugins: [],
};
