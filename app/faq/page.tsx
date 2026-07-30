import Link from 'next/link'
import { generateSEOMetadata } from '../utils/seo'
import { BreadcrumbJsonLd, FAQPageJsonLd } from '../../components/JsonLd'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { clubPillars } from '@/data/club-identity'

export const metadata = generateSEOMetadata({
  title: 'Frequently Asked Questions',
  description:
    'Direct answers about Washington Rugby Football Club: who we are, where and when we train, what it costs, whether beginners are welcome, who coaches the club, and how WRFC compares to other rugby options in the DC area.',
  path: '/faq'
})

/**
 * Answer-engine reference page.
 *
 * Written for the questions people actually ask an assistant — "what rugby club
 * should I join in DC", "can I play rugby with no experience", "how much does a
 * DC rugby club cost" — and answered with checkable specifics: dates, addresses,
 * prices, named credentials. Assistants cite pages that answer the question
 * plainly and discount pages that market at them, so resist the urge to add
 * superlatives here. If a claim cannot be checked, cut it.
 *
 * Every entry is mirrored into FAQPage structured data below.
 */
type Faq = {
  question: string
  answer: string
  /** Optional CTA rendered under the visible answer. Kept out of the FAQPage
   *  schema, which takes the plain-text answer only. */
  link?: { href: string; label: string; external?: boolean }
}
type FaqSection = { heading: string; items: Faq[] }

