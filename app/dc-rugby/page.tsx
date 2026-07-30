import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Trophy, Users, ArrowRight, MapPin, Clock, Star } from '@phosphor-icons/react/dist/ssr'
import { generateSEOMetadata } from '../utils/seo'
import JsonLd, { FAQPageJsonLd } from '../../components/JsonLd'

// Generate metadata for the DC Rugby page
export const metadata = generateSEOMetadata({
  title: 'Playing Rugby in DC | Washington Rugby Football Club',
  description: 'A straight answer to how adult rugby works in Washington, DC: which clubs exist, what WRFC offers, how the season runs across fall 15s, winter, spring 15s and summer 7s, what it costs, and what your first practice is like. No experience required.',
  path: '/dc-rugby'
});

// Visible copy and FAQPage schema are generated from the same source so they
// can never drift apart.
const faqs = [
  {
    question: 'Which rugby clubs are there in Washington, DC?',
    answer:
      'The DC area has several adult rugby clubs, and which one suits you depends on what you want. Washington Rugby Football Club (WRFC) is the oldest, founded in 1963, and fields Division 1, Division 3 and social men\'s sides. Other clubs in the area include Washington Irish, Potomac Athletic Club, NOVA and Baltimore-area sides, plus Old Glory DC, the region\'s professional Major League Rugby team. If you want a men\'s club that takes complete beginners and also has a competitive D1 side, WRFC is a reasonable first call. If you want women\'s rugby, the DC Furies and NOVA Women are the established options and we are happy to point you there.'
  },
  {
    question: 'What makes WRFC different from other DC rugby clubs?',
    answer:
      'Three things we can point to rather than assert. First, longevity: WRFC was founded in February 1963 and is the oldest rugby club in the District, a founding member of the USA Rugby Super League in 1997. Second, coaching: Head Coach Thretton Palamo was capped by the USA Eagles at 19 and held the record as the youngest player ever capped by the United States for years afterwards, and Lead Assistant Coach Jamason Fa\'anana-Schultz has captained the USA Eagles in test matches within the past three years and captained Old Glory DC in Major League Rugby. Third, community roots: WRFC founded Washington DC Youth Rugby in 2004, which now runs free programmes for over 100 children across all four quadrants of the city.'
  },
  {
    question: 'Do I need experience to play rugby in DC?',
    answer:
      'No. A large share of WRFC players had never played rugby before joining, many having come from American football, soccer, wrestling, basketball or no sport at all. New players are taught contact technique and the laws of the game from scratch before playing a match, and the club fields social and Division 3 sides specifically so beginners have somewhere to play competitively rather than sitting on a bench.'
  },
  {
    question: 'Where and when does WRFC train?',
    answer:
      'There is no single fixed time and place year-round. The general pattern is practice on Tuesday and Thursday evenings with matches on Saturdays, at fields around Washington, DC. The year runs in four blocks: a fall 15s season, winter workouts, a spring 15s season, and 7s through the summer. Venues and times move with the season, so check the practice schedule page or email welcome@washingtonrugby.org before heading out. Trainers and shorts are enough for a first session.'
  },
  {
    question: 'How do I join WRFC?',
    answer:
      'Fill in the membership form on this site or email welcome@washingtonrugby.org, and someone will tell you when and where the next session is. Because practice locations move through the season, checking in first beats turning up cold. Dues are paid once you decide to stick around, and the club will talk through options if cost is a barrier.'
  },
  {
    question: 'Who does WRFC play, and how often?',
    answer:
      'WRFC plays regional club sides from across the Mid-Atlantic and the wider East Coast, generally on Saturdays. The calendar runs as a fall 15s season, winter workouts, a spring 15s season, and 7s over the summer, which works out to roughly 30 matches between the sides. WRFC also hosts the Cherry Blossom Tournament each spring and runs an annual overseas tour.'
  },
  {
    question: 'Is WRFC a social club or a competitive one?',
    answer:
      'Both, deliberately. The Division 1 side trains and selects competitively; the Division 3 and social sides exist so that players who want the game without the commitment level of D1 still get regular minutes. Most members move between them over a season. Off the pitch the club runs socials, an end-of-season banquet, the 30 Under 30 fixture, and an annual tour, and players volunteer with Washington DC Youth Rugby.'
  }
];

