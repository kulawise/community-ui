/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        kulagreen: "#1db470",
        "kulagreen-dark": "#189d5d",
        kulayellow: "#ffedb3",
        kulabrown: "#ab7f4a",
        kulablue: "#103d71",
        kulapurple: "#7e57c2",
        kulared: "#b2403e",
      },
      boxShadow: {
        brutal: "2px 2px 0px 0px rgba(0, 0, 0, 1)",
        "brutal-sm": "1px 1px 0px 0px rgba(0, 0, 0, 1)",
        "brutal-lg": "3px 3px 0px 0px rgba(0, 0, 0, 1)",
      },
    },
  },
  plugins: [],
};
