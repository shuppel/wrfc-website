module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FFB800',
          dark: '#FFA000',
        },
        background: {
          light: '#FFF5E6',
          dark: '#1A1A1A',
        },
        text: {
          light: '#1A1A1A',
          dark: '#E0E0E0',
        },
      },
      fontFamily: {
        nasalization: ['var(--font-nasalization)'],
        mono: ['var(--font-mono)'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards'
      }
    },
  },
  plugins: [],
}

