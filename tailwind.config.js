/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "SF Pro Display",
          "SF Pro Text",
          "Space Grotesk",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
      },
      colors: {
        night: {
          DEFAULT: "#030712",
          soft: "#050a1f",
          muted: "#0b1225",
          bright: "#101828",
        },
        ash: {
          DEFAULT: "#18181b",
          soft: "#27272a",
          muted: "#3f3f46",
          tint: "#71717a",
        },
        frost: {
          DEFAULT: "rgba(255,255,255,0.06)",
          strong: "rgba(255,255,255,0.12)",
          edge: "rgba(255,255,255,0.2)",
        },
        accent: {
          DEFAULT: "#f4f4f5",
          blue: "#82d4ff",
          cyan: "#67e8f9",
          violet: "#c084fc",
          amber: "#fcd34d",
        },
        glow: {
          blue: "rgba(125, 211, 252, 0.45)",
          violet: "rgba(192, 132, 252, 0.4)",
          white: "rgba(255,255,255,0.2)",
        },
        success: "#4ade80",
        warning: "#facc15",
        gold: "#facc15",
        "gold-light": "#fde68a",
        surface: "#050a1f",
        "surface-muted": "#0b1225",
        "surface-elevated": "rgba(255,255,255,0.04)",
        "border-subtle": "rgba(255,255,255,0.08)",
        "card-border": "rgba(255,255,255,0.2)",
        ink: "#f4f4f5",
        "ink-soft": "#d4d4d8",
        muted: "#a1a1aa",
        "muted-dark": "#71717a",
        "text-primary": "#f3f4f6",
        "text-secondary": "#a1a1aa",
        "profile-name": "#fafafa",
        "profile-subtitle": "rgba(255,255,255,0.65)",
        background: "#030712",
        navbar: "#050a1f",
        "navbar-light": "#0b1225",
        primary: {
          DEFAULT: "#f4f4f5",
          500: "#f4f4f5",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "mesh-glow":
          "radial-gradient(circle at 20% 20%, rgba(103,232,249,0.12), transparent 45%), radial-gradient(circle at 80% 0%, rgba(192,132,252,0.12), transparent 45%), linear-gradient(160deg, #030712 0%, #050a1f 45%, #0f172a 100%)",
      },
      boxShadow: {
        aurora: "0 30px 120px rgba(2, 8, 23, 0.75)",
        glass: "0 25px 90px rgba(0, 0, 0, 0.55)",
        glow: "0 20px 50px rgba(130, 212, 255, 0.25)",
        outline: "inset 0 1px 0 rgba(255,255,255,0.35)",
        neon: "0 0 30px rgba(255,255,255,0.2)",
      },
      borderRadius: {
        glass: "0.5rem",
        squircle: "1rem",
        xl: "0.6rem",
        "2xl": "0.85rem",
        "3xl": "1rem",
        full: "1.25rem",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      backdropBlur: {
        glass: "18px",
        "glass-lg": "32px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        soft: "cubic-bezier(0.34, 0.04, 0.24, 1)",
      },
      dropShadow: {
        glow: "0 10px 30px rgba(255,255,255,0.25)",
      },
      keyframes: {
        "slow-pulse": {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        "slow-pulse": "slow-pulse 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
