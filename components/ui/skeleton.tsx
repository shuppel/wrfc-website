'use client';

import { cn } from '@/app/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-200 dark:bg-gray-900',
        className
      )}
      {...props}
    />
  );
}

export { Skeleton }; 