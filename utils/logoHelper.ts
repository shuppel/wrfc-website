export const DEFAULT_TEAM_LOGO = '/logos/mys-team.png'
export const WRFC_LOGO = '/logos/wrfc_logo.png'

export function getTeamLogo(logoPath: string | undefined): string {
  // Always return the default logo if no logo path is provided
  if (!logoPath || logoPath.trim() === '') {
    return DEFAULT_TEAM_LOGO
  }
  
  // Return the provided logo path
  return logoPath
}

export function isWRFCTeam(teamName: string): boolean {
  const wrfcNames = [
    'wrfc',
    'washington rugby',
    'washington rfc',
    'washington rugby football club',
    'washington md1',
    'washington md3'
  ]
  const normalizedName = teamName.toLowerCase().trim()
  return wrfcNames.some(name => normalizedName.includes(name))
}

export function getLogoForTeam(teamName: string, logoPath?: string): string {
  // First check if it's a WRFC team
  if (isWRFCTeam(teamName)) {
    return WRFC_LOGO
  }
  
  // For all other teams, use the provided logo or fall back to default
  return getTeamLogo(logoPath)
} 