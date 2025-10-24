'use client';

import { useState } from 'react';
import Image from 'next/image';
import { format, parseISO, isPast } from 'date-fns';
import { Game } from '@/types/game';
import { getLogoForTeam } from '@/utils/logoHelper';
import { Trophy, Table } from '@phosphor-icons/react';
import { DivisionType, getGameDivision } from './types';

type ViewType = 'upcoming' | 'past' | 'standings';

interface TeamRecord {
  wins: number;
  losses: number;
  draws: number;
}

interface ScheduleViewProps {
  games: Game[];
}

export default function ScheduleView({ games: allGames }: ScheduleViewProps) {
  const [activeView, setActiveView] = useState<ViewType>('upcoming');
  const [activeDivision, setActiveDivision] = useState<DivisionType>('D1');
  const [selectedSeason, setSelectedSeason] = useState<number>(2025);

  // Filter and sort games based on the active view
  const games = allGames
    .filter(game => {
      const gameDate = parseISO(game.date);
      const now = new Date();
      if (activeView === 'standings') return true;
      return activeView === 'upcoming' 
        ? gameDate >= now 
        : gameDate < now;
    })
    .sort((a, b) => {
      const dateA = parseISO(a.date);
      const dateB = parseISO(b.date);
      return activeView === 'upcoming' 
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });

  // Group games by year
  const gamesByYear = games.reduce((acc, game) => {
    const year = new Date(game.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(game);
    return acc;
  }, {} as Record<number, Game[]>);

  const sortedYears = Object.keys(gamesByYear)
    .map(Number)
    .sort((a, b) => activeView === 'upcoming' ? a - b : b - a);

  // Calculate records from past games by season
  const calculateRecordsBySeason = () => {
    const recordsBySeason: { [year: number]: { [key in DivisionType]: TeamRecord } } = {};

    const pastGames = allGames.filter(game => {
      const gameDate = parseISO(game.date);
      return isPast(gameDate) && game.result;
    });

    pastGames.forEach(game => {
      const year = new Date(game.date).getFullYear();
      
      if (!recordsBySeason[year]) {
        recordsBySeason[year] = {
          'D1': { wins: 0, losses: 0, draws: 0 },
          'D3': { wins: 0, losses: 0, draws: 0 },
          'Social': { wins: 0, losses: 0, draws: 0 }
        };
      }

      const division = getGameDivision(game.competition);
      if (!division || !game.result) return;

      const isHome = game.isHome;
      const wrfcScore = isHome ? game.result.homeScore : game.result.awayScore;
      const opponentScore = isHome ? game.result.awayScore : game.result.homeScore;

      if (wrfcScore > opponentScore) {
        recordsBySeason[year][division].wins++;
      } else if (wrfcScore < opponentScore) {
        recordsBySeason[year][division].losses++;
      } else {
        recordsBySeason[year][division].draws++;
      }
    });

    return recordsBySeason;
  };

  const recordsBySeason = calculateRecordsBySeason();
  const availableSeasons = Object.keys(recordsBySeason).map(Number).sort((a, b) => b - a);
  const records = recordsBySeason[selectedSeason] || {
    'D1': { wins: 0, losses: 0, draws: 0 },
    'D3': { wins: 0, losses: 0, draws: 0 },
    'Social': { wins: 0, losses: 0, draws: 0 }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="container mx-auto">

        {/* Instagram CTA for Venue Info */}
        <div className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3 text-center">
          <p className="text-sm text-gray-700 dark:text-white">
            📍 For venue details and game day updates, follow us on Instagram:
            <a 
              href="https://www.instagram.com/wrfc1963/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @wrfc1963
            </a>
          </p>
        </div>

        {/* View Navigation */}
        <div className="flex justify-center gap-8 mb-12">
          <button
            className={`button-text pb-2 border-b-4 transition-colors ${
              activeView === 'upcoming'
                ? 'text-wrfc-red border-wrfc-red'
                : 'text-gray-400 border-transparent hover:text-wrfc-red hover:border-wrfc-red'
            }`}
            onClick={() => setActiveView('upcoming')}
          >
            Upcoming Games
          </button>
          <button
            className={`button-text pb-2 border-b-4 transition-colors ${
              activeView === 'past'
                ? 'text-wrfc-red border-wrfc-red'
                : 'text-gray-400 border-transparent hover:text-wrfc-red hover:border-wrfc-red'
            }`}
            onClick={() => setActiveView('past')}
          >
            Past Game Results
          </button>
          <button
            className={`button-text pb-2 border-b-4 transition-colors ${
              activeView === 'standings'
                ? 'text-wrfc-red border-wrfc-red'
                : 'text-gray-400 border-transparent hover:text-wrfc-red hover:border-wrfc-red'
            }`}
            onClick={() => setActiveView('standings')}
          >
            <span className="flex items-center gap-2">
              <Table className="w-5 h-5" />
              Season Records
            </span>
          </button>
        </div>

        {activeView === 'standings' ? (
          <>
            {/* Season Selection */}
            <div className="flex justify-center gap-4 mb-6">
              {availableSeasons.map((year) => (
                <button
                  key={year}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    selectedSeason === year
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => setSelectedSeason(year)}
                >
                  {year} Season
                </button>
              ))}
            </div>

            {/* Division Selection for Records */}
            <div className="flex justify-center gap-4 mb-8">
              {(['D1', 'D3', 'Social'] as DivisionType[]).map((division) => (
                <button
                  key={division}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    activeDivision === division
                      ? 'bg-wrfc-navy text-white'
                      : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveDivision(division)}
                >
                  {division} Division
                </button>
              ))}
            </div>

            {/* Simple Records Display */}
            <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">{selectedSeason} {activeDivision} Division</h2>
                <div className="text-5xl font-bold text-wrfc-navy dark:text-blue-400 mb-4">
                  {records[activeDivision].wins}-{records[activeDivision].losses}
                  {records[activeDivision].draws > 0 ? `-${records[activeDivision].draws}` : ''}
                </div>
                <p className="text-gray-600 dark:text-gray-100 text-lg">
                  {records[activeDivision].wins} Wins • {records[activeDivision].losses} Losses
                  {records[activeDivision].draws > 0 ? ` • ${records[activeDivision].draws} Draws` : ''}
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Modern Table View - Desktop */}
            <div className="hidden lg:block space-y-8">
              {sortedYears.map((year) => (
                <div key={year} className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  {/* Year Header */}
                  <div className="bg-gradient-to-r from-blue-900 to-blue-700 dark:from-blue-800 dark:to-blue-600 px-6 py-4">
                    <h2 className="text-2xl font-bold text-white font-nasalization">
                      {year} Season
                    </h2>
                  </div>
                  
                  {/* Table for this year */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-900">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-100 uppercase tracking-wider">
                            Date & Time
                          </th>
                          <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-100 uppercase tracking-wider">
                            Matchup
                          </th>
                          <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-100 uppercase tracking-wider">
                            {activeView === 'past' ? 'Score' : 'Time'}
                          </th>
                          <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-100 uppercase tracking-wider">
                            Competition
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {gamesByYear[year].map((game, index) => {
                          const gameDate = parseISO(game.date);
                          const wrfcTeam = game.isHome ? game.homeTeam : game.awayTeam;
                          const opponentTeam = game.isHome ? game.awayTeam : game.homeTeam;
                          const wrfcScore = game.result ? (game.isHome ? game.result.homeScore : game.result.awayScore) : null;
                          const opponentScore = game.result ? (game.isHome ? game.result.awayScore : game.result.homeScore) : null;
                          
                          return (
                            <tr 
                              key={game.id} 
                              className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                              {/* Date & Time */}
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex flex-col">
                                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {format(gameDate, 'MMM d, yyyy')}
                                  </div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {format(parseISO(`2000-01-01T${game.time}`), 'h:mm a')}
                                  </div>
                                </div>
                              </td>

                              {/* Matchup */}
                              <td className="px-6 py-4">
                                <div className="flex items-center justify-center space-x-4">
                                  {/* WRFC Team */}
                                  <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 relative flex-shrink-0">
                                      <Image
                                        src={getLogoForTeam(wrfcTeam.name, wrfcTeam.logo)}
                                        alt={wrfcTeam.name}
                                        fill
                                        className="object-contain"
                                      />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                      {wrfcTeam.shortName || wrfcTeam.name}
                                    </span>
                                  </div>

                                  {/* VS or @ indicator */}
                                  <div className="flex items-center">
                                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">
                                      {game.isHome ? 'vs' : '@'}
                                    </span>
                                  </div>

                                  {/* Opponent Team */}
                                  <div className="flex items-center space-x-3">
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                      {opponentTeam.shortName || opponentTeam.name}
                                    </span>
                                    <div className="w-10 h-10 relative flex-shrink-0">
                                      <Image
                                        src={getLogoForTeam(opponentTeam.name, opponentTeam.logo)}
                                        alt={opponentTeam.name}
                                        fill
                                        className="object-contain"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </td>

                              {/* Score or Time */}
                              <td className="px-6 py-4 text-center">
                                {game.result ? (
                                  <div className="flex items-center justify-center space-x-3">
                                    <span className={`text-lg font-bold ${
                                      wrfcScore !== null && opponentScore !== null && wrfcScore > opponentScore 
                                        ? 'text-green-600 dark:text-green-400' 
                                        : wrfcScore !== null && opponentScore !== null && wrfcScore < opponentScore
                                        ? 'text-red-600 dark:text-red-400'
                                        : 'text-gray-600 dark:text-gray-100'
                                    }`}>
                                      {wrfcScore}
                                    </span>
                                    <span className="text-gray-400">-</span>
                                    <span className={`text-lg font-bold ${
                                      wrfcScore !== null && opponentScore !== null && opponentScore > wrfcScore 
                                        ? 'text-green-600 dark:text-green-400'
                                        : wrfcScore !== null && opponentScore !== null && opponentScore < wrfcScore
                                        ? 'text-red-600 dark:text-red-400'
                                        : 'text-gray-600 dark:text-gray-100'
                                    }`}>
                                      {opponentScore}
                                    </span>
                                  </div>
                                ) : (
                                  <div className="text-sm text-gray-600 dark:text-gray-100">
                                    {format(parseISO(`2000-01-01T${game.time}`), 'h:mm a')}
                                  </div>
                                )}
                              </td>

                              {/* Competition */}
                              <td className="px-6 py-4 text-center">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  game.competition === 'D1' 
                                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                                    : game.competition === 'D3'
                                    ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                                    : 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                                }`}>
                                  {game.competition}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}

              {/* Empty State */}
              {games.length === 0 && (
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-12 text-center">
                  <div className="text-gray-500 dark:text-gray-400">
                    <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No games found</p>
                    <p className="text-sm">Check back later for upcoming fixtures</p>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile-Responsive Card View */}
            <div className="lg:hidden space-y-8">
              {sortedYears.map((year) => (
                <div key={`mobile-${year}`}>
                  <h2 className="text-xl font-bold text-blue-900 dark:text-blue-400 font-nasalization mb-4 px-4">
                    {year} Season
                  </h2>
                  <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    {gamesByYear[year].map((game) => {
                      const gameDate = parseISO(game.date);
                      const wrfcTeam = game.isHome ? game.homeTeam : game.awayTeam;
                      const opponentTeam = game.isHome ? game.awayTeam : game.homeTeam;
                      const wrfcScore = game.result ? (game.isHome ? game.result.homeScore : game.result.awayScore) : null;
                      const opponentScore = game.result ? (game.isHome ? game.result.awayScore : game.result.homeScore) : null;
                      
                      return (
                        <div key={`mobile-${game.id}`} className="border-t border-gray-200 dark:border-gray-700 p-4 first:border-t-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">
                              {format(gameDate, 'MMM d, yyyy')} • {format(parseISO(`2000-01-01T${game.time}`), 'h:mm a')}
                            </div>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              game.competition === 'D1' 
                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                                : game.competition === 'D3'
                                ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                                : 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                            }`}>
                              {game.competition}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 relative">
                                <Image
                                  src={getLogoForTeam(wrfcTeam.name, wrfcTeam.logo)}
                                  alt={wrfcTeam.name}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                              <span className="text-sm font-semibold">{wrfcTeam.shortName}</span>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              {game.result ? (
                                <span className="text-lg font-bold">{wrfcScore} - {opponentScore}</span>
                              ) : (
                                <span className="text-sm text-gray-500">{game.isHome ? 'vs' : '@'}</span>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <span className="text-sm font-semibold">{opponentTeam.shortName}</span>
                              <div className="w-8 h-8 relative">
                                <Image
                                  src={getLogoForTeam(opponentTeam.name, opponentTeam.logo)}
                                  alt={opponentTeam.name}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            </div>
                          </div>
                          
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}