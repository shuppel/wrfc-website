import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

interface AlumniSpotlightCardProps {
  id?: string
  name: string
  graduationYear: number
  currentRole?: string
  location?: string
  category: 'Community Service' | 'Professional Achievement' | 'Rugby Development' | 'Coaching'
  shortBio: string
  photo?: string
  featured?: boolean
}

export default function AlumniSpotlightCard({
  id,
  name,
  graduationYear,
  currentRole,
  location,
  category,
  shortBio,
  photo,
  featured = false
}: AlumniSpotlightCardProps) {
  const categoryColors = {
    'Community Service': 'bg-wrfc-teal/10 text-wrfc-teal',
    'Professional Achievement': 'bg-wrfc-navy/10 text-wrfc-navy',
    'Rugby Development': 'bg-wrfc-red/10 text-wrfc-red',
    'Coaching': 'bg-yellow-500/10 text-yellow-700'
  }

  const cardContent = (
    <>
      <div className="relative h-64 overflow-hidden">
        <Image
          src={photo || '/assets/pictures/2025_irish_harry.jpg'}
          alt={name}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-2xl font-bold font-nasalization">{name}</h3>
          <p className="text-sm opacity-90">Class of {graduationYear}</p>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${categoryColors[category]}`}>
            {category}
          </span>
          {featured && (
            <span className="inline-block px-3 py-1 bg-yellow-500/10 text-yellow-700 rounded-full text-sm font-semibold">
              Featured
            </span>
          )}
        </div>
        {currentRole && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{currentRole}</p>
        )}
        {location && (
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">{location}</p>
        )}
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3">{shortBio}</p>
        {id && (
          <div className="mt-4 flex items-center text-wrfc-red font-semibold group-hover:text-wrfc-red/80">
            Read Full Story
            <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        )}
      </div>
    </>
  )

  if (id) {
    return (
      <Link href={`/alumni/spotlights/${id}`}>
        <div className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 hover:shadow-xl transition-all cursor-pointer">
          {cardContent}
        </div>
      </Link>
    )
  }

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 hover:shadow-xl transition-all">
      {cardContent}
    </div>
  )
}