'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Calendar, MapPin, Trophy, Users, ArrowLeft, Clock, CheckCircle, Ticket } from '@phosphor-icons/react';
import TournamentRegistration from '@/components/feature/tournament/TournamentRegistration';
import { getTournamentByYear, getHistoricalTournaments } from '@/data/cherry-blossom-tournaments';
import { ZEFFY_LINKS } from '@/data/zeffy-links';

export default function CherryBlossomYearPage({ params }: { params: { year: string } }) {
  const yearNum = parseInt(params.year);
  const tournament = getTournamentByYear(yearNum);
  const historicalTournaments = getHistoricalTournaments();
  const lastTournament = historicalTournaments[0];
  
  // Default data for 2026 if not found
  const tournamentData = tournament || {
    year: 2026,
    edition: 58,
    date: 'April 11, 2026',
    datePending: false,
    status: 'upcoming' as const,
    location: {
      name: 'The Fields at RFK',
      address: 'Washington, DC'
    },
    divisions: [
      { name: 'Club 15s', description: 'Men\'s & Women\'s Club teams', fee: 485, format: '15s' as const, maxTeams: 12 },
      { name: 'College 15s', description: 'Men\'s & Women\'s College teams', fee: 450, format: '15s' as const, maxTeams: 12 },
      { name: 'High School 15s', description: 'Men\'s & Women\'s High School teams', fee: 485, format: '15s' as const, maxTeams: 8 },
      { name: 'Two Teams Bundle', description: 'Register two sides at a discount', fee: 650, format: '15s' as const, maxTeams: 8 }
    ],
    registrationOpen: true,
    registrationOpens: 'December 1, 2025',
    registrationCloses: 'April 1, 2026',
    paymentDeadlineDays: 14,
    highlights: ['58th Annual Cherry Blossom Tournament', 'We\'re back in DC at The Fields at RFK!', 'Premier East Coast spring rugby event']
  };

  const isBackInDC = yearNum === 2026;

  const coverImage = '/assets/pictures/2025_irish_ruck.jpg';

  // For upcoming tournaments, show registered teams (currently empty)
  // For past tournaments, show results
  const registeredTeamsByCategory = {
    'Men\'s Club': [] as string[],
    'Women\'s Club': [] as string[],
    'Men\'s College': [] as string[],
    'Women\'s College': [] as string[],
    'High School': [] as string[],
  };

  const previousYearData = {
    teamsByCategory: {
      'Men\'s Club': ['Washington Irish', 'New York Reds', 'White Plains', 'Cincinnati RFC', 'NoVA'],
      'Women\'s Club': [],
      'Men\'s College': ['Mount Saint Marys', 'Kutztown', 'St. Bonnaventure'],
      'Women\'s College': [],
      'High School': ['Marysville', 'Old Breed'],
    },
    totalTeams: 31,
    results: [
      { division: 'Senior Men\'s 15s', champion: 'White Plains', runnerUp: 'New York Reds' },
      { division: 'Collegiate Men\'s 7s', champion: 'Kutztown', runnerUp: 'St. Bonnaventure' }
    ]
  };

  const isUpcoming = tournamentData.status === 'upcoming';
  const registrationLink = ZEFFY_LINKS.cherryBlossom.registration;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={coverImage}
            alt={`Cherry Blossom Tournament ${params.year}`}
            fill
            className="object-cover brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          {isBackInDC && (
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-wrfc-navy to-blue-700 text-white px-6 py-2 rounded-full text-sm font-bold mb-4 animate-pulse">
              <MapPin className="w-4 h-4" />
              We&apos;re Back in DC!
            </div>
          )}
          {isUpcoming && (
            <div className="inline-flex items-center gap-2 bg-wrfc-red/90 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 ml-2">
              <CheckCircle className="w-4 h-4" />
              Registration Now Open
            </div>
          )}
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Cherry Blossom Tournament
          </h1>
          <p className="text-xl md:text-3xl mb-2 font-quantico">
            {tournamentData.edition ? `${getOrdinalSuffix(tournamentData.edition)} Annual` : ''} {params.year} Edition
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-8 text-lg">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{tournamentData.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{tournamentData.location.name}</span>
            </div>
          </div>
          {isUpcoming && tournamentData.registrationOpen && (
            <a
              href={registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-wrfc-red hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <Ticket className="w-5 h-5" />
              Register Your Team Now
            </a>
          )}
        </div>
      </section>

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/tournaments" className="flex items-center text-gray-600 dark:text-gray-100 hover:text-wrfc-navy dark:hover:text-blue-400">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Tournaments
            </Link>
            <div className="flex items-center space-x-6">
              <Link 
                href={`/tournaments/cherry-blossom/${params.year}`}
                className="text-gray-600 dark:text-gray-100 hover:text-wrfc-navy dark:hover:text-blue-400"
              >
                Overview
              </Link>
              <Link 
                href={`/tournaments/cherry-blossom/${params.year}/photos`}
                className="text-gray-600 dark:text-gray-100 hover:text-wrfc-navy dark:hover:text-blue-400"
              >
                Photos
              </Link>
              <Link 
                href="#past-results"
                className="text-gray-600 dark:text-gray-100 hover:text-wrfc-navy dark:hover:text-blue-400"
              >
                Past Results
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Registration CTA Banner */}
      {isUpcoming && tournamentData.registrationOpen && (
        <div className="bg-gradient-to-r from-wrfc-navy to-blue-800 text-white py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Clock className="w-6 h-6 text-yellow-400" />
                <div>
                  <p className="font-semibold">Early Bird Registration Open!</p>
                  <p className="text-sm text-blue-200">Registration closes {tournamentData.registrationCloses}</p>
                </div>
              </div>
              <a
                href={registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-wrfc-red hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Register Now
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Tournament Highlights */}
        {tournamentData.highlights && tournamentData.highlights.length > 0 && (
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {tournamentData.highlights.map((highlight, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                  <CheckCircle className="w-6 h-6 text-wrfc-red mx-auto mb-2" />
                  <p className="text-sm font-medium">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Tournament Details Card */}
          <Card className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-wrfc-navy dark:text-blue-400">
              Tournament Details
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Calendar className="w-6 h-6 text-wrfc-red shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">Date</h3>
                  <p>{tournamentData.date}</p>
                  {tournamentData.registrationCloses && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Registration closes: {tournamentData.registrationCloses}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-wrfc-red shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">Location</h3>
                  <p>{tournamentData.location.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-100">
                    {tournamentData.location.address}
                  </p>
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(tournamentData.location.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-wrfc-red hover:underline mt-1 inline-block"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="w-6 h-6 text-wrfc-red shrink-0" />
                <div className="w-full">
                  <h3 className="font-bold mb-2">Divisions & Entry Fees</h3>
                  <div className="space-y-3">
                    {tournamentData.divisions.map((division) => (
                      <div key={division.name} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-wrfc-red rounded-full mr-2" />
                          <div>
                            <span className="font-medium">{division.name}</span>
                            {division.description && (
                              <p className="text-xs text-gray-500">{division.description}</p>
                            )}
                          </div>
                        </div>
                        <span className="font-semibold">${division.fee}</span>
                      </div>
                    ))}
                  </div>
                  {isUpcoming && tournamentData.registrationOpen && (
                    <div className="mt-8">
                      <TournamentRegistration 
                        divisions={tournamentData.divisions.map(d => ({
                          name: d.name,
                          description: d.description,
                          fee: d.fee
                        }))} 
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Registered Teams Card (for upcoming) or Past Results Card (for past) */}
          <Card className="p-8" id="past-results">
            <h2 className="text-3xl font-bold mb-6 text-wrfc-navy dark:text-blue-400">
              {isUpcoming ? 'Registered Teams' : (lastTournament ? `${lastTournament.year} Results` : 'Past Results')}
            </h2>
            <div className="space-y-6">
              {/* Show results only for past tournaments */}
              {!isUpcoming && previousYearData.results.map((result) => (
                <div key={result.division} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <h3 className="font-bold mb-2">{result.division}</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <span className="font-semibold">Champion:</span>
                      <span>{result.champion}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4" />
                      <span className="font-semibold">Runner-up:</span>
                      <span>{result.runnerUp}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div>
                {!isUpcoming && <h3 className="font-bold mb-3">Participating Teams</h3>}
                <div className="space-y-4">
                  {Object.entries(isUpcoming ? registeredTeamsByCategory : previousYearData.teamsByCategory).map(([category, teams]) => (
                    <div key={category}>
                      <h4 className="text-sm font-semibold text-wrfc-red mb-2">{category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {teams.length > 0 ? (
                          teams.map((team) => (
                            <span 
                              key={team} 
                              className="inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-sm"
                            >
                              {team}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500 italic">No teams registered yet</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Final CTA */}
        {isUpcoming && tournamentData.registrationOpen && (
          <div className="mt-16 bg-gradient-to-r from-wrfc-red to-red-700 rounded-xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Compete?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Don&apos;t miss your chance to be part of the {tournamentData.edition ? `${getOrdinalSuffix(tournamentData.edition)} Annual` : ''} Cherry Blossom Tournament. 
              Register your team today!
            </p>
            <a
              href={registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-wrfc-red hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105"
            >
              <Ticket className="w-5 h-5" />
              Register Now - Starting at $450
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function getOrdinalSuffix(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
