import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/database";

let browserClient: SupabaseClient<Database> | null = null;

/**
 * Checks whether Supabase environment variables are properly configured.
 */
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return Boolean(
    url &&
      key &&
      url.trim().length > 0 &&
      key.trim().length > 0 &&
      !url.includes("your-project.supabase.co")
  );
}

/**
 * Creates or retrieves the singleton Supabase browser client.
 * Returns null if Supabase environment variables are not configured,
 * allowing UI and services to fall back gracefully to local verified records.
 */
export function getSupabaseBrowserClient(): SupabaseClient<Database> | null {
  if (typeof window === "undefined") {
    // For server runtime, use createServerClient instead
    return createServerSupabaseClient();
  }

  if (browserClient) {
    return browserClient;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key || url.trim() === "" || key.trim() === "") {
    return null;
  }

  browserClient = createClient<Database>(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });

  return browserClient;
}

/**
 * Helper to get a server-side read client using public publishable key.
 * Never exposes service role key to the browser.
 */
export function createServerSupabaseClient(): SupabaseClient<Database> | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key || url.trim() === "" || key.trim() === "") {
    return null;
  }

  return createClient<Database>(url, key, {
    auth: {
      persistSession: false,
    },
  });
}
