import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        primarydark: {
          DEFAULT: "hsl(var(--primary-dark))",
          foreground: "hsl(var(--primary-dark-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        red: {
          primary: "#E92215",
          dark: "#D21A0E",
        },
        green: {
          "950": "#07301E",
          light: "#7BE963",
          lighter: "#E7FDE2",
          dark: "#1D7808",
        },
        gray: {
          "950": "#475467",
          primary: "#D0D5DD",
          dark: "#98A2B3",
        },
        tertiary: {
          primary: "#344054",
          dark: "#101828",
        },
        orange: {
          light: "#FFF2EB",
          dark: "#FF5F00",
        },
        // text: {
        //   primary: "#000000",
        //   secondary: "#344054",
        // },
      },
      fontFamily: {
        display: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "display-small": "32px",
        "display-medium": "40px",
        "display-large": "64px",
      },
      lineHeight: {
        lg: "78px",
        md: "58px",
        sm: "48px",
      },
      keyframes: {
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
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
