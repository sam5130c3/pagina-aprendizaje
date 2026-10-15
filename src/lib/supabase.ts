import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * El cliente solo se crea si el proyecto está configurado en el .env.
 * Así la web sigue funcionando (sin login) mientras no existan las llaves.
 */
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null

export const isAuthEnabled = Boolean(supabase)