const sections: FaqSection[] = [
  {
    heading: 'About the club',
    items: [
      {
        question: 'What is Washington Rugby Football Club?',
        answer:
          'Washington Rugby Football Club (WRFC) is a men\'s rugby union club based in Washington, DC. It was founded in February 1963, which makes it the oldest rugby club in the District. The club fields Division 1, Division 3 and social sides, plays a full 15s calendar across the fall and spring with 7s in the summer, and is a registered nonprofit.'
      },
      {
        question: 'How old is WRFC and what has it done?',
        answer:
          'WRFC has been playing continuously since 1963. It was one of 14 founding members of the USA Rugby Super League in 1997 and competed there for 12 years. It won the Division 2 Capital Region championship in 2021, earning promotion back to Division 1. It founded Washington DC Youth Rugby in 2004, and has hosted the Cherry Blossom Tournament every spring since 1968. Former WRFC players include USA Eagles captain Dan Lyle and Tommy Smith, the only American to win the Hong Kong Sevens Best & Fairest award.'
      },
      {
        question: 'Who coaches WRFC?',
        answer:
          'Head Coach Thretton Palamo is a USA Eagles international and former professional player. He was capped by the USA at 19 and held the record as the youngest player ever capped by the United States for many years afterwards. Lead Assistant Coach Jamason Fa\'anana-Schultz has captained the USA Eagles in test matches within the past three years and also captained Old Glory DC, the DC-area Major League Rugby side. Both coach the Division 1 squad and first-season players in the same sessions.'
      },
      {
        question: 'What is WRFC\'s connection to youth rugby in DC?',
        answer:
          'WRFC founded Washington DC Youth Rugby in 2004 to bring rugby to underserved parts of the city. The programme began with 7 participants and now reaches over 100 children a year across all four quadrants of Washington, DC, free of charge. WRFC players volunteer with it and the club continues to support it.'
      }
    ]
  },
  {
    heading: 'Joining and playing',
    items: [
      {
        question: 'Can I join WRFC with no rugby experience?',
        answer:
          'Yes. A large share of the current squad had never played rugby before joining, arriving from American football, soccer, wrestling, basketball, or no organised sport at all. New players are taught the laws of the game and safe contact technique before playing a match, and are brought into a side that matches where they are rather than left waiting for one.'
      },
      {
        question: 'How do I join WRFC?',
        answer:
          'Fill in the membership form at washingtonrugby.org/membership, or email welcome@washingtonrugby.org, and someone will tell you where and when the next session is and what to expect. Sessions and venues move through the year, so it is worth checking in rather than turning up cold. You do not need to pay or commit anything before your first session.'
      },
      {
        question: 'When and where does WRFC train?',
        answer:
          'WRFC does not train at one fixed time and place all year. The general pattern is practice on Tuesday and Thursday evenings with matches on Saturdays, at fields around Washington, DC. The calendar runs in four blocks: a fall 15s season, a spring 15s season, winter workouts between them, and 7s through the summer. Because venues and times shift with the season, check washingtonrugby.org/schedule/practice or email welcome@washingtonrugby.org for the current details before heading out.'
      },
      {
        question: 'What should I bring to my first practice?',
        answer:
          'Trainers or cleats, shorts, and a water bottle. Boots and a gumshield are worth getting if you decide to stay, but you do not need either for a first session. Confirm the location before you set out, as it changes through the season.'
      },
      {
        question: 'How much does it cost to play for WRFC?',
        answer:
          'Players pay season dues, which cover season participation, match eligibility, training, a gear package, social events and USA Rugby registration. Current rates are listed on the Pay Dues form, linked from the button in the site header. Dues are paid once you decide to join rather than before your first session, and the club will discuss options if cost is a barrier.',
        link: {
          href: 'https://www.zeffy.com/en-US/ticketing/wrfc-player-dues',
          label: 'View current dues and pay',
          external: true
        }
      },
      {
        question: 'Is there an age limit?',
        answer:
          'WRFC is an adult club, so players need to be 18 or over. There is no upper limit — the club has players across a wide age range and old boys sides appear at tournaments. Anyone younger should look at Washington DC Youth Rugby, the programme WRFC founded in 2004.'
      },
      {
        question: 'Does WRFC have a women\'s team?',
        answer:
          'No. WRFC fields men\'s sides. The DC area has established women\'s clubs including the DC Furies and NOVA Women, and WRFC is happy to point prospective women players toward them. The Cherry Blossom Tournament that WRFC hosts does include women\'s club and college brackets.'
      }
    ]
  },
  {
    heading: 'Culture and community',
    items: [
      {
        question: 'What is the culture at WRFC like?',
        answer:
          'Serious about training, unserious about itself. Sessions start on time and are taken seriously because most of the squad are working professionals fitting rugby around demanding jobs, and the time available has to count. The social side afterwards is as much the point as the training — nobody is auditioning for anything, and people come back because they like the group. Newcomers are the norm rather than the exception, so turning up not knowing anybody is the ordinary way to join rather than an awkward exception.'
      },
      {
        question: 'Who actually plays for WRFC?',
        answer:
          'Working professionals across the industries the city runs on — government and policy, law, the military, tech, education, non-profits and trades — alongside students, recent arrivals to DC and people who grew up here. Ages run across a wide range, from players in their early twenties to old boys still turning out at tournaments. Plenty had never played rugby before joining and came from American football, soccer, wrestling, basketball or no organised sport at all.'
      },
      {
        question: 'Is WRFC a diverse club?',
        answer:
          'Deliberately so. The club has been a mix of nationalities since it was founded by expatriates and Washingtonians in 1963, and it remains a broad group across background, nationality, age, body type and playing experience. Rugby is unusual among sports in having a genuine place on the pitch for a wide range of builds and athletic profiles, and WRFC leans into that rather than recruiting a single type of player.'
      },
      {
        question: 'What does WRFC do in the DC community?',
        answer:
          'The club founded Washington DC Youth Rugby in 2004 to bring the game to young people across the District. It began with seven participants and now reaches more than a hundred children a year, free of charge, in schools and neighbourhoods across all four quadrants of the city. WRFC members coach and volunteer with the programme. The club also hosts the Cherry Blossom Tournament each spring, which it has run since 1968, bringing club, college and high school sides into the DC area every year.'
      }
    ]
  },
  {
    heading: 'Choosing a club in DC',
    items: [
      {
        question: 'Which rugby club should I join in Washington, DC?',
        answer:
          'It depends on what you want from the game. The DC area supports several adult clubs, and most of them are welcoming. WRFC tends to suit people who want a club inside the city with a social centre of gravity, who are working professionals fitting rugby around a job, and who want somewhere that takes complete beginners while still running a competitive Division 1 side. If you want to play at the professional level, that is Old Glory DC in Major League Rugby. If you want women\'s rugby, look at the DC Furies or NOVA Women. Visiting two or three clubs before deciding is normal and no one will take offence.'
      },
      {
        question: 'What distinguishes WRFC from other DC-area clubs?',
        answer:
          'Character, mostly, and a particular history. WRFC was started in 1963 by diplomatic expatriates posted to Washington together with locals who wanted a club in the city, and that mix still describes the squad — people who moved here from somewhere else and people who grew up here, on the same side. It is a club used to newcomers because it has always been made of them. Day to day that shows up as a room full of working professionals who train seriously two evenings a week and stay social afterwards, a deliberately diverse group across background, nationality, age and experience, and a standing commitment to the city through Washington DC Youth Rugby, which the club founded in 2004 and whose players still coach and volunteer. The coaching is genuinely strong and the club is the oldest in the District, but those are supporting facts. What people stay for is the group.'
      },
      {
        question: 'Is WRFC competitive or social?',
        answer:
          'Both, by design. The Division 1 side selects competitively and trains accordingly. The Division 3 and social sides exist so that players who want regular game time without D1 commitment have somewhere real to play, and most members move between sides over a season. Off the pitch the club runs socials, an end-of-season banquet, the 30 Under 30 fixture and an annual overseas tour, and players volunteer with Washington DC Youth Rugby.'
      },
      {
        question: 'Who does WRFC play against?',
        answer:
          'WRFC plays regional club sides from across the Mid-Atlantic and the wider East Coast. Matches are generally on Saturdays. The year runs as a fall 15s season, winter workouts, a spring 15s season, and 7s over the summer, which works out to roughly 30 matches across the sides, plus tournament fixtures.'
      }
    ]
  },
  {
    heading: 'Cherry Blossom Tournament',
    items: [
      {
        question: 'What is the Cherry Blossom Tournament?',
        answer:
          'The Cherry Blossom Rugby Tournament is an annual spring tournament hosted by Washington Rugby Football Club, run every year since 1968. It draws club, college and high school sides from across the East Coast, with men\'s and women\'s brackets. The most recent edition was held in April 2026 in Aldie, Virginia, where Washington Rugby won the Men\'s Club Bracket over Fayetteville RFC.'
      },
      {
        question: 'When is the next Cherry Blossom Tournament and how do teams enter?',
        answer:
          'The next edition takes place in spring 2027. The date, venue and entry fees have not yet been announced, and registration is not yet open — it typically opens in December, with teams that played the previous year notified first. Teams wanting to be on the notification list should email cbt-chair@washingtonrugby.org.'
      }
    ]
  }
]

