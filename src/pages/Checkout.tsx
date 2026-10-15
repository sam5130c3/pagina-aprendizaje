import { motion } from 'framer-motion'
import { CreditCard, Loader2, Lock, ShieldCheck } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { HERO_GRADIENT } from '../components/heroGradient'
import { useAuth } from '../context/AuthContext'
import { programs } from '../data/programs'
import { isPaymentsEnabled, isPaymentsTestMode, openCheckout } from '../lib/epayco'

const DOC_TYPES = [
  { value: 'CC', label: 'Cédula de ciudadanía' },
  { value: 'CE', label: 'Cédula de extranjería' },
  { value: 'TI', label: 'Tarjeta de identidad' },
  { value: 'PPN', label: 'Pasaporte' },
  { value: 'NIT', label: 'NIT' },
]

const cop = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

export default function Checkout() {
  const { slug } = useParams()
  const { user, enabled: authEnabled } = useAuth()
  const program = programs.find((p) => p.slug === slug)

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [docType, setDocType] = useState('CC')
  const [docNumber, setDocNumber] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (user) {
      setFullName((v) => v || (user.user_metadata?.full_name ?? ''))
      setEmail((v) => v || (user.email ?? ''))
    }
  }, [user])

  if (!program) return <Navigate to="/programas" replace />
  if (program.comingSoon) return <Navigate to="/programas" replace />

  async function handlePay(e: FormEvent) {
    e.preventDefault()
    if (!program) return
    setError(null)
    setBusy(true)

    // Referencia única para poder rastrear la inscripción en ePayco
    const invoice = `AI-${program.slug.slice(0, 12).toUpperCase()}-${Date.now()}`

    try {
      await openCheckout({
        name: `${program.eyebrow} ${program.name}`,
        description: `Inscripción · ${program.name}`,
        invoice,
        amount: String(program.price),
        nameBilling: fullName,
        emailBilling: email,
        mobilePhone: phone,
        docType,
        docNumber,
        responseUrl: `${window.location.origin}/pago/respuesta`,
        confirmationUrl: import.meta.env.VITE_EPAYCO_CONFIRMATION_URL,
        extra1: program.slug,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No pudimos abrir la pasarela de pagos.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="bg-white">
      <section
        className="relative overflow-hidden rounded-b-[48px] px-6 pt-[130px] pb-20"
        style={{ background: HERO_GRADIENT }}
      >
        <div className="relative z-10 mx-auto w-full max-w-[880px]">
          <h1 className="text-center font-heading leading-[1.05]">
            <span className="block text-2xl font-semibold text-brand-navy sm:text-[34px]">
              Completa tu
            </span>
            <span className="block text-4xl font-black text-brand-blue sm:text-[64px]">
              inscripción
            </span>
          </h1>

          <div className="mt-9 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Formulario */}
            <motion.form
              onSubmit={handlePay}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-white p-7 shadow-[0_18px_50px_rgba(15,32,55,0.12)]"
            >
              <h2 className="font-heading text-lg font-bold text-brand-navy">
                Datos del estudiante
              </h2>

              {authEnabled && !user && (
                <p className="mt-3 rounded-[10px] bg-brand-orange/10 px-3 py-2.5 text-sm text-brand-navy/75">
                  ¿Ya tienes cuenta?{' '}
                  <Link
                    to={`/cuenta?next=/inscripcion/${program.slug}`}
                    className="font-semibold text-brand-orange hover:underline"
                  >
                    Inicia sesión
                  </Link>{' '}
                  para guardar tu inscripción.
                </p>
              )}

              <div className="mt-5 flex flex-col gap-3">
                <input
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nombre completo"
                  className="w-full rounded-[10px] border border-brand-navy/15 px-4 py-3 text-sm outline-none focus:border-brand-orange"
                />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Correo electrónico"
                  className="w-full rounded-[10px] border border-brand-navy/15 px-4 py-3 text-sm outline-none focus:border-brand-orange"
                />
                <div className="grid grid-cols-[130px_1fr] gap-3">
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value)}
                    className="rounded-[10px] border border-brand-navy/15 px-3 py-3 text-sm outline-none focus:border-brand-orange"
                  >
                    {DOC_TYPES.map((d) => (
                      <option key={d.value} value={d.value}>
                        {d.value}
                      </option>
                    ))}
                  </select>
                  <input
                    required
                    inputMode="numeric"
                    value={docNumber}
                    onChange={(e) => setDocNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="Número de documento"
                    className="rounded-[10px] border border-brand-navy/15 px-4 py-3 text-sm outline-none focus:border-brand-orange"
                  />
                </div>
                <input
                  required
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^\d+]/g, ''))}
                  placeholder="Celular"
                  className="w-full rounded-[10px] border border-brand-navy/15 px-4 py-3 text-sm outline-none focus:border-brand-orange"
                />
              </div>

              {error && (
                <p className="mt-4 rounded-[10px] bg-red-50 px-3 py-2 text-sm text-red-600">
                  {error}
                </p>
              )}

              {!isPaymentsEnabled && (
                <p className="mt-4 rounded-[10px] bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-800">
                  La pasarela todavía no está conectada. Pega tu llave pública de ePayco como{' '}
                  <span className="font-semibold">VITE_EPAYCO_PUBLIC_KEY</span> en el archivo{' '}
                  <span className="font-semibold">.env</span> (ver CONFIGURACION.md).
                </p>
              )}

              <button
                type="submit"
                disabled={busy}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-[10px] bg-brand-orange py-3.5 font-semibold text-white transition-colors hover:bg-brand-orange-light disabled:opacity-60"
              >
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
                Pagar {cop.format(program.price)}
              </button>

              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-brand-navy/45">
                <Lock className="h-3.5 w-3.5" />
                Pago seguro procesado por ePayco
              </p>
            </motion.form>

            {/* Resumen */}
            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="h-fit rounded-3xl bg-white p-7 shadow-[0_18px_50px_rgba(15,32,55,0.12)]"
            >
              <h2 className="font-heading text-lg font-bold text-brand-navy">Resumen</h2>

              <div className="mt-4 overflow-hidden rounded-2xl">
                <img src={program.cardImage} alt="" className="h-28 w-full object-cover" />
              </div>

              <p className="mt-4 text-xs font-semibold text-brand-orange">{program.eyebrow}</p>
              <p className="font-heading text-base font-bold text-brand-navy">{program.name}</p>

              <dl className="mt-4 flex flex-col gap-2 border-t border-brand-navy/10 pt-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-brand-navy/55">Modalidad</dt>
                  <dd className="font-medium">{program.modality}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-brand-navy/55">Duración</dt>
                  <dd className="font-medium">{program.durationHours}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-brand-navy/55">Créditos</dt>
                  <dd className="font-medium">{program.credits}</dd>
                </div>
              </dl>

              <div className="mt-4 flex items-baseline justify-between border-t border-brand-navy/10 pt-4">
                <span className="text-sm text-brand-navy/55">Total</span>
                <span className="font-heading text-2xl font-black text-brand-blue">
                  {cop.format(program.price)}
                </span>
              </div>

              <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-brand-navy/50">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                Puedes pagar con tarjeta de crédito o débito, PSE, Nequi, Daviplata, Baloto o Efecty.
              </p>

              {isPaymentsTestMode && isPaymentsEnabled && (
                <p className="mt-3 rounded-[10px] bg-amber-50 px-3 py-2 text-xs text-amber-800">
                  Modo de pruebas activo: no se cobra dinero real.
                </p>
              )}
            </motion.aside>
          </div>
        </div>
      </section>
    </div>
  )
}
