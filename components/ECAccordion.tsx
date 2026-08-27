'use client'

import Link from 'next/link'
import { useState } from 'react'
import { CaretDown } from '@phosphor-icons/react'

import type { CommitteeTerm } from '@/data/roster/committee'

interface ECAccordionProps {
  terms: CommitteeTerm[]
}

export default function ECAccordion({ terms }: ECAccordionProps) {
  const [openTerm, setOpenTerm] = useState<string | null>(null)

  const toggleTerm = (label: string) => {
    setOpenTerm(openTerm === label ? null : label)
  }

  return (
    <div className="space-y-4">
      {terms.map((term) => (
        <div
          key={term.label}
          className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden"
        >
          <button
            onClick={() => toggleTerm(term.label)}
            aria-expanded={openTerm === term.label}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {term.label} Executive Committee
            </h3>
            <CaretDown
              className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                openTerm === term.label ? 'rotate-180' : ''
              }`}
            />
          </button>

          <div
            className={`transition-all duration-300 ease-in-out ${
              openTerm === term.label ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}
          >
            <div className="px-6 pb-6">
              <div className="grid md:grid-cols-2 gap-4 pt-4">
                {term.members.map((member, index) => (
                  <div
                    key={index}
                    className={`rounded-lg p-4 ${
                      member.retired
                        ? 'bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600'
                        : 'bg-gray-50 dark:bg-gray-900'
                    }`}
                  >
                    <p
                      className={`font-semibold ${
                        member.retired
                          ? 'text-gray-700 dark:text-gray-400'
                          : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      {member.position}
                      {member.retired && (
                        <span className="ml-2 text-xs font-normal uppercase tracking-wider text-gray-500">
                          Post retired
                        </span>
                      )}
                    </p>
                    <p
                      className={
                        member.retired
                          ? 'text-gray-500 dark:text-gray-500'
                          : 'text-gray-600 dark:text-gray-100'
                      }
                    >
                      {member.slug ? (
                        <Link
                          href={`/teams/players/${member.slug}`}
                          className="underline-offset-4 hover:underline"
                        >
                          {member.name}
                        </Link>
                      ) : (
                        member.name
                      )}
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
