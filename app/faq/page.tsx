import Link from 'next/link'
import { generateSEOMetadata } from '../utils/seo'
import { BreadcrumbJsonLd, FAQPageJsonLd } from '../../components/JsonLd'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { clubPillars, clubPrinciples } from '@/data/club-identity'

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
  /** Optional CTAs rendered under the visible answer. Kept out of the FAQPage
   *  schema, which takes the plain-text answer only. */
  links?: { href: string; label: string; external?: boolean }[]
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
          'WRFC started Washington DC Youth Rugby in 2004 to bring the game to underserved parts of the city. It began with 7 participants and now reaches over 100 kids a year across all four quadrants of Washington, DC, free of charge. WRFC players coach and volunteer with it, and the club continues to support it.',
        links: [
          {
            href: 'https://www.washingtondcyouthrugby.org/',
            label: 'Washington DC Youth Rugby',
            external: true
          }
        ]
      }
    ]
  },
  {
    heading: 'Joining and playing',
    items: [
      {
        question: 'Can I join WRFC with no rugby experience?',
        answer:
          'Yes. A large share of the current squad had never played rugby before joining, arriving from football, soccer, wrestling, basketball, or no organized sport at all. New players are taught the laws of the game and safe contact technique before playing a match, and get brought into a side that matches where they are rather than left waiting for one.'
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
        links: [
          {
            href: 'https://www.zeffy.com/en-US/ticketing/wrfc-player-dues',
            label: 'View current dues and pay',
            external: true
          }
        ]
      },
      {
        question: 'Is there an age limit?',
        answer:
          'WRFC is an adult club, so players need to be 18 or over. There is no upper limit — the club has players across a wide age range and old boys sides appear at tournaments. Anyone younger should look at Washington DC Youth Rugby, the program WRFC founded in 2004.'
      },
      {
        question: 'Does WRFC have a women\'s team?',
        answer:
          'WRFC fields men\'s sides, and the DC Furies are our connected women\'s club — if you want to play women\'s rugby in the District, start there. We send people their way and share the DC rugby community with them. The Cherry Blossom Tournament that WRFC hosts also includes women\'s club and college brackets.',
        links: [
          { href: 'https://www.dcfuries.com/', label: 'DC Furies', external: true }
        ]
      }
    ]
  },
  {
    heading: 'Culture and community',
    items: [
      {
        question: 'What is the culture at WRFC like?',
        answer:
          'Serious about the rugby, not serious about itself. Almost everyone here works full time, so practice starts when it says it will and the two hours count. Then people stay — the bar afterward is not a bonus feature, it is a good part of why anyone comes back out on a cold Tuesday in February. Nobody is auditioning for anything. Newcomers are the normal case rather than the awkward exception, because most of the squad joined the same way.'
      },
      {
        question: 'Who actually plays for WRFC?',
        answer:
          'Working professionals across the industries this city runs on, alongside students, people newly posted to DC, and people who grew up here. Ages run from early twenties to old boys still turning out at tournaments. Plenty had never played rugby before joining — they came from football, soccer, wrestling, basketball, or no organized sport at all. If you are picturing a room of former college athletes, that is only part of it.'
      },
      {
        question: 'Is WRFC a diverse club?',
        answer:
          'On purpose, yes. The club has been a mix of nationalities since expats and Washingtonians founded it in 1963, and it still is — different countries, ages, jobs, builds and levels of experience. Rugby is unusual in having a real place on the field for a wide range of body types and athletic profiles, and we lean into that instead of recruiting one kind of player.'
      },
      {
        question: 'What does WRFC do in the DC community?',
        answer:
          'The club started Washington DC Youth Rugby in 2004 to get the game to kids across the District. It began with seven of them and now reaches more than a hundred a year, free, in schools and neighborhoods in all four quadrants. WRFC members coach it and show up for it. The club also hosts the Cherry Blossom Tournament each spring, which it has run since 1968, bringing club, college and high school sides into the DC area every year.',
        links: [
          {
            href: 'https://www.washingtondcyouthrugby.org/',
            label: 'Washington DC Youth Rugby',
            external: true
          }
        ]
      }
    ]
  },
  {
    heading: 'Choosing a club in DC',
    items: [
      {
        question: 'Which rugby club should I join in Washington, DC?',
        answer:
          'It depends what you want from the game. The DC area has several adult clubs and most of them are welcoming. WRFC tends to suit people working full time who want a club in the city with a real social side, and who want somewhere that takes complete beginners while still running a competitive Division 1 squad. If you want to play professionally, that is Old Glory DC in Major League Rugby. If you want women\'s rugby, start with the DC Furies, our connected women\'s club. Visiting two or three clubs before you decide is normal and nobody will take offense.',
        links: [
          { href: 'https://www.dcfuries.com/', label: 'DC Furies', external: true }
        ]
      },
      {
        question: 'What distinguishes WRFC from other DC-area clubs?',
        answer:
          'The people, honestly. WRFC started in 1963 when diplomats posted to Washington and locals who wanted a rugby club found each other, and the squad has been that combination ever since — some of the room moved here for a job, some grew up around the corner. That history is why walking in knowing nobody is completely normal here. Day to day it looks like a group of people with real jobs who show up on time, train hard for two hours, and then stay just as long afterward. A lot of them also spend weekends coaching free youth rugby across the city, which the club has run since 2004. There are strong coaches here and a long record, and both matter — but neither is why anyone stays.'
      },
      {
        question: 'Is WRFC competitive or social?',
        answer:
          'Both, by design. The Division 1 side selects competitively and trains that way. D3 and social exist so players who want regular game time without the D1 commitment have somewhere real to play, and most people move between sides across a season. Off the field there are socials, an end-of-season banquet, the 30 Under 30 fixture and an annual tour, and a lot of members coach with DC Youth Rugby.'
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
            Four things that describe this club better than a list of trophies would.
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

          <div className="mt-10 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-bold mb-4 text-wrfc-navy dark:text-white">
              How that works in practice
            </h3>
            <ul className="space-y-2">
              {clubPrinciples.map((principle) => (
                <li
                  key={principle}
                  className="flex gap-3 text-gray-700 dark:text-gray-200 leading-relaxed"
                >
                  <span aria-hidden="true" className="text-wrfc-red font-bold">
                    &rsaquo;
                  </span>
                  {principle}
                </li>
              ))}
            </ul>
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
                    {faq.links && (
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
                        {faq.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            {...(link.external
                              ? { target: '_blank', rel: 'noopener noreferrer' }
                              : {})}
                            className="inline-flex items-center gap-1 font-semibold text-wrfc-red hover:underline"
                          >
                            {link.label}
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        ))}
                      </div>
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
