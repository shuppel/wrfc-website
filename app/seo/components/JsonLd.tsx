import { Organization, WebSite, WithContext } from 'schema-dts'

export function OrganizationJsonLd() {
  const organizationData: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Nodetus Integrators LLC',
    description: 'No-nonsense IT Advisory. [Sense of humor included]',
    url: 'https://www.nodetus.com',
    logo: 'https://www.nodetus.com/logo.png',
    foundingDate: '2017',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2833 S Wakefield St Unit C',
      addressLocality: 'Arlington',
      addressRegion: 'VA',
      postalCode: '22206',
      addressCountry: 'US'
    },
    sameAs: [
      'https://www.linkedin.com/company/nodetus-integrators-llc/',
      'https://www.facebook.com/nodetus'
    ],
    knowsAbout: [
      'Market Research',
      'Technical Writing',
      'Human Centered Design',
      'Product Management',
      'Business Functional Requirements',
      'Reverse Engineering',
      'FinOps',
      'IT Spend Management',
      'IT Modernization',
      'Digital Transformation',
      'Procurement Innovation',
      'Industrial Psychology'
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
    />
  )
}