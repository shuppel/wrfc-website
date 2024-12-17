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
    },
  },
  plugins: [],
}

