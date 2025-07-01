'use client';

import { useState } from 'react';
import Image from 'next/image';
import { format, parseISO, isPast } from 'date-fns';
import { Game, getGoogleMapsUrl } from '@/types/game';
import { getLogoForTeam } from '@/utils/logoHelper';
import { MapPin, Trophy, History, Table } from 'lucide-react';
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

  // Calculate records from past games
  const calculateRecords = () => {
    const records: { [key in DivisionType]: TeamRecord } = {
      'D1': { wins: 0, losses: 0, draws: 0 },
      'D3': { wins: 0, losses: 0, draws: 0 },
      'Social': { wins: 0, losses: 0, draws: 0 }
    };

    const pastGames = allGames.filter(game => {
      const gameDate = parseISO(game.date);
      return isPast(gameDate) && game.result;
    });

    pastGames.forEach(game => {
      const division = getGameDivision(game.competition);
      if (!division || !game.result) return;

      const isHome = game.isHome;
      const wrfcScore = isHome ? game.result.homeScore : game.result.awayScore;
      const opponentScore = isHome ? game.result.awayScore : game.result.homeScore;

      if (wrfcScore > opponentScore) {
        records[division].wins++;
      } else if (wrfcScore < opponentScore) {
        records[division].losses++;
      } else {
        records[division].draws++;
      }
    });

    return records;
  };

  const records = calculateRecords();

  return (
    <div className="flex flex-col items-center w-full">
      <div className="container mx-auto">

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
            {/* Division Selection for Records */}
            <div className="flex justify-center gap-4 mb-8">
              {(['D1', 'D3', 'Social'] as DivisionType[]).map((division) => (
                <button
                  key={division}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    activeDivision === division
                      ? 'bg-wrfc-navy text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveDivision(division)}
                >
                  {division} Division
                </button>
              ))}
            </div>

            {/* Simple Records Display */}
            <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">{activeDivision} Division Record</h2>
                <div className="text-4xl font-bold text-wrfc-navy">
                  {records[activeDivision].wins}-{records[activeDivision].losses}
                  {records[activeDivision].draws > 0 ? `-${records[activeDivision].draws}` : ''}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {records[activeDivision].wins} Wins, {records[activeDivision].losses} Losses
                  {records[activeDivision].draws > 0 ? `, ${records[activeDivision].draws} Draws` : ''}
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Modern Table View - Desktop */}
            <div className="hidden lg:block space-y-8">
              {sortedYears.map((year) => (
                <div key={year} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
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
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            Date & Time
                          </th>
                          <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            Matchup
                          </th>
                          <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            {activeView === 'past' ? 'Score' : 'Time'}
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            Venue
                          </th>
                          <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            Competition
                          </th>
                          <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            Actions
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
                              className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                                index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-750'
                              }`}
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
                                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
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
                                        : 'text-gray-600 dark:text-gray-400'
                                    }`}>
                                      {wrfcScore}
                                    </span>
                                    <span className="text-gray-400">-</span>
                                    <span className={`text-lg font-bold ${
                                      wrfcScore !== null && opponentScore !== null && opponentScore > wrfcScore 
                                        ? 'text-green-600 dark:text-green-400'
                                        : wrfcScore !== null && opponentScore !== null && opponentScore < wrfcScore
                                        ? 'text-red-600 dark:text-red-400'
                                        : 'text-gray-600 dark:text-gray-400'
                                    }`}>
                                      {opponentScore}
                                    </span>
                                  </div>
                                ) : (
                                  <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {format(parseISO(`2000-01-01T${game.time}`), 'h:mm a')}
                                  </div>
                                )}
                              </td>

                              {/* Venue */}
                              <td className="px-6 py-4">
                                <div className="flex flex-col">
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {game.venue.name === 'TBD' ? 'Venue TBD' : game.venue.name}
                                  </div>
                                  {game.venue.name !== 'TBD' && (
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                      {game.venue.city}, {game.venue.state}
                                    </div>
                                  )}
                                </div>
                              </td>

                              {/* Competition */}
                              <td className="px-6 py-4 text-center">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                                  {game.competition}
                                </span>
                              </td>

                              {/* Actions */}
                              <td className="px-6 py-4 text-center">
                                <div className="flex items-center justify-center space-x-2">
                                  {game.venue.name !== 'TBD' && (
                                    <a
                                      href={getGoogleMapsUrl(game.venue)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                                      title="Get Directions"
                                    >
                                      <MapPin className="w-4 h-4" />
                                    </a>
                                  )}
                                  {game.ticketsUrl && (
                                    <a
                                      href={game.ticketsUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                                      title="Buy Tickets"
                                    >
                                      <Trophy className="w-4 h-4" />
                                    </a>
                                  )}
                                  {game.broadcastUrl && (
                                    <a
                                      href={game.broadcastUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                                      title="Watch Live"
                                    >
                                      <History className="w-4 h-4" />
                                    </a>
                                  )}
                                </div>
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
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
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
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
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
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
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
                          
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {game.venue.name === 'TBD' ? 'Venue TBD' : `${game.venue.name}, ${game.venue.city}, ${game.venue.state}`}
                          </div>
                          
                          {game.venue.name !== 'TBD' && (
                            <a
                              href={getGoogleMapsUrl(game.venue)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-1 text-blue-600 dark:text-blue-400 text-sm hover:underline"
                            >
                              <MapPin className="w-4 h-4" />
                              <span>Get Directions</span>
                            </a>
                          )}
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