import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'neon-green': {
          DEFAULT: '#39FF14',
          light: '#4DFF28',
          dark: '#28CC0F',
        },
        'eval-gray': {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#F0F0F0',
          300: '#E5E5E5',
          400: '#D4D4D4',
          500: '#A3A3A3',
          600: '#737373',
          700: '#525252',
          800: '#404040',
          900: '#262626',
        }
      },
      fontFamily: {
        sans: ['Inter', 'San Francisco', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'body': ['16px', { lineHeight: '1.5' }],
        'heading-lg': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-md': ['32px', { lineHeight: '1.3', fontWeight: '700' }],
        'heading-sm': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
      },
      borderRadius: {
        'eval': '8px',
      },
      animation: {
        'fade-in': 'fadeIn 300ms ease-in-out',
        'scale-up': 'scaleUp 200ms ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        }
      },
      backdropBlur: {
        'eval': '8px',
      }
    },
  },
  plugins: [],
};
export default config;