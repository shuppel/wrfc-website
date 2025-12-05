import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Users, CheckCircle, Clock, ListBullets } from '@phosphor-icons/react/dist/ssr';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { generateSEOMetadata } from '@/app/utils/seo';
import { fetchRegisteredTeams, groupTeamsByDivision } from '@/lib/cbt-api';
import { getDivisionOptions } from '@/data/cherry-blossom-tournaments';
import TeamCard from '@/components/feature/tournament/TeamCard';

interface PageProps {
  params: {
    year: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return generateSEOMetadata({
    title: `Registered Teams - Cherry Blossom Tournament ${params.year}`,
    description: `View all registered teams for the ${params.year} Cherry Blossom Rugby Tournament. See confirmed teams, pending registrations, and division standings.`,
    path: `/tournaments/cherry-blossom/${params.year}/teams`,
  });
}

export default async function TeamsPage({ params }: PageProps) {
  const year = parseInt(params.year, 10);
  
  // Fetch teams from Google Sheets
  let teams: Awaited<ReturnType<typeof fetchRegisteredTeams>> = [];
  let error: string | null = null;
  
  try {
    teams = await fetchRegisteredTeams(year);
  } catch (err) {
    console.error('Failed to fetch teams:', err);
    error = 'Failed to load registered teams. Please try again later.';
  }

  const divisions = getDivisionOptions(year);
  const teamsByDivision = groupTeamsByDivision(teams);
  const confirmedCount = teams.filter(t => t.status === 'confirmed' && t.paymentStatus === 'paid').length;
  const pendingCount = teams.filter(t => t.status === 'pending').length;
  const waitlistCount = teams.filter(t => t.status === 'waitlist').length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <BreadcrumbJsonLd 
        items={[
          { name: 'Home', item: '/' },
          { name: 'Tournaments', item: '/tournaments' },
          { name: 'Cherry Blossom', item: '/tournaments/cherry-blossom' },
          { name: `${year}`, item: `/tournaments/cherry-blossom/${year}` },
          { name: 'Teams', item: `/tournaments/cherry-blossom/${year}/teams` },
        ]} 
      />

      {/* Header */}
      <section className="bg-gradient-to-r from-wrfc-navy to-wrfc-red text-white py-16">
        <div className="container mx-auto px-4">
          <Link 
            href="/tournaments/cherry-blossom"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tournament Home
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Registered Teams {year}
          </h1>
          <p className="text-xl text-white/90">
            Cherry Blossom Tournament - Live Registration Status
          </p>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="bg-white dark:bg-gray-800 py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-wrfc-red" />
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Teams</div>
                <div className="text-2xl font-bold">{teams.length}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Confirmed</div>
                <div className="text-2xl font-bold text-green-600">{confirmedCount}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
                <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ListBullets className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Waitlist</div>
                <div className="text-2xl font-bold text-blue-600">{waitlistCount}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16">
        {error ? (
          <Card className="p-8 text-center">
            <div className="text-red-600 dark:text-red-400 mb-4 text-lg font-semibold">
              {error}
            </div>
            <Button asChild variant="outline">
              <Link href="/tournaments/cherry-blossom/register">
                Register Your Team
              </Link>
            </Button>
          </Card>
        ) : teams.length === 0 ? (
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-wrfc-navy dark:text-white">
              No Teams Registered Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Be the first to register your team for the {year} Cherry Blossom Tournament!
            </p>
            <Button asChild className="bg-wrfc-red hover:bg-wrfc-red/90">
              <Link href="/tournaments/cherry-blossom/register">
                Register Your Team
              </Link>
            </Button>
          </Card>
        ) : (
          <>
            {/* Filter by Division */}
            <Tabs defaultValue="all" className="space-y-8">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md">
                <TabsTrigger 
                  value="all" 
                  className="data-[state=active]:bg-wrfc-red data-[state=active]:text-white"
                >
                  All ({teams.length})
                </TabsTrigger>
                {divisions.map((div) => {
                  const count = teamsByDivision[div.value]?.length || 0;
                  return (
                    <TabsTrigger
                      key={div.value}
                      value={div.value}
                      className="data-[state=active]:bg-wrfc-red data-[state=active]:text-white text-xs"
                    >
                      {div.value.split(' ')[0]} ({count})
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {/* All Teams */}
              <TabsContent value="all">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teams.map((team, index) => (
                    <TeamCard key={`${team.teamName}-${index}`} team={team} />
                  ))}
                </div>
              </TabsContent>

              {/* Teams by Division */}
              {divisions.map((div) => {
                const divisionTeams = teamsByDivision[div.value] || [];
                return (
                  <TabsContent key={div.value} value={div.value}>
                    {divisionTeams.length === 0 ? (
                      <Card className="p-8 text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                          No teams registered in {div.value} yet.
                        </p>
                      </Card>
                    ) : (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {divisionTeams.map((team, index) => (
                          <TeamCard key={`${team.teamName}-${index}`} team={team} />
                        ))}
                      </div>
                    )}
                  </TabsContent>
                );
              })}
            </Tabs>

            {/* Call to Action */}
            <div className="mt-12 text-center">
              <Card className="p-8 bg-gradient-to-br from-wrfc-navy to-wrfc-red text-white">
                <h3 className="text-2xl font-bold mb-4">Want to Join?</h3>
                <p className="mb-6 text-white/90">
                  Registration is open for the {year} Cherry Blossom Tournament. 
                  Secure your spot today!
                </p>
                <Button 
                  asChild 
                  className="bg-white text-wrfc-navy hover:bg-gray-100"
                >
                  <Link href="/tournaments/cherry-blossom/register">
                    Register Your Team
                  </Link>
                </Button>
              </Card>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
