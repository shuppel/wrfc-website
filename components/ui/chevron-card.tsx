import { ReactNode } from 'react'
import { Card } from "components/ui/card"
import { cn } from "@/app/utils"

interface ChevronCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
  index?: number;
}

export function ChevronCard({ 
  icon, 
  title, 
  description, 
  children,
  className,
  index = 0
}: ChevronCardProps) {
  return (
    <Card 
      className={cn(`
        group p-6 backdrop-blur-sm 
        bg-white/70 dark:bg-slate-900/70 
        border-slate-200 dark:border-slate-700
        hover:shadow-[0_0_30px_rgba(255,140,0,0.15)] 
        transition-all duration-500 ease-out
        hover:translate-y-[-8px] hover:scale-[1.02]
        ${index % 2 === 0 ? 'rotate-[-1deg]' : 'rotate-[1deg]'}
        relative overflow-hidden
      `, className)}
    >
      {/* Animated corner accent */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-[#FF8C00] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        <div className="absolute top-0 left-0 h-full w-[1px] bg-[#FF8C00] transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 delay-100" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#FF8C00] transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-200" />
        <div className="absolute top-0 right-0 h-full w-[1px] bg-[#FF8C00] transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 delay-300" />
      </div>

      <div className="flex flex-col h-full">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0 p-2 bg-[#FF8C00]/5 dark:bg-[#FF8C00]/10 rounded-lg group-hover:bg-[#FF8C00]/10 dark:group-hover:bg-[#FF8C00]/20 transition-colors duration-300">
            {icon}
          </div>
          <div className="flex-1 min-w-0 text-left">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 font-nasalization group-hover:text-[#FF8C00] transition-colors duration-300">
              {title}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 font-mono text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>
        
        <div className="flex-1 text-left">
          {children}
        </div>
      </div>
    </Card>
  )
} 