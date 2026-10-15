import type { Session, User } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { isAuthEnabled, supabase } from '../lib/supabase'

type AuthResult = { error: string | null; info?: string | null }

type AuthContextValue = {
  user: User | null
  session: Session | null
  loading: boolean
  enabled: boolean
  signUp: (email: string, password: string, fullName: string) => Promise<AuthResult>
  signIn: (email: string, password: string) => Promise<AuthResult>
  signInWithGoogle: () => Promise<AuthResult>
  resetPassword: (email: string) => Promise<AuthResult>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

/** Traduce los errores de Supabase a mensajes claros en español. */
function translate(message: string): string {
  const map: Record<string, string> = {
    'Invalid login credentials': 'Correo o contraseña incorrectos.',
    'Email not confirmed': 'Debes confirmar tu correo antes de iniciar sesión.',
    'User already registered': 'Ya existe una cuenta con este correo.',
    'Password should be at least 6 characters.':
      'La contraseña debe tener al menos 6 caracteres.',
  }
  return map[message] ?? message
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(isAuthEnabled)

  useEffect(() => {
    if (!supabase) return

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
      setLoading(false)
    })

    return () => sub.subscription.unsubscribe()
  }, [])

  const value = useMemo<AuthContextValue>(() => {
    const notConfigured: AuthResult = {
      error: 'El registro aún no está configurado. Falta conectar el proyecto de Supabase.',
    }

    return {
      user: session?.user ?? null,
      session,
      loading,
      enabled: isAuthEnabled,

      async signUp(email, password, fullName) {
        if (!supabase) return notConfigured
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: `${window.location.origin}/cuenta`,
          },
        })
        if (error) return { error: translate(error.message) }
        // Si el proyecto pide confirmación por correo no hay sesión todavía.
        if (!data.session) {
          return {
            error: null,
            info: 'Te enviamos un correo para confirmar tu cuenta. Revisa tu bandeja de entrada.',
          }
        }
        return { error: null }
      },

      async signIn(email, password) {
        if (!supabase) return notConfigured
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        return { error: error ? translate(error.message) : null }
      },

      async signInWithGoogle() {
        if (!supabase) return notConfigured
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: { redirectTo: `${window.location.origin}/cuenta` },
        })
        return { error: error ? translate(error.message) : null }
      },

      async resetPassword(email) {
        if (!supabase) return notConfigured
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/cuenta`,
        })
        if (error) return { error: translate(error.message) }
        return { error: null, info: 'Te enviamos un correo para restablecer tu contraseña.' }
      },

      async signOut() {
        await supabase?.auth.signOut()
      },
    }
  }, [session, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
