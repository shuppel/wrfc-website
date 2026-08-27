import {
  ArrowSquareOut,
  Globe,
  InstagramLogo,
  LinkedinLogo,
  PersonSimpleRun,
  XLogo,
} from '@phosphor-icons/react/dist/ssr';

import { socialProfiles } from '@/data/roster';
import type { SocialProfile } from '@/data/roster';
import type { Player } from '@/data/roster/types';

const ICONS: Record<SocialProfile['id'], typeof Globe> = {
  instagram: InstagramLogo,
  x: XLogo,
  linkedin: LinkedinLogo,
  strava: PersonSimpleRun,
  website: Globe,
};

/**
 * A player's own links, shown only where they opted in. Nothing here is
 * discovered or inferred — a handle appears because the player sent it.
 */
export function PlayerSocialLinks({ player }: { player: Player }) {
  const profiles = socialProfiles(player);
  if (profiles.length === 0) return null;

  return (
    <div>
      <h2 className="mb-3 font-accent text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
        Follow {player.name.split(' ')[0]}
      </h2>
      <ul className="flex flex-wrap gap-2">
        {profiles.map((profile) => {
          const Icon = ICONS[profile.id];
          return (
            <li key={profile.id}>
              <a
                href={profile.url}
                target="_blank"
                rel="me noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3.5 py-2 text-sm text-gray-700 transition-colors hover:border-wrfc-red hover:text-wrfc-red dark:border-white/15 dark:text-gray-200"
              >
                <Icon weight="fill" className="h-4 w-4" />
                <span>{profile.handle}</span>
                <ArrowSquareOut className="h-3.5 w-3.5 opacity-50" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PlayerSocialLinks;
