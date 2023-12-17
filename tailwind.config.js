/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],

  theme: {
    fontFamily: {
      main: ["Poppins", "sans-serif"],
      serif: "sans-serif",
      blink: "Blinker",
      lato: "Lato",
      roboto: "Roboto",
    },
    extend: {
      width: {
        main: "1280px",
        sidebar: "200px",
      },
      height: {
        header: "80px",
      },
      backgroundColor: {
        main: "#001529",
        overlay: "#00000033",
      },
      colors: {
        main: "#4f7db3",
      },
    },
  },
  plugins: [],
};
