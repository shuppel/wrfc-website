export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SportsTeam",
          "name": "Washington Rugby Football Club",
          "alternateName": "WRFC",
          "url": "https://www.wrfc.org",
          "logo": "https://www.wrfc.org/images/wrfc-logo.png",
          "sameAs": [
            "https://www.facebook.com/WashingtonRugbyFC",
            "https://twitter.com/WashingtonRugby",
            "https://www.instagram.com/washingtonrugby"
          ],
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Washington",
            "addressRegion": "DC",
            "addressCountry": "US"
          },
          "sport": {
            "@type": "Sport",
            "name": "Rugby"
          },
          "description": "Washington Rugby Football Club (WRFC) is a premier rugby club in Washington, DC, offering competitive matches, expert coaching, and a strong community of rugby enthusiasts.",
          "foundingDate": "1963",
          "member": {
            "@type": "SportsOrganization",
            "name": "USA Rugby"
          }
        })
      }}
    />
  )
}

export function WebsiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "url": "https://www.wrfc.org",
          "name": "Washington Rugby Football Club",
          "description": "Official website of the Washington Rugby Football Club (WRFC)",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.wrfc.org/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })
      }}
    />
  )
}