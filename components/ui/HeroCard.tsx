import { ReactNode } from 'react'
import Image from 'next/image'
import { Badge } from 'components/ui/badge'

interface Badge {
  text: string;
  icon?: ReactNode;
  variant?: "default" | "outline" | "glow";
}

interface HeroCardProps {
  icon?: string;
  imageSrc?: string;
  imageAlt?: string;
  title: string;
  subtitle?: string;
  description: string;
  badges: Badge[];
}

export function HeroCard({ 
  icon = "🕹️",
  imageSrc,
  imageAlt,
  title,
  subtitle,
  description,
  badges 
}: HeroCardProps) {
  return (
    <div className="mb-16">
      <div className="card-base card-gradient p-8 md:p-12 relative overflow-hidden group">
        {/* Animated corner accent */}
        <div className="absolute top-0 left-0 w-full h-full opacity-50 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-white shadow-[0_0_5px_rgba(255,255,255,0.5)] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
          <div className="absolute top-0 left-0 h-full w-[1px] bg-white shadow-[0_0_5px_rgba(255,255,255,0.5)] transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-700 delay-100" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white shadow-[0_0_5px_rgba(255,255,255,0.5)] transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-200" />
          <div className="absolute top-0 right-0 h-full w-[1px] bg-white shadow-[0_0_5px_rgba(255,255,255,0.5)] transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-700 delay-300" />
        </div>
        
        {/* Grid pattern background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          {/* Icon/Image container with animations */}
          <div className="w-32 h-32 md:w-48 md:h-48 relative flex-shrink-0 transform transition-transform duration-500 group-hover:scale-110">
            <div className="absolute inset-0 bg-orange-500/10 dark:bg-orange-500/20 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent rounded-2xl" />
            <div className="relative h-full w-full flex items-center justify-center">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={imageAlt || title}
                  width={256}
                  height={256}
                  className="relative object-contain scale-100 hover:scale-110 transition-transform duration-500"
                  priority
                />
              ) : (
                <span className="text-5xl md:text-6xl transform transition-transform duration-500 hover:scale-110">
                  {icon}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] to-[#FFA500] mb-4 font-nasalization tracking-wider group leading-relaxed pb-2">
              {title}
              {subtitle && (
                <sup className="text-[0.4em] font-mono ml-2 text-[#FF8C00] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  [{subtitle}]
                </sup>
              )}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 font-mono max-w-2xl leading-relaxed mb-6">
              <span className="text-[#FF8C00]">&lt;</span>
              {description}
              <span className="text-[#FF8C00]">/&gt;</span>
            </p>
            <div className="flex flex-wrap gap-4">
              {badges.map((badge, index) => (
                <Badge
                  key={index}
                  text={badge.text}
                  icon={badge.icon}
                  variant={badge.variant || "default"}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Add this to globals.css:
/*
@keyframes fadeInSlide {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
*/ 