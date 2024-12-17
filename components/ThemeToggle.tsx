'use client'

import { useTheme } from '../contexts/ThemeContext'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="w-9 h-9 p-0"
    >
      {theme === 'light' ? (
        <Sun className="h-5 w-5 text-primary-light" />
      ) : (
        <Moon className="h-5 w-5 text-primary-dark" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

