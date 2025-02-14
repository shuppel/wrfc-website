'use client'

import { useTheme } from '../../contexts/ThemeContext'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@/app/components/ui/button'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="w-9 h-9 p-0 hover:bg-[#FF8C00]/10 transition-colors duration-300"
    >
      {theme === 'light' ? (
        <Sun className="h-5 w-5 text-[#FF8C00]" />
      ) : (
        <Moon className="h-5 w-5 text-[#FF8C00]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

