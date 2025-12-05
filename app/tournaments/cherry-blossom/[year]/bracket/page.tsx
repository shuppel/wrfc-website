'use client';

import Link from 'next/link';
import { Card } from 'components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs';
import { ArrowLeft, Trophy, Medal, Users } from '@phosphor-icons/react';

interface Division {
  name: string;
  teams: string[];
  results?: {
    champion: string;
    runnerUp: string;
    thirdPlace?: string;
  };
  poolResults?: {
    poolName: string;
    standings: {
      team: string;
      wins: number;
      losses: number;
      points: number;
    }[];
  }[];
  knockoutResults?: {
    round: string;
    matches: {
      team1: string;
      team2: string;
      score1?: number;
      score2?: number;
      winner: string;
    }[];
  }[];
}

// This would eventually come from a database or CMS
const divisions: Division[] = [
  {
    name: 'Senior Men\'s 15s',
    teams: [
      'Washington RFC',
      'Norfolk Blues',
      'Baltimore RFC',
      'Pittsburgh Forge',
      // Add more teams
    ],
    results: {
      champion: 'TBD',
      runnerUp: 'TBD',
      thirdPlace: 'TBD'
    },
    poolResults: [
      {
        poolName: 'Pool A',
        standings: [
          { team: 'Washington RFC', wins: 0, losses: 0, points: 0 },
          { team: 'Norfolk Blues', wins: 0, losses: 0, points: 0 },
          // Add more teams
        ]
      },
      // Add more pools
    ]
  },
  // Add more divisions
];

export default function TournamentBracketPage({ params }: { params: { year: string } }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16">
            <Link 
              href={`/tournaments/cherry-blossom/${params.year}`}
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-wrfc-navy dark:hover:text-blue-400"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Tournament
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-nasalization text-wrfc-navy dark:text-blue-400">
            Tournament Bracket & Results
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Cherry Blossom Tournament {params.year}
          </p>
        </div>

        <Tabs defaultValue={divisions[0].name} className="space-y-8">
          <TabsList className="flex flex-wrap gap-2">
            {divisions.map((division) => (
              <TabsTrigger key={division.name} value={division.name}>
                {division.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {divisions.map((division) => (
            <TabsContent key={division.name} value={division.name}>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Results Card */}
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6 font-nasalization text-wrfc-navy dark:text-blue-400 flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-wrfc-red" />
                    Final Results
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Trophy className="w-8 h-8 text-yellow-400" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Champion</p>
                        <p className="font-bold text-lg">{division.results?.champion || 'TBD'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Medal className="w-8 h-8 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Runner-up</p>
                        <p className="font-bold text-lg">{division.results?.runnerUp || 'TBD'}</p>
                      </div>
                    </div>
                    {division.results?.thirdPlace && (
                      <div className="flex items-center gap-4">
                        <Medal className="w-8 h-8 text-amber-700" />
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Third Place</p>
                          <p className="font-bold text-lg">{division.results.thirdPlace}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Teams Card */}
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6 font-nasalization text-wrfc-navy dark:text-blue-400 flex items-center gap-2">
                    <Users className="w-6 h-6 text-wrfc-red" />
                    Participating Teams
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {division.teams.map((team) => (
                      <div
                        key={team}
                        className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800"
                      >
                        <span className="w-2 h-2 rounded-full bg-wrfc-red" />
                        <span>{team}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Pool Results */}
                {division.poolResults && (
                  <Card className="p-8 md:col-span-2">
                    <h2 className="text-2xl font-bold mb-6 font-nasalization text-wrfc-navy dark:text-blue-400">
                      Pool Standings
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                      {division.poolResults.map((pool) => (
                        <div key={pool.poolName}>
                          <h3 className="text-lg font-bold mb-4">{pool.poolName}</h3>
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                  <th className="text-left py-2">Team</th>
                                  <th className="text-center py-2">W</th>
                                  <th className="text-center py-2">L</th>
                                  <th className="text-center py-2">Pts</th>
                                </tr>
                              </thead>
                              <tbody>
                                {pool.standings.map((standing) => (
                                  <tr 
                                    key={standing.team}
                                    className="border-b border-gray-200 dark:border-gray-700"
                                  >
                                    <td className="py-2">{standing.team}</td>
                                    <td className="text-center py-2">{standing.wins}</td>
                                    <td className="text-center py-2">{standing.losses}</td>
                                    <td className="text-center py-2">{standing.points}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
} 