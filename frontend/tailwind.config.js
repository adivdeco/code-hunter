/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  darkMode: ["class"],
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionDuration: {
        2000: "2000ms",
        3000: "3000ms",
        5000: "5000ms",
        7000: "7000ms",
      },
      fontFamily: {
        rocksalt: ['"Rock Salt"', "cursive"],
        aladin: ['"Aladin"', "cursive"],
        changa: ['"Changa"', "sans-serif"],
        chango: ['"Chango"', "cursive"],
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {

        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        parallax: {
          '0%': { backgroundPosition: '260px' },
          '100%': { backgroundPosition: '-10000vw' },
        },
        moto: {
          '0%': { transform: 'translateY(0) rotate(0)' },
          '5%': { transform: 'translateY(0) rotate(-5deg)' },
          '25%': { transform: 'translateY(60px) rotate(-20deg)' },
          '49%': { transform: 'translateY(0) rotate(-1deg)' },
          '51%': { transform: 'translateY(0) rotate(1deg)' },
          '75%': { transform: 'translateY(60px) rotate(20deg)' },
          '80%': { transform: 'translateY(60px) rotate(0)' },
          '98%': { transform: 'translateY(0) rotate(0)' },
        },
        voiture: {
          '0%': { transform: 'rotate(0)' },
          '25%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(0)' },
          '75%': { transform: 'rotate(5deg)' },
          '100%': { transform: 'rotate(0)' },
        },

        fadeIn: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        marquee: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-100%)",
          },
        },
        "marquee-vertical": {
          "0%": {
            transform: "translateY(0)",
          },
          "100%": {
            transform: "translateY(-100%)",
          },
        },
        aurora: {
          "0%, 100%": {
            backgroundPosition: "0% center",
          },
          "50%": {
            backgroundPosition: "100% center",
          },
        },
        spinAround: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        gradientShift: {
          "0%, 100%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        // blob: 'blob 10s infinite',
        spin_slow: 'spin 20s linear infinite',
        parallax: 'parallax 600s linear infinite',
        moto: 'moto 5s linear infinite',
        voiture: 'voiture 1s linear infinite',
        fade_in: 'fadeIn 0.25s ease-out forwards',
        aurora: "aurora 3s ease-out infinite",
        "shimmer-slide": "shimmer var(--speed) linear infinite",
        "spin-around": "spinAround 10s linear infinite",
        gradient: "gradientShift 8s ease infinite",
        marquee: "marquee var(--duration, 40s) linear infinite",
        "marquee-vertical":
          "marquee-vertical var(--duration, 40s) linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },


    },
  },
  plugins: [require("tailwindcss-animate"), daisyui

  ],
};
