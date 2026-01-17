/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // Enables the manual toggle
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#0A0A0A",       // Deepest Black
          card: "#121212",     // Dark Charcoal for cards
          border: "#2A2A2A"    // Subtle borders
        },
        primary: {
          DEFAULT: "#10B981",  // Neon Emerald (The Matrix Green)
          hover: "#059669",    // Darker Green for hover
          glow: "rgba(16, 185, 129, 0.5)" // Glass glow effect
        },
        danger: {
          DEFAULT: "#EF4444",  // Red for Delete actions
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      }
    },
  },
  plugins: [],
}