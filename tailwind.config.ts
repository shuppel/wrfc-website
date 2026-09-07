import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			display: ['var(--font-bebas-neue)', 'sans-serif'],
  			heading: ['var(--font-titillium-web)', 'sans-serif'],
  			accent: ['var(--font-quantico)', 'sans-serif'],
  			sans: ['var(--font-inter)', 'sans-serif'],
  		},
  		colors: {
  			// Club crest palette: shield blue #0000CC, shield red #FF0000, white.
  			wrfc: {
  				blue: {
  					50: '#F2F2FC',
  					100: '#E6E6FA',
  					200: '#C7C7F4',
  					300: '#9999EB',
  					400: '#5252DC',
  					500: '#0000CC',
  					600: '#0000B8',
  					700: '#00009F',
  					800: '#000083',
  					900: '#000062',
  					950: '#000041',
  					DEFAULT: '#0000CC'
  				},
  				red: {
  					50: '#FFF2F2',
  					100: '#FFE6E6',
  					200: '#FFC7C7',
  					300: '#FF9999',
  					400: '#FF5252',
  					500: '#FF0000',
  					600: '#E60000',
  					700: '#C70000',
  					800: '#A30000',
  					900: '#7A0000',
  					950: '#520000',
  					DEFAULT: '#E60000'
  				},
  				navy: '#000062',
  				white: '#FFFFFF'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
