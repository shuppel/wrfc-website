'use client'

import { useState } from 'react'
import { CaretDown } from '@phosphor-icons/react'

interface ECMember {
  position: string
  name: string
}

interface PreviousYear {
  year: string
  members: ECMember[]
}

interface ECAccordionProps {
  previousYears: PreviousYear[]
}

export default function ECAccordion({ previousYears }: ECAccordionProps) {
  const [openYear, setOpenYear] = useState<string | null>(null)

  const toggleYear = (year: string) => {
    setOpenYear(openYear === year ? null : year)
  }

  return (
    <div className="space-y-4">
      {previousYears.map((yearData) => (
        <div 
          key={yearData.year}
          className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden"
        >
          <button
            onClick={() => toggleYear(yearData.year)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {yearData.year} Executive Committee
            </h3>
            <CaretDown 
              className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                openYear === yearData.year ? 'rotate-180' : ''
              }`}
            />
          </button>
          
          <div className={`transition-all duration-300 ease-in-out ${
            openYear === yearData.year ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}>
            <div className="px-6 pb-6">
              <div className="grid md:grid-cols-2 gap-4 pt-4">
                {yearData.members.map((member, index) => (
                  <div 
                    key={index}
                    className={`rounded-lg p-4 ${
                      member.position.includes('Retired') 
                        ? 'bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600' 
                        : 'bg-gray-50 dark:bg-gray-900'
                    }`}
                  >
                    <p className={`font-semibold ${
                      member.position.includes('Retired') 
                        ? 'text-gray-700 dark:text-gray-400' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {member.position}
                    </p>
                    <p className={`${
                      member.position.includes('Retired') 
                        ? 'text-gray-500 dark:text-gray-500' 
                        : 'text-gray-600 dark:text-gray-100'
                    }`}>
                      {member.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}