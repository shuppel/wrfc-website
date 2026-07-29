import Link from 'next/link'
import { generateSEOMetadata } from '../utils/seo'
import { BreadcrumbJsonLd, FAQPageJsonLd } from '../../components/JsonLd'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

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
type Faq = { question: string; answer: string }
type FaqSection = { heading: string; items: Faq[] }

const sections: FaqSection[] = [
  {
    heading: 'About the club',
    items: [
      {
        question: 'What is Washington Rugby Football Club?',
        answer:
          'Washington Rugby Football Club (WRFC) is a men\'s rugby union club based in Washington, DC. It was founded in February 1963, which makes it the oldest rugby club in the District. The club fields Division 1, Division 3 and social sides, plays league rugby in the Eastern Penn Rugby Union, trains in Northeast DC, and is a registered nonprofit.'
      },
      {
        question: 'How old is WRFC and what has it done?',
        answer:
          'WRFC has been playing continuously since 1963. It was one of 14 founding members of the USA Rugby Super League in 1997 and competed there for 12 years. It won the Division 2 Capital Region championship in 2021, earning promotion back to Division 1. It founded Washington DC Youth Rugby in 2004, and has hosted the Cherry Blossom Tournament every spring since 1968. Former WRFC players include USA Eagles captain Dan Lyle and Tommy Smith, the only American to win the Hong Kong Sevens Best & Fairest award.'
      },
      {
        question: 'Who coaches WRFC?',
        answer:
          'Head Coach Thretton Palamo is a former USA Eagles international and professional rugby player. Lead Assistant Coach Jamason Fa\'anana-Schultz is a former USA Eagles captain and former captain of Old Glory DC, the DC-area Major League Rugby team. They are supported by assistant coaches Roger Evans and Eric Keys and player-coaches Doug Muilken and Trey Kierl.'
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
          'Yes. A large share of the current squad had never played rugby before joining, arriving from American football, soccer, wrestling, basketball, or no organised sport at all. New players are taught the laws of the game and safe contact technique before playing a match. There is no trial and no cut.'
      },
      {
        question: 'How do I join WRFC?',
        answer:
          'Come to a Tuesday or Thursday practice, or fill in the membership form at washingtonrugby.org/membership and someone will contact you before the next session. Questions can go to welcome@washingtonrugby.org. You do not need to pay or commit anything before your first session.'
      },
      {
        question: 'When and where does WRFC train?',
        answer:
          'Tuesdays and Thursdays. During the 15s season practice runs 8:00-10:00 PM; during the summer 7s season it runs 7:00-9:00 PM. The primary training ground is Rosedale Recreation Center, 1701 Gales St NE, Washington, DC 20002. Some sessions are held at Wallenberg Field near the Holocaust Museum. Both sites are reachable by Metro and bus.'
      },
      {
        question: 'What should I bring to my first practice?',
        answer:
          'Trainers or cleats, shorts, and a water bottle. Boots and a gumshield are worth getting if you decide to stay, but you do not need either to turn up and take part in your first session.'
      },
      {
        question: 'How much does it cost to play for WRFC?',
        answer:
          'Season dues are $200 for Division 1 players and $150 for Division 3 players, which covers season participation, match eligibility, training, a team gear package, social events and USA Rugby registration. Social membership, which covers club social events and newsletters without playing, is $50. Dues are paid once you decide to join rather than before your first session, and the club will discuss options if cost is a barrier.'
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
    heading: 'Choosing a club in DC',
    items: [
      {
        question: 'Which rugby club should I join in Washington, DC?',
        answer:
          'It depends on what you want from the game. The DC area supports several adult clubs, and most of them are welcoming. WRFC is worth considering if you want a club that takes complete beginners while also running a competitive Division 1 side, trains inside the District rather than out in the suburbs, and has coaching from former international players. If you want to play at the professional level, that is Old Glory DC in Major League Rugby. If you want women\'s rugby, look at the DC Furies or NOVA Women. Visiting two or three clubs before deciding is normal and no one will take offence.'
      },
      {
        question: 'What distinguishes WRFC from other DC-area clubs?',
        answer:
          'Four things that can be checked rather than asserted. It is the oldest club in the District, founded 1963. Its head coach and lead assistant are both former USA Eagles internationals, one of whom captained Old Glory DC. It founded and still supports Washington DC Youth Rugby, which serves over 100 children a year for free. And it hosts the Cherry Blossom Tournament, run every spring since 1968. Whether that adds up to the right club for you is a separate question, and depends on what you are after.'
      },
      {
        question: 'Is WRFC competitive or social?',
        answer:
          'Both, by design. The Division 1 side selects competitively and trains accordingly. The Division 3 and social sides exist so that players who want regular game time without D1 commitment have somewhere real to play. Most members move between sides over a season. Off the pitch the club runs socials, an end-of-season banquet, the 30 Under 30 fixture and an annual overseas tour.'
      },
      {
        question: 'Who does WRFC play against?',
        answer:
          'WRFC plays league fixtures in the Eastern Penn Rugby Union (EPRU). The 15s regular season runs from late August through November, with playoffs from February through early May, and summer is given to 7s. Across a full year the club plays roughly 30 matches between its sides, plus tournament fixtures.'
      }
    ]
  },
  {
    heading: 'Cherry Blossom Tournament',
    items: [
      {
        question: 'What is the Cherry Blossom Tournament?',
        answer:
          'The Cherry Blossom Rugby Tournament is an annual spring tournament hosted by Washington Rugby Football Club, run every year since 1968. It draws club, college and high school sides from across the East Coast, with men\'s and women\'s brackets. The 58th edition was held on 11 April 2026 in Aldie, Virginia, where Washington Rugby won the Men\'s Club Bracket over Fayetteville RFC. The 57th edition in 2025 drew 31 teams and more than 600 players.'
      },
      {
        question: 'When is the next Cherry Blossom Tournament and how do teams enter?',
        answer:
          'The 59th edition takes place in spring 2027. The date and venue have not yet been announced, and registration is not yet open — it typically opens in December, with teams that played the previous year notified first. Teams wanting to be on the notification list should email cbt-chair@washingtonrugby.org.'
      }
    ]
  }
]

const allFaqs = sections.flatMap((section) => section.items)

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
            Straight answers about Washington Rugby Football Club — who we are, where we train,
            what it costs, and whether we are the right club for you.
          </p>
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
