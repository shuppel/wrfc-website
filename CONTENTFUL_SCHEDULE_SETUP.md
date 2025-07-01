# Contentful CMS Setup for WRFC Schedule System

This document outlines how to set up Contentful CMS to manage the WRFC game schedule, similar to the Washington Commanders website structure.

## Content Models Required

### 1. Team Content Model

**Content Type ID**: `team`

| Field Name | Field ID | Type | Required | Description |
|------------|----------|------|----------|-------------|
| Team Name | `name` | Short Text | Yes | Full team name (e.g., "Washington Rugby Football Club") |
| Short Name | `shortName` | Short Text | Yes | Abbreviated name (e.g., "WRFC") |
| Logo | `logo` | Media | No | Team logo image |
| City | `city` | Short Text | Yes | Team's home city |
| State | `state` | Short Text | Yes | Team's home state |

### 2. Venue Content Model

**Content Type ID**: `venue`

| Field Name | Field ID | Type | Required | Description |
|------------|----------|------|----------|-------------|
| Venue Name | `name` | Short Text | Yes | Name of the venue |
| City | `city` | Short Text | Yes | Venue city |
| State | `state` | Short Text | Yes | Venue state |
| Address | `address` | Short Text | Yes | Full street address |
| Latitude | `latitude` | Number (Decimal) | Yes | GPS latitude |
| Longitude | `longitude` | Number (Decimal) | Yes | GPS longitude |

### 3. Game Content Model

**Content Type ID**: `game`

| Field Name | Field ID | Type | Required | Description |
|------------|----------|------|----------|-------------|
| Game ID | `gameId` | Short Text | Yes | Unique identifier |
| Date | `date` | Date & Time | Yes | Game date and time |
| Kickoff Time | `kickoffTime` | Short Text | Yes | Game time (e.g., "3:00 PM") |
| Home Team | `homeTeam` | Reference (Team) | Yes | Link to home team |
| Away Team | `awayTeam` | Reference (Team) | Yes | Link to away team |
| Venue | `venue` | Reference (Venue) | Yes | Link to venue |
| Division | `division` | Short Text | Yes | D1, D3, or Social |
| Competition | `competition` | Short Text | Yes | Competition name |
| Home Score | `homeScore` | Number (Integer) | No | Final home team score |
| Away Score | `awayScore` | Number (Integer) | No | Final away team score |
| Status | `status` | Short Text | Yes | SCHEDULED, FINAL, FORFEIT, CANCELLED, POSTPONED |
| Notes | `notes` | Long Text | No | Additional game notes |
| Ticket URL | `ticketUrl` | Short Text | No | Link to purchase tickets |
| Broadcast URL | `broadcastUrl` | Short Text | No | Link to live stream |

## Environment Variables

Add these to your `.env.local` file:

```bash
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_access_token_here
CONTENTFUL_ENVIRONMENT=master
```

## Sample Data Structure

### Sample Team Entry
```json
{
  "name": "Washington Rugby Football Club",
  "shortName": "WRFC",
  "city": "Washington",
  "state": "DC",
  "logo": "https://images.ctfassets.net/space/asset-id/wrfc_logo.png"
}
```

### Sample Venue Entry
```json
{
  "name": "Rosedale Recreation Center",
  "city": "Washington",
  "state": "DC", 
  "address": "1701 Gales St NE, Washington, DC 20002",
  "latitude": 38.9072,
  "longitude": -76.9707
}
```

### Sample Game Entry
```json
{
  "gameId": "wrfc-vs-potomac-2025-03-15",
  "date": "2025-03-15T15:00:00.000Z",
  "kickoffTime": "3:00 PM",
  "homeTeam": "link-to-wrfc-team",
  "awayTeam": "link-to-potomac-team", 
  "venue": "link-to-rosedale-venue",
  "division": "D1",
  "competition": "EPRU League",
  "status": "SCHEDULED",
  "ticketUrl": "https://tickets.example.com/game123"
}
```

## API Functions Available

The system provides these functions for fetching game data:

- `getAllGames()` - Fetch all games
- `getGamesBySeason(year)` - Fetch games for specific year
- `getUpcomingGames(limit)` - Fetch next upcoming games
- `getPastGames(limit)` - Fetch recent completed games

## Features Implemented

### 1. Commanders-Style Schedule Display
- ✅ Game cards with team logos and scores
- ✅ Upcoming games, past results, and standings views
- ✅ Division filtering (D1, D3, Social)
- ✅ Venue information with Google Maps integration
- ✅ Responsive design for all devices

### 2. Contentful Integration
- ✅ Automatic data transformation from Contentful to app format
- ✅ Fallback to sample data when Contentful is not configured
- ✅ Competition type mapping (League, Friendly, Playoff, Tournament, Social)
- ✅ Smart home/away team detection for WRFC games

### 3. SEO & Performance
- ✅ Server-side rendering with Next.js
- ✅ Structured data for search engines
- ✅ Optimized images and lazy loading
- ✅ Static generation for better performance

## Usage Instructions

1. **Set up Contentful space** with the content models above
2. **Add environment variables** to your deployment
3. **Create teams, venues, and games** in Contentful
4. **Deploy** - the system will automatically fetch from Contentful or fallback to sample data

## Advanced Features

### Competition Type Mapping
The system automatically maps Contentful competition strings to standardized types:
- "EPRU League" → LEAGUE
- "Friendly Match" → FRIENDLY  
- "Championship Playoff" → PLAYOFF
- "Cherry Blossom Tournament" → TOURNAMENT
- "Social Game" → SOCIAL

### Smart Home/Away Detection
The system automatically detects if WRFC is the home team by checking team names for "Washington Rugby" or "WRFC".

### Error Handling
- Graceful fallback to sample data if Contentful is unavailable
- Validation warnings for missing environment variables
- Type-safe transformations with TypeScript

## Next Steps

To enhance the schedule system further, consider:
1. Adding push notifications for game updates
2. Implementing real-time score updates
3. Adding player statistics integration
4. Creating a mobile app version
5. Adding social media integration for game highlights