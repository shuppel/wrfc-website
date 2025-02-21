export default function AboutPage() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="w-full py-20 bg-gradient-to-b from-blue-900 to-black text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-nasalization text-center">
            About WRFC
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto font-jetbrains">
            A legacy of excellence in Washington rugby since 1963
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="w-full py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 font-nasalization text-blue-900 dark:text-blue-400">
              Our Mission
            </h2>
            <p className="text-lg mb-6 font-jetbrains text-gray-700 dark:text-gray-300">
              To foster and promote the growth of rugby in the Washington area while maintaining 
              the highest standards of sportsmanship and athletic excellence.
            </p>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="w-full py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 font-nasalization text-blue-900 dark:text-blue-400">
              Our History
            </h2>
            <div className="space-y-6 font-jetbrains text-gray-700 dark:text-gray-300">
              <p className="text-lg">
                Founded in 1963, Washington Rugby Football Club has been a cornerstone of rugby 
                in the nation&apos;s capital for over half a century. What began as a small group 
                of dedicated players has grown into one of the most respected rugby clubs in 
                the region.
              </p>
              <p className="text-lg">
                Throughout our history, WRFC has competed at the highest levels of American 
                rugby, producing numerous representative players and achieving significant 
                success in both regional and national competitions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 font-nasalization text-blue-900 dark:text-blue-400 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <ValueCard 
              title="Excellence"
              description="Striving for the highest standards in everything we do, both on and off the field."
            />
            <ValueCard 
              title="Community"
              description="Building strong relationships and supporting each other as a rugby family."
            />
            <ValueCard 
              title="Tradition"
              description="Honoring our heritage while embracing the future of rugby in Washington."
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function ValueCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 text-center">
      <h3 className="text-xl font-bold mb-4 font-nasalization text-blue-900 dark:text-blue-400">
        {title}
      </h3>
      <p className="font-jetbrains text-gray-700 dark:text-gray-300">
        {description}
      </p>
    </div>
  )
} 