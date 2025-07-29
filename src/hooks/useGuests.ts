import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase, type Guest } from '../../lib/supabase';
import { withDatabaseRetry } from '../lib/retry';

interface GuestStats {
  totalGuests: number;
  thursdayCount: number;
  fridayCount: number;
}

interface UseGuestsReturn {
  guests: Guest[];
  loading: boolean;
  error: string | null;
  stats: GuestStats;
  refetch: () => Promise<void>;
}

export function useGuests(): UseGuestsReturn {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGuests = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      
      const result = await withDatabaseRetry(async () => {
        const { data, error: fetchError } = await supabase
          .from('guests')
          .select('*')
          .order('created_at', { ascending: false });

        if (fetchError) {
          throw new Error(`Erreur lors du chargement des invités: ${fetchError.message}`);
        }
        
        return data || [];
      });
      
      setGuests(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inattendue';
      setError(errorMessage);
      console.error('Erreur lors du chargement des invités:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const stats = useMemo((): GuestStats => ({
    totalGuests: guests.length,
    thursdayCount: guests.filter((g) => g.thursday === true).length,
    fridayCount: guests.filter((g) => g.friday === true).length,
  }), [guests]);

  useEffect(() => {
    fetchGuests();

    const channel = supabase
      .channel('guests_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'guests' },
        () => {
          fetchGuests();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchGuests]);

  return {
    guests,
    loading,
    error,
    stats,
    refetch: fetchGuests,
  };
}