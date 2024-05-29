/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],

  theme: {
    fontFamily: {
      main: ["Poppins", "sans-serif"],
      "sans-serif": "sans-serif",
      blink: "Blinker",
      lato: "Lato",
      roboto: "Roboto",
      serif: "serif",
    },
    extend: {
      width: {
        main: "1280px",
        sidebar: "200px",
      },
      height: {
        header: "80px",
        table: "270px",
      },
      backgroundColor: {
        main: "#001529",
        primary: "#446084",

        overlay: "#00000033",
      },
      colors: {
        main: "#4f7db3",
        primary: "#446084",
      },
      boxShadow: {
        "category-study":
          "0 2px 4px rgba(0, 0, 0, .08), 0 4px 12px rgba(0, 0, 0, .08)",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
      },
    },
  },
  plugins: [],
};
