/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#050816",
        void: "#0b1120",
        panel: "#101a31",
        panelSoft: "#14213d",
        electric: "#38bdf8",
        danger: "#ef4444",
        alert: "#fbbf24",
        safe: "#22c55e",
      },
      boxShadow: {
        glass: "0 24px 80px rgba(8, 15, 35, 0.45)",
      },
      backgroundImage: {
        "panel-gradient":
          "linear-gradient(135deg, rgba(56,189,248,0.16), rgba(15,23,42,0.78) 48%, rgba(239,68,68,0.12))",
        "hero-grid":
          "radial-gradient(circle at top left, rgba(56,189,248,0.20), transparent 30%), radial-gradient(circle at bottom right, rgba(239,68,68,0.12), transparent 28%), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        "hero-grid": "auto, auto, 28px 28px, 28px 28px",
      },
      animation: {
        "pulse-soft": "pulseSoft 2.4s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        scan: "scan 3s linear infinite",
      },
      keyframes: {
        pulseSoft: {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        scan: {
          "0%": { transform: "translateX(-115%)" },
          "100%": { transform: "translateX(115%)" },
        },
      },
      fontFamily: {
        sans: ["Segoe UI", "Tahoma", "Geneva", "Verdana", "sans-serif"],
      },
    },
  },
  plugins: [],
};
