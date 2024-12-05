/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: "#C3E2E5",
      secondary: "#AACFD5",
      tertiary: '#68B8C1',
      quatanary: '#298A91',
      quinary: '#06384F',
      senary: '#F97433',
      septenary: '#CC3F08',
      white: "#E9E5E1",
      black: "#121212",
      gray: "#3a3a3a",
      transparent: "#ffffff00",
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
    },
  },
  plugins: [],
}

