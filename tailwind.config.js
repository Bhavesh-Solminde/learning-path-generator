/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Navbar: Deep Indigo
        navbar: "rgb(15, 35, 85)",
        "navbar-light": "rgb(25, 45, 105)",

        // Primary CTA: Electric Blue
        primary: {
          DEFAULT: "rgb(0, 123, 255)",
          50: "#e6f2ff",
          100: "#b3daff",
          200: "#80c1ff",
          300: "#4da9ff",
          400: "#1a91ff",
          500: "rgb(0, 123, 255)",
          600: "#006ed6",
          700: "#005bb3",
          800: "#004080",
          900: "#00264d",
        },

        // Secondary/Soft Cyan
        "light-blue": "rgb(100, 200, 255)",
        "light-blue-hover": "rgb(80, 180, 235)",

        // Progress bars: Sky Gradient (Blue–Purple)
        "progress-start": "rgb(90, 130, 255)",
        "progress-end": "rgb(160, 90, 255)",

        // Gold highlights and accents
        gold: "rgb(255, 193, 37)",
        "gold-light": "rgb(255, 223, 117)",

        // Accent: Sky Gradient (Blue–Purple)
        accent: "rgb(90, 130, 255)",
        "accent-gradient-end": "rgb(160, 90, 255)",
        "accent-glow": "rgba(90, 130, 255, 0.5)",

        // Background: Soft Off-white
        background: "rgb(247, 249, 252)",

        // Card border: Subtle Blue Accent
        "card-border": "rgb(0, 123, 255)",

        // Text colors
        "text-primary": "rgb(25, 35, 55)", // Deep Navy
        "text-secondary": "rgb(110, 120, 135)", // Muted Gray
        "text-link": "rgb(0, 123, 255)", // Electric Blue
        "text-link-hover": "rgb(90, 130, 255)", // Sky Blue hover

        // Profile colors
        "profile-name": "rgb(15, 35, 85)", // Deep Indigo
        "profile-subtitle": "rgb(120, 130, 145)", // Cool Slate Gray

        // White
        white: "rgb(255, 255, 255)",

        textdark: "#1F2937",
        textlight: "#FFFFFF",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
