import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/database";

/**
 * Server-only administrative Supabase client using the service role key.
 * Strictly forbidden from browser execution.
 */
export function createServerAdminClient(): SupabaseClient<Database> | null {
  if (typeof window !== "undefined") {
    throw new Error(
      "SECURITY VIOLATION: createServerAdminClient must never be invoked from browser context."
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey || url.trim() === "" || serviceKey.trim() === "") {
    return null;
  }

  return createClient<Database>(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
