import { useEffect, useState } from 'react';
import { getAllAlumniSpotlights, getFeaturedAlumniSpotlights, AlumniSpotlight } from '@/lib/contentful';

export function useAlumniSpotlights() {
  const [spotlights, setSpotlights] = useState<AlumniSpotlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSpotlights() {
      try {
        const data = await getAllAlumniSpotlights();
        setSpotlights(data);
      } catch (err) {
        setError('Failed to load alumni spotlights');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchSpotlights();
  }, []);

  return { spotlights, loading, error };
}

export function useFeaturedAlumniSpotlights() {
  const [spotlights, setSpotlights] = useState<AlumniSpotlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSpotlights() {
      try {
        const data = await getFeaturedAlumniSpotlights();
        setSpotlights(data);
      } catch (err) {
        setError('Failed to load featured alumni spotlights');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchSpotlights();
  }, []);

  return { spotlights, loading, error };
}