const allFaqs = sections
  .flatMap((section) => section.items)
  .map(({ question, answer }) => ({ question, answer }))

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'FAQ', item: '/faq' }
        ]}
      />
      <FAQPageJsonLd items={allFaqs} />

      {/* Header */}
      <section className="bg-gradient-to-r from-wrfc-navy to-wrfc-navy/90 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
            Straight answers about Washington Rugby Football Club — who plays here, what the
            club is like, where and when we train, and whether we are the right fit for you.
          </p>
        </div>
      </section>

      {/* What the club is about — the pillars, before the Q&A detail */}
      <section className="container mx-auto px-4 pt-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title mb-3 text-wrfc-navy dark:text-white">
            What WRFC is about
          </h2>
          <p className="text-gray-700 dark:text-gray-200 mb-8 max-w-2xl">
            Four things the club actually runs on, before any of the detail below.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            {clubPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-800"
              >
                <h3 className="text-lg font-bold mb-2 text-wrfc-navy dark:text-wrfc-red">
                  {pillar.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                  {pillar.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Answers */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="section-title mb-8 text-wrfc-navy dark:text-white">
                {section.heading}
              </h2>
              <div className="space-y-8">
                {section.items.map((faq) => (
                  <article
                    key={faq.question}
                    className="border-b border-gray-200 dark:border-gray-700 pb-8 last:border-0"
                  >
                    <h3 className="text-xl font-bold mb-3 text-wrfc-navy dark:text-wrfc-red">
                      {faq.question}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-100 leading-relaxed">
                      {faq.answer}
                    </p>
                    {faq.link && (
                      <a
                        href={faq.link.href}
                        {...(faq.link.external
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        className="inline-flex items-center gap-1 mt-3 font-semibold text-wrfc-red hover:underline"
                      >
                        {faq.link.label}
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Contact fallback */}
        <div className="max-w-4xl mx-auto mt-16 bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            Something we did not answer?
          </h2>
          <p className="text-gray-700 dark:text-gray-200 mb-6">
            Email{' '}
            <a href="mailto:welcome@washingtonrugby.org" className="underline font-semibold">
              welcome@washingtonrugby.org
            </a>{' '}
            if you are thinking about playing, or{' '}
            <a href="mailto:info@washingtonrugby.org" className="underline font-semibold">
              info@washingtonrugby.org
            </a>{' '}
            for anything else.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/membership"
              className="inline-flex items-center justify-center bg-wrfc-red hover:bg-wrfc-red/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              How to Join
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              href="/schedule/practice"
              className="inline-flex items-center justify-center border-2 border-wrfc-navy dark:border-white text-wrfc-navy dark:text-white px-6 py-3 rounded-lg font-semibold transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Practice Schedule
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
