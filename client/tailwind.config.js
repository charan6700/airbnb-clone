/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff385c",
        primaryHover: "#e53252",
      },
    },
  },
  plugins: [],
};
