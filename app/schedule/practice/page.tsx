import { BreadcrumbJsonLd } from '../../components/JsonLd'
import JsonLd from '../../components/JsonLd'
import { getStructuredData } from '../utils/seo'

export default function PracticeSchedulePage() {
  const structuredData = getStructuredData('practice-schedule', {
    '@type': 'WebPage',
    name: 'Practice Schedule - WRFC',
    description: 'Washington Rugby Football Club practice schedule, training philosophy, and session breakdown.'
  });

  return (
    <div className="flex flex-col items-center w-full">
      {/* Structured Data */}
      <BreadcrumbJsonLd 
        items={[
          { name: 'Home', item: '/' },
          { name: 'Schedule', item: '/schedule' },
          { name: 'Practice', item: '/schedule/practice' }
        ]} 
      />
      <JsonLd type="WebPage" data={structuredData} />

      {/* Hero Section */}
      <section className="w-full py-20 bg-gradient-to-b from-blue-900 to-black text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-nasalization text-center">
            Practice Schedule
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto font-jetbrains">
            Train Hard, Play Harder
          </p>
        </div>
      </section>

      {/* Training Philosophy */}
      <section className="w-full py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 font-nasalization text-blue-900 dark:text-blue-400 text-center">
            Our Training Philosophy
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-gray-700 dark:text-gray-300 mb-6 font-jetbrains">
              At WRFC, we believe in comprehensive rugby development that balances physical conditioning, 
              technical skills, and tactical understanding. Our training sessions are designed to build 
              not just better rugby players, but stronger athletes and cohesive team units.
            </p>
            <p className="text-gray-700 dark:text-gray-300 font-jetbrains">
              Every practice follows a structured approach that ensures players of all levels can improve 
              their game while contributing to the team&apos;s overall success. We emphasize fundamentals, 
              fitness, and fostering a positive rugby culture.
            </p>
          </div>
        </div>
      </section>

      {/* Schedule Times */}
      <section className="w-full py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 font-nasalization text-blue-900 dark:text-blue-400 text-center">
            Training Times
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Fall/Spring Season */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-4 font-nasalization text-blue-900 dark:text-blue-400">
                Fall & Spring Season
              </h3>
              <div className="space-y-4 font-jetbrains">
                <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">D1 & D3 Practice</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">8:00 PM - 10:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">Days</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Tuesday & Thursday</span>
                </div>
              </div>
            </div>

            {/* Summer Season */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-4 font-nasalization text-blue-900 dark:text-blue-400">
                Summer 7s Season
              </h3>
              <div className="space-y-4 font-jetbrains">
                <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">7s Practice</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">7:00 PM - 9:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">Days</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Tuesday & Thursday</span>
                </div>
              </div>
            </div>
          </div>

          {/* Training Locations */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6 font-nasalization text-blue-900 dark:text-blue-400">
              Training Locations
            </h3>
            <div className="grid md:grid-cols-2 gap-6 font-jetbrains">
              <div>
                <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Primary Field</h4>
                <p className="text-gray-700 dark:text-gray-300">Rosedale Recreation Center</p>
                <a 
                  href="https://maps.google.com/maps?q=Rosedale+Recreation+Center+1701+Gales+St+NE+Washington+DC+20002" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                >
                  1701 Gales St NE, Washington, DC 20002
                </a>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Backup Field</h4>
                <p className="text-gray-700 dark:text-gray-300">Trinidad Community Center</p>
                <a 
                  href="https://maps.google.com/maps?q=Trinidad+Community+Center+1310+Childress+St+NE+Washington+DC+20002" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                >
                  1310 Childress St NE, Washington, DC 20002
                </a>
              </div>
              <div className="md:col-span-2 mt-4">
                <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Summer 7s Fields</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  <a 
                    href="https://maps.app.goo.gl/YgkGvG25ZMvrzYWk9" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Wallenberg Field
                  </a> (Rugby field behind Holocaust Museum) & Rosedale Recreation Center
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Breakdown */}
      <section className="w-full py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 font-nasalization text-blue-900 dark:text-blue-400 text-center">
            Typical Practice Breakdown
          </h2>
          
          <div className="space-y-6">
            {[
              {
                phase: "Arrival & Warm-up",
                duration: "15 minutes",
                description: "Dynamic stretching, light jogging, and mobility exercises to prepare the body for training.",
                icon: "🏃"
              },
              {
                phase: "Conditioning",
                duration: "20 minutes",
                description: "Sport-specific fitness work including sprints, agility drills, and rugby-focused cardio.",
                icon: "💪"
              },
              {
                phase: "Skill Drills",
                duration: "25 minutes",
                description: "Technical work on passing, catching, kicking, and individual position-specific skills.",
                icon: "🏉"
              },
              {
                phase: "Phase Drills",
                duration: "20 minutes",
                description: "Set piece work including scrums, lineouts, and structured play patterns.",
                icon: "📋"
              },
              {
                phase: "Unit Work",
                duration: "20 minutes",
                description: "Forwards and backs split for specialized training. New players work on fundamentals with veteran mentors.",
                icon: "👥"
              },
              {
                phase: "Full Field Scrimmage",
                duration: "20 minutes",
                description: "Game simulation to practice tactics and teamwork in match-like conditions.",
                icon: "🏟️"
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 flex items-start space-x-4">
                <div className="text-4xl">{item.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold font-nasalization text-blue-900 dark:text-blue-400">
                      {item.phase}
                    </h3>
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 font-jetbrains">
                      {item.duration}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-jetbrains">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <p className="text-center text-gray-700 dark:text-gray-300 font-jetbrains">
              <strong>Note:</strong> Practice structure may vary based on upcoming matches, weather conditions, 
              and specific team needs. All players are expected to arrive on time and ready to train.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}