import { ImageResponse } from 'next/og';

import { splitAccolades } from '@/data/roster/accolades';
import { POSITIONS } from '@/data/roster/positions';
import {
  experienceLabel,
  getAllPlayerSlugs,
  getPlayerBySlug,
  positionLabelFor,
  weightLabel,
} from '@/data/roster';

/**
 * The card a player profile renders as when it is shared.
 *
 * Built at request time from roster data rather than being a static club logo,
 * because the whole point of a shareable profile is that the share looks like
 * it is about that player. Kept to flat colour and system-safe type so it
 * renders without shipping a font binary.
 */

export const runtime = 'nodejs';
export const alt = 'Washington Rugby Football Club player profile';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function generateStaticParams() {
  return getAllPlayerSlugs().map((slug) => ({ slug }));
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default async function Image({ params }: { params: { slug: string } }) {
  const player = getPlayerBySlug(params.slug);

  if (!player) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#002B5C',
            color: '#ffffff',
            fontSize: 64,
            fontWeight: 700,
          }}
        >
          Washington Rugby Football Club
        </div>
      ),
      size,
    );
  }

  const { honours, clubRoles } = splitAccolades(player.accolades);
  const accolades = [...honours, ...clubRoles].slice(0, 3);
  const number = player.number ?? POSITIONS[player.positions[0]].numbers[0];
  const stats = [
    player.height && ['Height', player.height],
    weightLabel(player) && ['Weight', weightLabel(player)],
    experienceLabel(player) && ['At WRFC', experienceLabel(player)!.replace(' at WRFC', '')],
  ].filter(Boolean) as [string, string][];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#002B5C',
          color: '#ffffff',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Club red wash. Satori renders linear gradients reliably; radial ones
            it mostly drops, so the diagonal is done with a linear sweep. */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            // Satori only paints a gradient on an element with explicit
            // dimensions — `inset: 0` alone leaves it transparent.
            width: size.width,
            height: size.height,
            backgroundImage:
              'linear-gradient(115deg, rgba(200,16,46,0.9) 0%, rgba(200,16,46,0.3) 40%, rgba(0,43,92,0) 62%, rgba(0,167,181,0.3) 100%)',
            display: 'flex',
          }}
        />

        {/* Club-red edge, so the card is recognisable at thumbnail size. */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 14,
            background: '#C8102E',
            display: 'flex',
          }}
        />

        {/* Oversized shirt number */}
        <div
          style={{
            position: 'absolute',
            right: -30,
            top: -80,
            fontSize: 520,
            fontWeight: 900,
            color: 'rgba(255,255,255,0.06)',
            display: 'flex',
          }}
        >
          {number}
        </div>

        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 64,
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 56,
                height: 56,
                borderRadius: 12,
                background: '#C8102E',
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: 1,
              }}
            >
              {initials(player.name)}
            </div>
            <div
              style={{
                fontSize: 20,
                letterSpacing: 4,
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.65)',
                display: 'flex',
              }}
            >
              Washington Rugby Football Club
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 86, fontWeight: 800, lineHeight: 1.05, display: 'flex' }}>
              {player.name}
            </div>
            <div
              style={{
                marginTop: 12,
                fontSize: 34,
                color: 'rgba(255,255,255,0.8)',
                display: 'flex',
              }}
            >
              {positionLabelFor(player)}
            </div>

            {accolades.length > 0 && (
              <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {accolades.map((accolade) => (
                  <div
                    key={accolade.id}
                    style={{
                      display: 'flex',
                      padding: '10px 20px',
                      borderRadius: 999,
                      border: '2px solid rgba(255,255,255,0.3)',
                      background: 'rgba(255,255,255,0.08)',
                      fontSize: 22,
                      fontWeight: 600,
                    }}
                  >
                    {accolade.shortLabel}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: 48 }}>
            {stats.map(([label, value]) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    fontSize: 16,
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.5)',
                    display: 'flex',
                  }}
                >
                  {label}
                </div>
                <div style={{ fontSize: 30, fontWeight: 700, marginTop: 4, display: 'flex' }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
