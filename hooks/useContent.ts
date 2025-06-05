'use client';

import { useState, useEffect } from 'react';

// Hook for fetching content from the API
export function useContent<T>(contentType: 'blog' | 'player' | 'membership', slug?: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Build the API URL with query parameters
        const params = new URLSearchParams();
        params.append('type', contentType);
        if (slug) {
          params.append('slug', slug);
        }

        const response = await fetch(`/api/content?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.status} ${response.statusText}`);
        }
        
        const contentData = await response.json();
        setData(contentData);
      } catch (err) {
        console.error('Error fetching content:', err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [contentType, slug]);

  return { data, isLoading, error };
}

// Example usage:
// const { data: blogPosts, isLoading, error } = useContent<BlogPost[]>('blog');
// const { data: playerProfile, isLoading, error } = useContent<PlayerProfile>('player', 'john-doe');