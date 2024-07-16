/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pColor: "#a7a7a7",
      },
      fontSize: {
        pFont: "16px",
      },
    },
  },
  plugins: [],
};
