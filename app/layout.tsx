import type { Metadata } from 'next'
import { ThemeProvider } from '../contexts/ThemeContext'
import './(public)/globals.css'
import { Inter } from 'next/font/google'
import { Bebas_Neue, Titillium_Web, Quantico } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const bebasNeue = Bebas_Neue({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
})
const titilliumWeb = Titillium_Web({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-titillium-web',
})
const quantico = Quantico({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-quantico',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://washingtonrugby.org'),
  applicationName: 'Washington Rugby Football Club',
  title: {
    default: 'DC Rugby | Washington Rugby Football Club - Premier DC Rugby Club',
    template: '%s | WRFC - DC Rugby'
  },
  description: 'Washington Rugby Football Club (WRFC) is DC\'s premier rugby club and the top DC rugby team, established in 1963. Join the best DC rugby club for competitive matches, expert coaching, and a strong rugby community.',
  keywords: [
    'dc rugby', 'washington dc rugby', 'rugby dc', 'dc rugby club', 'washington rugby', 'wrfc', 
    'washington rfc', 'rugby club', 'sports team', 'DC sports', 'dc rugby team',
    'rugby union', 'usa rugby', 'rugby training', 'rugby matches', 'dc rugby games',
    'rugby community', 'washington sports', 'rugby tournaments', 'best dc rugby'
  ],
  authors: [{ name: 'Washington Rugby Football Club' }],
  creator: 'Washington Rugby Football Club',
  publisher: 'Washington Rugby Football Club',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const initialTheme = theme || systemPreference;
                if (initialTheme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${bebasNeue.variable} ${titilliumWeb.variable} ${quantico.variable} font-sans`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}