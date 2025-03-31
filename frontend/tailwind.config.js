/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // 🎨 Updated Light Theme Colors
        light: {
          100: "#EDE8DC", // Light Cream
          200: "#C1CFA1", // Pastel Green
          300: "#A5B68D", // Soft Green
          400: "#B17F59", // Primary Light
        },

        // 🌙 Dark Theme Colors (Unchanged)
        dark: {
          100: "#18230F",
          200: "#27391C",
          300: "#255F38",
          400: "#1F7D53",
        },
      },
    },
  },
  plugins: [],
};
