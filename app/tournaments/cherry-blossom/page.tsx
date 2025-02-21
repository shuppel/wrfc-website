'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'components/ui/button';
import { Card } from 'components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs';

interface TournamentInfo {
  date: string;
  location: string;
  registrationDeadline: string;
  entryFee: string;
  divisions: string[];
  schedule: {
    time: string;
    event: string;
  }[];
  sponsors: {
    name: string;
    logo: string;
    website: string;
  }[];
}

const tournamentInfo: TournamentInfo = {
  date: 'April 13-14, 2024',
  location: 'National Mall Rugby Fields, Washington DC',
  registrationDeadline: 'March 30, 2024',
  entryFee: '$500 per team',
  divisions: ['Men\'s Premier', 'Men\'s Social', 'Women\'s Premier', 'Women\'s Social'],
  schedule: [
    { time: '8:00 AM', event: 'Team Check-in' },
    { time: '9:00 AM', event: 'Opening Ceremony' },
    { time: '9:30 AM', event: 'Pool Play Begins' },
    { time: '4:00 PM', event: 'Knockout Rounds' },
    { time: '6:00 PM', event: 'Finals' },
    { time: '7:00 PM', event: 'Awards Ceremony' },
  ],
  sponsors: [
    {
      name: 'Local Brewery',
      logo: '/images/sponsors/brewery.png',
      website: 'https://example.com'
    },
    // Add more sponsors
  ]
};

export default function CherryBlossomTournament() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cherry-blossom.jpg"
            alt="Cherry Blossom Rugby Tournament"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Cherry Blossom Rugby Tournament
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            {tournamentInfo.date} • Washington, DC
          </p>
          <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
            Register Now
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="registration">Registration</TabsTrigger>
            <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card className="p-6">
              <h2 className="text-3xl font-bold mb-6">Tournament Overview</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Event Details</h3>
                  <ul className="space-y-3">
                    <li><strong>Date:</strong> {tournamentInfo.date}</li>
                    <li><strong>Location:</strong> {tournamentInfo.location}</li>
                    <li><strong>Registration Deadline:</strong> {tournamentInfo.registrationDeadline}</li>
                    <li><strong>Entry Fee:</strong> {tournamentInfo.entryFee}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Divisions</h3>
                  <ul className="space-y-2">
                    {tournamentInfo.divisions.map((division) => (
                      <li key={division} className="flex items-center">
                        <span className="w-2 h-2 bg-pink-500 rounded-full mr-2" />
                        {division}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card className="p-6">
              <h2 className="text-3xl font-bold mb-6">Tournament Schedule</h2>
              <div className="space-y-4">
                {tournamentInfo.schedule.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="w-24 font-semibold">{item.time}</div>
                    <div>{item.event}</div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="registration">
            <Card className="p-6">
              <h2 className="text-3xl font-bold mb-6">Registration Information</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Entry Requirements</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>USA Rugby CIPP Registration for all players</li>
                    <li>Completed team roster</li>
                    <li>Payment of tournament fee</li>
                    <li>Signed liability waivers</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">How to Register</h3>
                  <p className="mb-4">
                    Complete the registration process through our online portal. Early bird
                    registration ends March 1st, 2024.
                  </p>
                  <Button size="lg">Start Registration</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="sponsors">
            <Card className="p-6">
              <h2 className="text-3xl font-bold mb-6">Our Sponsors</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {tournamentInfo.sponsors.map((sponsor) => (
                  <Link
                    key={sponsor.name}
                    href={sponsor.website}
                    target="_blank"
                    className="group"
                  >
                    <div className="aspect-square relative border rounded-lg p-4 hover:shadow-lg transition-shadow">
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                    <p className="text-center mt-2 group-hover:text-pink-600">
                      {sponsor.name}
                    </p>
                  </Link>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 