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

  function formatGameDateTime(game: Game) {
    const date = format(parseISO(game.date), 'MMM d, yyyy').toUpperCase();
    const time = format(parseISO(`2000-01-01T${game.time}`), 'h:mm a');
    return `${date} | ${time}`;
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="container mx-auto">
        <h1 className="hero-title text-center mb-8">
          2025 SCHEDULE
        </h1>

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
          /* Game Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game) => (
              <div
                key={game.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                {/* Competition Level */}
                <div className="bg-wrfc-navy text-white py-2 px-4 flex items-center justify-center gap-2">
                  <Trophy className="w-4 h-4" />
                  <span className="competition-level">{game.competition}</span>
                </div>

                {/* Past Game Status */}
                {isPast(parseISO(game.date)) && (
                  <div className="bg-wrfc-red text-white py-1 px-4 flex items-center justify-center gap-2">
                    <History className="w-4 h-4" />
                    <span className="accent-text">Past Game</span>
                  </div>
                )}

                {/* Teams Section */}
                <div className="p-6 flex items-center justify-between">
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-20 h-20 relative mb-2">
                      <Image
                        src={getLogoForTeam(game.homeTeam.name, game.homeTeam.logo)}
                        alt={game.homeTeam.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="team-name text-center">
                      {game.homeTeam.shortName || game.homeTeam.name}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-center px-4">
                    {game.result ? (
                      <div className="flex items-center space-x-3">
                        <span className="score-box text-3xl md:text-4xl">
                          {game.result.homeScore}
                        </span>
                        <span className="text-gray-400 font-accent">-</span>
                        <span className="score-box text-3xl md:text-4xl">
                          {game.result.awayScore}
                        </span>
                      </div>
                    ) : (
                      <span className="display-medium text-wrfc-navy">VS</span>
                    )}
                  </div>

                  <div className="flex flex-col items-center flex-1">
                    <div className="w-20 h-20 relative mb-2">
                      <Image
                        src={getLogoForTeam(game.awayTeam.name, game.awayTeam.logo)}
                        alt={game.awayTeam.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="team-name text-center">
                      {game.awayTeam.shortName || game.awayTeam.name}
                    </span>
                  </div>
                </div>

                {/* Game Info */}
                <div className="text-center p-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="section-title mb-2">
                    {game.isHome ? 'Home' : 'Away'} vs. {game.isHome ? game.awayTeam.shortName : game.homeTeam.shortName}
                  </h3>
                  <p className="date-display mb-2">
                    {formatGameDateTime(game)}
                  </p>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-wrfc-red" />
                    <p className="accent-text text-wrfc-red uppercase">
                      {game.venue.name === 'TBD' ? (
                        <span className="text-gray-500">Venue TBD</span>
                      ) : (
                        <>
                          {game.venue.name}
                          <span className="block text-sm font-normal">
                            {game.venue.city}, {game.venue.state}
                          </span>
                        </>
                      )}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  {game.venue.name !== 'TBD' && (
                    <div className="flex justify-center">
                      <a
                        href={getGoogleMapsUrl(game.venue)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button-text flex items-center gap-2 bg-wrfc-navy text-white px-6 py-2 rounded hover:bg-blue-900 transition-colors"
                      >
                        <MapPin className="w-5 h-5" />
                        GET DIRECTIONS
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 