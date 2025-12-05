'use client';

import { Card } from '@/components/ui/card';
import { MapPin, Calendar } from '@phosphor-icons/react';
import {
  type RegisteredTeam,
  getStatusBadgeColor,
  getStatusLabel,
  formatRegistrationDate,
} from '@/types/tournament';

interface TeamCardProps {
  team: RegisteredTeam;
}

export default function TeamCard({ team }: TeamCardProps) {
  const statusColor = getStatusBadgeColor(team.status);
  const statusLabel = getStatusLabel(team.status, team.paymentStatus);

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-wrfc-navy dark:text-white mb-2">
            {team.teamName}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {team.division}
          </p>
        </div>
        <span className={`${statusColor} px-3 py-1 rounded-full text-xs font-semibold`}>
          {statusLabel}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <MapPin className="w-4 h-4 text-wrfc-red flex-shrink-0" />
          <span>
            {team.city}, {team.state}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <Calendar className="w-4 h-4 text-wrfc-red flex-shrink-0" />
          <span>Registered {formatRegistrationDate(team.registrationDate)}</span>
        </div>
      </div>
    </Card>
  );
}
