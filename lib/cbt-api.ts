/**
 * CBT API Helper
 * Handles all interactions with Google Sheets backend for Cherry Blossom Tournament
 */

import {
  type RegisteredTeam,
  type DivisionStats,
  parseTeamsResponse,
  parseDivisionStatsResponse,
} from '@/types/tournament';

// API Configuration
const API_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_URL;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// In-memory cache for API responses
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<unknown>>();

/**
 * Get data from cache if still valid
 */
function getFromCache<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  
  const now = Date.now();
  if (now - entry.timestamp > CACHE_DURATION) {
    cache.delete(key);
    return null;
  }
  
  return entry.data as T;
}

/**
 * Store data in cache
 */
function setCache<T>(key: string, data: T): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

/**
 * Fetch registered teams for a specific year
 * @param year - Tournament year (default: 2026)
 * @returns Array of registered teams with public information
 */
export async function fetchRegisteredTeams(year: number = 2026): Promise<RegisteredTeam[]> {
  const cacheKey = `teams_${year}`;
  
  // Check cache first
  const cachedData = getFromCache<RegisteredTeam[]>(cacheKey);
  if (cachedData) {
    console.log('📦 Using cached teams data');
    return cachedData;
  }
  
  if (!API_URL) {
    console.error('❌ NEXT_PUBLIC_GOOGLE_SHEETS_API_URL is not configured');
    throw new Error('API URL not configured');
  }
  
  try {
    console.log('🌐 Fetching teams from Google Sheets API...');
    const url = `${API_URL}?action=getTeams&year=${year}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      // Disable Next.js caching, we handle our own
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const rawData = await response.json();
    console.log('📥 Received raw data:', rawData);
    
    // Validate and parse response using Zod
    const validatedData = parseTeamsResponse(rawData);
    
    if (validatedData.status === 'error') {
      throw new Error(validatedData.message || 'API returned error status');
    }
    
    const teams = validatedData.data || [];
    console.log(`✅ Fetched ${teams.length} teams`);
    
    // Store in cache
    setCache(cacheKey, teams);
    
    return teams;
  } catch (error) {
    console.error('❌ Error fetching teams:', error);
    throw error;
  }
}

/**
 * Fetch division statistics (counts, availability, etc.)
 * @param year - Tournament year (default: 2026)
 * @returns Array of division statistics
 */
export async function fetchDivisionStats(year: number = 2026): Promise<DivisionStats[]> {
  const cacheKey = `stats_${year}`;
  
  // Check cache first
  const cachedData = getFromCache<DivisionStats[]>(cacheKey);
  if (cachedData) {
    console.log('📦 Using cached division stats');
    return cachedData;
  }
  
  if (!API_URL) {
    console.error('❌ NEXT_PUBLIC_GOOGLE_SHEETS_API_URL is not configured');
    throw new Error('API URL not configured');
  }
  
  try {
    console.log('🌐 Fetching division stats from Google Sheets API...');
    const url = `${API_URL}?action=getStats&year=${year}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const rawData = await response.json();
    console.log('📥 Received raw stats:', rawData);
    
    // Validate and parse response using Zod
    const validatedData = parseDivisionStatsResponse(rawData);
    
    if (validatedData.status === 'error') {
      throw new Error(validatedData.message || 'API returned error status');
    }
    
    const stats = validatedData.stats || [];
    console.log(`✅ Fetched stats for ${stats.length} divisions`);
    
    // Store in cache
    setCache(cacheKey, stats);
    
    return stats;
  } catch (error) {
    console.error('❌ Error fetching division stats:', error);
    throw error;
  }
}

/**
 * Group teams by division
 * @param teams - Array of registered teams
 * @returns Object with division names as keys and team arrays as values
 */
export function groupTeamsByDivision(teams: RegisteredTeam[]): Record<string, RegisteredTeam[]> {
  return teams.reduce((acc, team) => {
    if (!acc[team.division]) {
      acc[team.division] = [];
    }
    acc[team.division].push(team);
    return acc;
  }, {} as Record<string, RegisteredTeam[]>);
}

/**
 * Get team count for a specific division
 * @param teams - Array of registered teams
 * @param divisionName - Name of the division
 * @returns Number of teams in that division
 */
export function getTeamCountByDivision(teams: RegisteredTeam[], divisionName: string): number {
  return teams.filter(team => team.division === divisionName).length;
}

/**
 * Get confirmed teams only (paid)
 * @param teams - Array of registered teams
 * @returns Array of confirmed teams
 */
export function getConfirmedTeams(teams: RegisteredTeam[]): RegisteredTeam[] {
  return teams.filter(team => team.status === 'confirmed' && team.paymentStatus === 'paid');
}

/**
 * Get pending teams only (awaiting payment)
 * @param teams - Array of registered teams
 * @returns Array of pending teams
 */
export function getPendingTeams(teams: RegisteredTeam[]): RegisteredTeam[] {
  return teams.filter(team => team.status === 'pending');
}

/**
 * Clear cache (useful for testing or manual refresh)
 */
export function clearCache(): void {
  cache.clear();
  console.log('🗑️ Cache cleared');
}

/**
 * Get cache statistics (for debugging)
 */
export function getCacheStats(): { size: number; keys: string[] } {
  return {
    size: cache.size,
    keys: Array.from(cache.keys()),
  };
}
