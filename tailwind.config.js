/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nature: {
          darkest: '#020704',
          dark: '#05120a',
          deep: '#0a1d12',
          forest: '#112b1c',
          moss: '#1c422c',
          emerald: '#10b981',
          mint: '#34d399',
          light: '#6ee7b7',
          glow: '#4ade80',
          canopy: '#143423',
          mist: '#a7f3d0',
          gold: '#fbbf24',
          earth: '#854d0e',
        }
      },
      fontFamily: {
        cinematic: ['Cinzel', 'Playfair Display', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'sway': 'sway 8s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg) translateY(0px)' },
          '50%': { transform: 'rotate(2deg) translateY(-8px)' },
        }
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'emerald-glow': '0 0 35px -5px rgba(16, 185, 129, 0.35)',
        'emerald-strong': '0 0 50px 0px rgba(16, 185, 129, 0.55)',
        'nature-card': '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(16, 185, 129, 0.15)',
      }
    },
  },
  plugins: [],
}

