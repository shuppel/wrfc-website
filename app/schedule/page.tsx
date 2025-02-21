'use client';

import { useState } from 'react';
import Image from 'next/image';
import { format, parseISO, isPast } from 'date-fns';
import { Game, SAMPLE_DATA, getGoogleMapsUrl } from '@/types/game';
import { getLogoForTeam } from '@/utils/logoHelper';
import { MapPin, Trophy, History } from 'lucide-react';

export default function Schedule() {
  const [activeTab, setActiveTab] = useState('upcoming');

  // Filter and sort games based on the active tab
  const games = SAMPLE_DATA.games
    .filter(game => {
      const gameDate = parseISO(game.date);
      const now = new Date();
      return activeTab === 'upcoming' 
        ? gameDate >= now 
        : gameDate < now;
    })
    .sort((a, b) => {
      const dateA = parseISO(a.date);
      const dateB = parseISO(b.date);
      return activeTab === 'upcoming' 
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });

  function formatGameDateTime(game: Game) {
    const date = format(parseISO(game.date), 'MMM d, yyyy').toUpperCase();
    const time = format(parseISO(`2000-01-01T${game.time}`), 'h:mm a');
    return `${date} | ${time}`;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="hero-title text-center mb-8">
        2025 SCHEDULE
      </h1>

      {/* Tab Navigation */}
      <div className="flex justify-center gap-8 mb-12">
        <button
          className={`button-text pb-2 border-b-4 transition-colors ${
            activeTab === 'upcoming'
              ? 'text-wrfc-red border-wrfc-red'
              : 'text-gray-400 border-transparent hover:text-wrfc-red hover:border-wrfc-red'
          }`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming Games
        </button>
        <button
          className={`button-text pb-2 border-b-4 transition-colors ${
            activeTab === 'past'
              ? 'text-wrfc-red border-wrfc-red'
              : 'text-gray-400 border-transparent hover:text-wrfc-red hover:border-wrfc-red'
          }`}
          onClick={() => setActiveTab('past')}
        >
          Past Game Results
        </button>
      </div>

      {/* Game Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
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
            <div className="text-center p-4 border-t border-gray-200">
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
    </div>
  );
} 