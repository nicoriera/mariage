import { createClient } from "@supabase/supabase-js";
import { env } from "../src/lib/env";

export const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export type Guest = {
  id?: number;
  name: string;
  thursday: boolean | null;
  friday: boolean | null;
  message: string | null;
  created_at?: string;
};
