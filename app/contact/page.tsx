import { BreadcrumbJsonLd } from '../../components/JsonLd'
import JsonLd from '../../components/JsonLd'
import { getStructuredData } from '../utils/seo'

export default function ContactPage() {
  // Additional structured data specific to the contact page
  const structuredData = getStructuredData('contact', {
    '@type': 'WebPage',
    mainEntity: {
      '@type': 'ContactPage',
      name: 'Contact WRFC',
      description: 'Get in touch with Washington Rugby Football Club. Contact us about membership, sponsorship, or general inquiries.',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'general inquiries',
        availableLanguage: 'English'
      },
      organization: {
        '@type': 'SportsOrganization',
        name: 'Washington Rugby Football Club',
        url: 'https://washingtonrugby.org',
        location: {
          '@type': 'Place',
          name: 'Washington, DC',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Washington',
            addressRegion: 'DC',
            addressCountry: 'US'
          }
        }
      }
    }
  });

  return (
    <div className="flex flex-col items-center w-full">
      {/* Structured Data */}
      <BreadcrumbJsonLd 
        items={[
          { name: 'Home', item: '/' },
          { name: 'Contact', item: '/contact' }
        ]} 
      />
      <JsonLd type="WebPage" data={structuredData} />

      {/* Hero Section */}
      <section className="w-full py-20 bg-gradient-to-b from-blue-900 to-black text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6  text-center">
            Contact Us
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto ">
            Get in touch with WRFC
          </p>
        </div>
      </section>

      <section className="w-full py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold  text-blue-900 dark:text-blue-400">
                Send Us a Message
              </h2>
              <form 
                action="https://formspree.io/f/xjkrlqdy" 
                method="POST"
                className="space-y-6"
              >
                <div>
                  <label htmlFor="name" className="block mb-2  text-gray-700 dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors "
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2  text-gray-700 dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors "
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block mb-2  text-gray-700 dark:text-white">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors "
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2  text-gray-700 dark:text-white">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors "
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors "
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold  text-blue-900 dark:text-blue-400">
                Contact Information
              </h2>
              <div className="space-y-6">
                <ContactInfo
                  title="Location"
                  content="Washington, DC"
                  icon={<LocationIcon />}
                />
                <ContactInfo
                  title="Marketing & General Inquiries"
                  content="info@washingtonrugby.org"
                  icon={<EmailIcon />}
                />
                <ContactInfo
                  title="Primary Training Ground"
                  content="Rosedale Recreation Center"
                  address="1701 Gales St NE, Washington, DC 20002"
                  mapLink="https://maps.google.com/maps?q=Rosedale+Recreation+Center+1701+Gales+St+NE+Washington+DC+20002"
                  icon={<LocationIcon />}
                />
                <ContactInfo
                  title="Backup Training Ground"
                  content="Trinidad Community Center"
                  address="1310 Childress St NE, Washington, DC 20002"
                  mapLink="https://maps.google.com/maps?q=Trinidad+Community+Center+1310+Childress+St+NE+Washington+DC+20002"
                  icon={<LocationIcon />}
                />
              </div>

              <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <h3 className="text-xl font-bold mb-4  text-blue-900 dark:text-blue-400">
                  Training Hours
                </h3>
                <ul className="space-y-2  text-gray-700 dark:text-white">
                  <li><strong>Regular Season:</strong> 8:00 PM - 10:00 PM</li>
                  <li><strong>Summer 7s Training:</strong> 7:00 PM - 9:00 PM</li>
                  <li className="text-sm mt-3">
                    <strong>Summer 7s Locations:</strong>
                    <br />
                    <a href="https://maps.app.goo.gl/YgkGvG25ZMvrzYWk9" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Wallenberg Field
                    </a> (Rugby field behind Holocaust Museum, Raoul Wallenberg Pl SW)
                    <br />
                    <a href="https://maps.google.com/maps?q=Rosedale+Recreation+Center+1701+Gales+St+NE+Washington+DC+20002" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Rosedale Recreation Center
                    </a> (1701 Gales St NE)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ContactInfo({ title, content, address, mapLink, icon }: { title: string; content: string; address?: string; mapLink?: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="text-blue-600 dark:text-blue-400">
        {icon}
      </div>
      <div>
        <h3 className="font-bold mb-1  text-gray-900 dark:text-gray-100">{title}</h3>
        <p className=" text-gray-700 dark:text-white">{content}</p>
        {address && (
          <p className=" text-sm text-gray-600 dark:text-gray-100 mt-1">
            {mapLink ? (
              <a href={mapLink} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 underline">
                {address}
              </a>
            ) : (
              address
            )}
          </p>
        )}
      </div>
    </div>
  )
}

function EmailIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}


function LocationIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
} 