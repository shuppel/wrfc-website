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
          "url": "https://www.washingtonrugby.org",
          "logo": "https://www.washingtonrugby.org/images/wrfc-logo.png",
          "sameAs": [
            "https://www.facebook.com/WashingtonRugbyFootballClub/",
            "https://x.com/WRFC_DC",
            "https://www.instagram.com/wrfc1963/",
            "https://en.wikipedia.org/wiki/Washington_Rugby_Football_Club"
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
          "description": "Washington Rugby Football Club is the oldest rugby club in Washington, DC, founded in 1963. Men's D1, D3 and social sides, coached by former USA Eagles internationals.",
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
          "url": "https://www.washingtonrugby.org",
          "name": "Washington Rugby Football Club",
          "description": "Official website of the Washington Rugby Football Club (WRFC)",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.washingtonrugby.org/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })
      }}
    />
  )
}