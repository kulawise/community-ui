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
        brutal: "8px 8px 0px 0px rgba(0, 0, 0, 1)",
        "brutal-sm": "4px 4px 0px 0px rgba(0, 0, 0, 1)",
        "brutal-lg": "12px 12px 0px 0px rgba(0, 0, 0, 1)",
      },
    },
  },
  plugins: [],
};
