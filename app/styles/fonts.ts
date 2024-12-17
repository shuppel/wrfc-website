import { JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'

export const nasalization = localFont({
  src: '../../public/fonts/nasalization-rg.otf'
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono'
})

