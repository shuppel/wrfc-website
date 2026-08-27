import { MetadataRoute } from 'next'
import { clubRosterPlayers, squadPlayers } from '@/data/roster'

type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://washingtonrugby.org'
  
  // Main pages
  const mainRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as ChangeFreq,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/dc-rugby`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFreq,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/schedule`,
      lastModified: new Date(),
      changeFrequency: 'daily' as ChangeFreq,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/schedule/practice`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFreq,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/schedule/game`,
      lastModified: new Date(),
      changeFrequency: 'daily' as ChangeFreq,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/schedule/events`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tournaments`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFreq,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/membership`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sponsors`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/media`,
      lastModified: new Date(),
      changeFrequency: 'daily' as ChangeFreq,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFreq,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/alumni`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/alumni/spotlights`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/teams`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFreq,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/teams/coaches`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/teams/players`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFreq,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/executive-committee`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as ChangeFreq,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as ChangeFreq,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/local`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/local/capitol-hill`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/local/georgetown`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.7,
    },
  ]

  // Tournament pages (dynamic)
  const tournamentYears = ['2023', '2024', '2025']
  const tournamentRoutes = tournamentYears.map(year => ({
    url: `${baseUrl}/tournaments/cherry-blossom/${year}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as ChangeFreq,
    priority: 0.7,
  }))

  // Player profile pages. The current squad ranks above the wider club roster:
  // both stay indexed, but a page for someone playing this season is the one
  // worth crawling first.
  const playerRoutes = [
    ...squadPlayers.map(player => ({
      url: `${baseUrl}/teams/players/${player.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.6,
    })),
    ...clubRosterPlayers.map(player => ({
      url: `${baseUrl}/teams/players/${player.slug}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as ChangeFreq,
      priority: 0.4,
    })),
  ]

  return [...mainRoutes, ...tournamentRoutes, ...playerRoutes]
} 