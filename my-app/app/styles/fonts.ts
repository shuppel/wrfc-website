import localFont from 'next/font/local'
import { JetBrains_Mono } from 'next/font/google'

export const nasalization = localFont({
  src: '../fonts/nasalization-rg.otf',
  variable: '--font-nasalization'
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono'
})

