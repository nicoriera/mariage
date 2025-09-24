import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase, type Guest } from "../../lib/supabase";
import { withDatabaseRetry } from "../lib/retry";

interface GuestStats {
  totalGuests: number;
  thursdayCount: number;
}

interface UseGuestsReturn {
  guests: Guest[];
  loading: boolean;
  error: string | null;
  stats: GuestStats;
  refetch: () => Promise<void>;
  deleteGuest: (id: string) => Promise<{ success: boolean; error?: string }>;
  updateGuest: (
    id: string,
    data: Partial<Guest>
  ) => Promise<{ success: boolean; error?: string }>;
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
          .from("guests")
          .select("*")
          .order("created_at", { ascending: false });

        if (fetchError) {
          throw new Error(
            `Erreur lors du chargement des convives: ${fetchError.message}`
          );
        }

        return data || [];
      });

      setGuests(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erreur inattendue";
      setError(errorMessage);
      console.error("Erreur lors du chargement des convives:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteGuest = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/guests?id=${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: result.error || "Erreur lors de la suppression",
        };
      }

      // Mettre à jour la liste locale
      setGuests((prev) => prev.filter((guest) => guest.id !== id));

      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erreur inattendue";
      return { success: false, error: errorMessage };
    }
  }, []);

  const updateGuest = useCallback(async (id: string, data: Partial<Guest>) => {
    try {
      const response = await fetch("/api/guests", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...data }),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: result.error || "Erreur lors de la modification",
        };
      }

      // Mettre à jour la liste locale
      setGuests((prev) =>
        prev.map((guest) => (guest.id === id ? { ...guest, ...data } : guest))
      );

      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erreur inattendue";
      return { success: false, error: errorMessage };
    }
  }, []);

  const stats = useMemo(
    (): GuestStats => ({
      totalGuests: guests.length,
      thursdayCount: guests.filter((g) => g.thursday === true).length,
    }),
    [guests]
  );

  useEffect(() => {
    fetchGuests();

    const channel = supabase
      .channel("guests_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "guests" },
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
    deleteGuest,
    updateGuest,
  };
}
