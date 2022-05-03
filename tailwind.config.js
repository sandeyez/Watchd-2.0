module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      mini: "400px",
      sm: "640px",
      md: "870px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        darkBlue: "#101724",
        regularBlue: "#1C243B",
        lightBlue: "#1FD2FF",
        pink: "#AB62FF",
        grey: "#888",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