export default function DCRugbyPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SportsOrganization',
    name: 'Washington Rugby Football Club',
    alternateName: 'WRFC',
    description: 'The oldest rugby club in Washington, DC, founded in February 1963. Men\'s D1, D3 and social sides, coached by USA Eagles internationals.',
    foundingDate: '1963',
    sport: {
      '@type': 'Sport',
      name: 'Rugby Union'
    },
    location: {
      '@type': 'Place',
      name: 'Washington, DC',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Washington',
        addressRegion: 'DC',
        addressCountry: 'US'
      }
    },
    url: 'https://washingtonrugby.org',
    sameAs: [
      'https://www.facebook.com/WashingtonRugbyFootballClub/',
      'https://www.instagram.com/wrfc1963/',
      'https://twitter.com/WRFC_DC'
    ]
  };

  return (
    <div className="flex flex-col w-full">
      {/* Structured Data */}
      <JsonLd type="Organization" data={structuredData} />
      <FAQPageJsonLd items={faqs} />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/pictures/huddle_2025_irish.jpg"
            alt="DC Rugby Team - WRFC Huddle"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/95 via-blue-900/85 to-black/90" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="relative w-32 h-32">
                <Image
                  src="/logos/wrfc_logo.png"
                  alt="DC Rugby Club Logo - WRFC"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold  mb-6 animate-fade-in">
              Playing Rugby
              <span className="block text-wrfc-red">in Washington, DC</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-quantico opacity-90">
              Washington Rugby Football Club — founded 1963, the District&apos;s oldest rugby club
              <span className="block text-lg mt-2 text-gray-300">Practice Tuesdays &amp; Thursdays, matches Saturdays. Fall and spring 15s, winter workouts, summer 7s. No experience required.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/membership" 
                className="bg-wrfc-red hover:bg-wrfc-red/90 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 hover:shadow-lg flex items-center justify-center group"
              >
                Join DC Rugby
                <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/schedule" 
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 hover:shadow-lg"
              >
                View DC Rugby Schedule
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose DC Rugby with WRFC */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 ">
            What WRFC Actually Offers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <DCRugbyFeature
              icon={<Trophy className="w-12 h-12 text-wrfc-red" />}
              title="Coaching from Internationals"
              description="Thretton Palamo was capped by the USA at 19 and was for years the youngest player ever capped by the United States. Jamason Fa'anana-Schultz has captained the USA Eagles in test matches within the past three years and captained Old Glory DC."
              stats="2 USA Eagles Internationals on Staff"
            />
            <DCRugbyFeature
              icon={<Users className="w-12 h-12 text-wrfc-navy" />}
              title="Roots in the City"
              description="WRFC founded Washington DC Youth Rugby in 2004. It started with 7 kids and now runs free programmes for over 100 children across all four DC quadrants."
              stats="Founded DC Youth Rugby, 2004"
            />
            <DCRugbyFeature
              icon={<Calendar className="w-12 h-12 text-wrfc-teal" />}
              title="A Side for Your Level"
              description="D1 for players chasing competitive rugby, D3 and social sides for everyone else. Beginners get real minutes rather than a seat on the bench."
              stats="D1, D3 & Social Sides"
            />
          </div>
        </div>
      </section>

      {/* DC Rugby Training & Location */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 ">
                DC Rugby Training & Practice
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-wrfc-red mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Fields Around the District</h3>
                    <p className="text-gray-600 dark:text-gray-100">
                      WRFC uses several grounds around Washington, DC rather than one home pitch. Check the practice schedule for where the next session is.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-wrfc-navy mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Tuesdays &amp; Thursdays, Games Saturdays</h3>
                    <p className="text-gray-600 dark:text-gray-100">
                      Evening practices twice a week so they are reachable after work, with matches at the weekend. Exact times shift by season.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Star className="w-6 h-6 text-wrfc-teal mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Rugby All Four Seasons</h3>
                    <p className="text-gray-600 dark:text-gray-100">
                      Fall 15s, winter workouts, spring 15s and summer 7s. There is somewhere to turn up whatever month you find us.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link 
                  href="/schedule/practice"
                  className="bg-wrfc-red hover:bg-wrfc-red/90 text-white px-6 py-3 rounded-lg font-bold transition-all inline-flex items-center"
                >
                  View DC Rugby Practice Schedule
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/assets/pictures/team_practice.jpg"
                alt="DC Rugby Training - WRFC Practice Session"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* DC Rugby FAQ */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 ">
            Common Questions About Rugby in DC
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {faqs.map((faq) => (
              <DCRugbyFAQ key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/pictures/2025_irish_ruck.jpg"
            alt="DC Rugby Action - WRFC Match"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-wrfc-navy/95 to-wrfc-navy/90" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6  text-white">
            Come Down to a Practice
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-200">
            Practices run Tuesday and Thursday evenings, with matches on Saturdays. Get in touch and
            we will tell you where the next one is — trainers and shorts are enough for a first session.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/membership"
              className="bg-wrfc-red hover:bg-wrfc-red/90 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 hover:shadow-lg inline-flex items-center justify-center"
            >
              Join DC Rugby Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              href="/contact"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 hover:shadow-lg"
            >
              Contact DC Rugby Club
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function DCRugbyFeature({ icon, title, description, stats }: { 
  icon: React.ReactNode
  title: string
  description: string
  stats: string
}) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 dark:bg-gray-900 rounded-full p-6">
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-4 ">{title}</h3>
      <p className="text-gray-600 dark:text-gray-100 mb-4">{description}</p>
      <div className="text-wrfc-red font-bold text-lg">{stats}</div>
    </div>
  )
}

function DCRugbyFAQ({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
      <h3 className="text-xl font-bold mb-4 text-wrfc-navy dark:text-wrfc-red">{question}</h3>
      <p className="text-gray-600 dark:text-gray-100 leading-relaxed">{answer}</p>
    </div>
  )
}