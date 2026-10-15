import { motion } from 'framer-motion'
import { Loader2, Lock, LogOut, Mail, User as UserIcon } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import GoogleIcon from '../components/GoogleIcon'
import { HERO_GRADIENT } from '../components/heroGradient'
import { useAuth } from '../context/AuthContext'

type Mode = 'login' | 'signup'

export default function Account() {
  const { user, loading, enabled, signIn, signUp, signInWithGoogle, resetPassword, signOut } =
    useAuth()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const next = params.get('next')

  const [mode, setMode] = useState<Mode>(params.get('modo') === 'registro' ? 'signup' : 'login')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    setInfo(null)

    const res =
      mode === 'signup'
        ? await signUp(email, password, fullName)
        : await signIn(email, password)

    setBusy(false)
    if (res.error) {
      setError(res.error)
      return
    }
    if (res.info) {
      setInfo(res.info)
      return
    }
    navigate(next || '/programas')
  }

  async function handleGoogle() {
    setBusy(true)
    setError(null)
    const res = await signInWithGoogle()
    setBusy(false)
    if (res.error) setError(res.error)
  }

  async function handleReset() {
    if (!email) {
      setError('Escribe tu correo para enviarte el enlace de recuperación.')
      return
    }
    setBusy(true)
    setError(null)
    setInfo(null)
    const res = await resetPassword(email)
    setBusy(false)
    if (res.error) setError(res.error)
    else setInfo(res.info ?? null)
  }

  return (
    <div className="bg-white">
      <section
        className="relative overflow-hidden rounded-b-[48px] px-6 pt-[130px] pb-20"
        style={{ background: HERO_GRADIENT }}
      >
        <div className="relative z-10 mx-auto w-full max-w-[440px]">
          <h1 className="text-center font-heading leading-[1.05]">
            <span className="block text-2xl font-semibold text-brand-navy sm:text-[34px]">
              {user ? 'Tu cuenta en' : mode === 'signup' ? 'Crea tu cuenta en' : 'Ingresa a'}
            </span>
            <span className="block text-4xl font-black text-brand-blue sm:text-[56px]">
              Aprendizaje Interactivo
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 rounded-3xl bg-white p-7 shadow-[0_18px_50px_rgba(15,32,55,0.12)]"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2 py-8 text-brand-navy/60">
                <Loader2 className="h-5 w-5 animate-spin" />
                Cargando…
              </div>
            ) : user ? (
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
                  <UserIcon className="h-7 w-7" />
                </div>
                <p className="mt-4 font-heading text-lg font-bold text-brand-navy">
                  {user.user_metadata?.full_name || 'Estudiante'}
                </p>
                <p className="text-sm text-brand-navy/60">{user.email}</p>

                <Link to="/programas">
                  <button className="mt-6 w-full rounded-[10px] bg-brand-orange py-3 font-semibold text-white transition-colors hover:bg-brand-orange-light">
                    Ver programas e inscribirme
                  </button>
                </Link>
                <button
                  onClick={signOut}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-[10px] border border-brand-navy/15 py-3 text-sm font-semibold text-brand-navy/70 transition-colors hover:bg-brand-navy/5"
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6 grid grid-cols-2 gap-1 rounded-full bg-brand-navy/5 p-1">
                  {(['login', 'signup'] as Mode[]).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        setMode(m)
                        setError(null)
                        setInfo(null)
                      }}
                      className={`rounded-full py-2 text-sm font-semibold transition-colors ${
                        mode === m ? 'bg-white text-brand-navy shadow-sm' : 'text-brand-navy/55'
                      }`}
                    >
                      {m === 'login' ? 'Iniciar sesión' : 'Registrarme'}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleGoogle}
                  disabled={busy}
                  className="flex w-full items-center justify-center gap-3 rounded-[10px] border border-brand-navy/15 py-3 font-semibold text-brand-navy transition-colors hover:bg-brand-navy/5 disabled:opacity-60"
                >
                  <GoogleIcon className="h-5 w-5" />
                  Continuar con Google
                </button>

                <div className="my-5 flex items-center gap-3 text-xs text-brand-navy/40">
                  <span className="h-px flex-1 bg-brand-navy/10" />o con tu correo
                  <span className="h-px flex-1 bg-brand-navy/10" />
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  {mode === 'signup' && (
                    <label className="relative block">
                      <UserIcon className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-brand-navy/35" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Nombre completo"
                        className="w-full rounded-[10px] border border-brand-navy/15 py-3 pr-4 pl-10 text-sm outline-none focus:border-brand-orange"
                      />
                    </label>
                  )}

                  <label className="relative block">
                    <Mail className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-brand-navy/35" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Correo electrónico"
                      className="w-full rounded-[10px] border border-brand-navy/15 py-3 pr-4 pl-10 text-sm outline-none focus:border-brand-orange"
                    />
                  </label>

                  <label className="relative block">
                    <Lock className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-brand-navy/35" />
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Contraseña (mínimo 6 caracteres)"
                      className="w-full rounded-[10px] border border-brand-navy/15 py-3 pr-4 pl-10 text-sm outline-none focus:border-brand-orange"
                    />
                  </label>

                  {error && (
                    <p className="rounded-[10px] bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
                  )}
                  {info && (
                    <p className="rounded-[10px] bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                      {info}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={busy}
                    className="mt-1 inline-flex items-center justify-center gap-2 rounded-[10px] bg-brand-blue py-3 font-semibold text-white transition-opacity disabled:opacity-60"
                  >
                    {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                    {mode === 'signup' ? 'Crear cuenta' : 'Entrar'}
                  </button>

                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-xs font-medium text-brand-navy/50 hover:text-brand-navy"
                    >
                      Olvidé mi contraseña
                    </button>
                  )}
                </form>

                {!enabled && (
                  <p className="mt-5 rounded-[10px] bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-800">
                    El registro todavía no está conectado. Sigue los pasos de{' '}
                    <span className="font-semibold">CONFIGURACION.md</span> para crear el proyecto de
                    Supabase y pegar las llaves en el archivo <span className="font-semibold">.env</span>.
                  </p>
                )}
              </>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
