/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './contexts/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        // Brand primary is the crest blue; hover/dark variants stay on the same ramp.
        primary: {
          light: '#0000CC',
          dark: '#5252DC',
        },
        background: {
          light: '#FFFFFF',
          dark: '#0B0B1A',
        },
        text: {
          light: '#0B0B1A',
          dark: '#E6E6FA',
        },
        // Club crest palette: shield blue #0000CC, shield red #FF0000, white.
        // Scales are tints/shades of those two exact logo colors.
        'wrfc': {
          blue: {
            50: '#F2F2FC',
            100: '#E6E6FA',
            200: '#C7C7F4',
            300: '#9999EB',
            400: '#5252DC',
            500: '#0000CC', // crest blue
            600: '#0000B8',
            700: '#00009F',
            800: '#000083',
            900: '#000062',
            950: '#000041',
            DEFAULT: '#0000CC',
          },
          red: {
            50: '#FFF2F2',
            100: '#FFE6E6',
            200: '#FFC7C7',
            300: '#FF9999',
            400: '#FF5252',
            500: '#FF0000', // crest red
            600: '#E60000',
            700: '#C70000',
            800: '#A30000',
            900: '#7A0000',
            950: '#520000',
            DEFAULT: '#E60000', // AA on white; 500 is the exact crest red for fills
          },
          // Deep crest blue used for headings and dark surfaces.
          navy: '#000062',
          white: '#FFFFFF',
        }
      },
      fontFamily: {
        display: ['var(--font-bebas-neue)', 'sans-serif'],
        heading: ['var(--font-titillium-web)', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        accent: ['var(--font-quantico)', 'monospace'],
        mono: ['var(--font-mono)'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0', opacity: '0' },
          to: { height: 'var(--radix-accordion-content-height)', opacity: '1' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
          to: { height: '0', opacity: '0' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-in-right': 'slide-in-right 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        gradient: 'gradient 15s ease infinite',
      }
    },
  },
  plugins: [],
}

