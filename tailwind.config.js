const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  important: true,
  darkMode: "class", // or 'media' or 'class'
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: "0px 0px 16px #facc15",
      },
      fontFamily: {
        display: ["World Of Water", ...defaultTheme.fontFamily.sans],
        sans: ["World Of Water", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
