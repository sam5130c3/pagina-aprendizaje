import { motion } from 'framer-motion'
import { CheckCircle2, Clock, Loader2, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { HERO_GRADIENT } from '../components/heroGradient'
import { fetchTransaction, type Transaction } from '../lib/epayco'

const cop = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

export default function PaymentResult() {
  const [params] = useSearchParams()
  const ref = params.get('ref_payco')

  const [tx, setTx] = useState<Transaction | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(Boolean(ref))

  useEffect(() => {
    if (!ref) return
    fetchTransaction(ref)
      .then(setTx)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [ref])

  const estado = tx?.estado ?? ''
  const aceptada = estado === 'Aceptada'
  const pendiente = estado === 'Pendiente'

  const Icon = aceptada ? CheckCircle2 : pendiente ? Clock : XCircle
  const color = aceptada
    ? 'text-emerald-500'
    : pendiente
      ? 'text-amber-500'
      : 'text-red-500'

  const titulo = !ref
    ? 'Sin información de pago'
    : loading
      ? 'Verificando tu pago'
      : error
        ? 'No pudimos verificar el pago'
        : aceptada
          ? '¡Pago aprobado!'
          : pendiente
            ? 'Pago pendiente'
            : 'Pago no aprobado'

  const mensaje = !ref
    ? 'Entra desde el botón de inscripción para iniciar un pago.'
    : loading
      ? 'Estamos consultando el estado de tu transacción con ePayco.'
      : error
        ? error
        : aceptada
          ? 'Tu inscripción quedó registrada. Te enviamos el comprobante a tu correo.'
          : pendiente
            ? 'Tu pago está en validación. Te avisaremos por correo cuando se confirme (los pagos por PSE o efectivo pueden tardar).'
            : `La transacción no se completó: ${tx?.respuesta ?? 'intenta de nuevo'}.`

  return (
    <div className="bg-white">
      <section
        className="relative overflow-hidden rounded-b-[48px] px-6 pt-[130px] pb-20"
        style={{ background: HERO_GRADIENT }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mx-auto w-full max-w-[520px] rounded-3xl bg-white p-8 text-center shadow-[0_18px_50px_rgba(15,32,55,0.12)]"
        >
          {loading ? (
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-brand-orange" />
          ) : (
            <Icon className={`mx-auto h-14 w-14 ${color}`} />
          )}

          <h1 className="mt-4 font-heading text-2xl font-black text-brand-navy">{titulo}</h1>
          <p className="mt-2 text-sm leading-relaxed text-brand-navy/60">{mensaje}</p>

          {tx && (
            <dl className="mt-6 flex flex-col gap-2 rounded-2xl bg-brand-navy/[0.04] p-5 text-left text-sm">
              <Row label="Referencia" value={tx.ref_payco} />
              <Row label="Factura" value={tx.factura} />
              <Row label="Descripción" value={tx.descripcion} />
              <Row label="Valor" value={cop.format(Number(tx.valor))} />
              <Row label="Estado" value={tx.estado} />
              {tx.autorizacion && <Row label="Autorización" value={tx.autorizacion} />}
              {tx.fecha && <Row label="Fecha" value={tx.fecha} />}
            </dl>
          )}

          <div className="mt-7 flex flex-col gap-2">
            <Link to="/programas">
              <button className="w-full rounded-[10px] bg-brand-orange py-3 font-semibold text-white transition-colors hover:bg-brand-orange-light">
                Volver a los programas
              </button>
            </Link>
            <Link to="/cuenta">
              <button className="w-full rounded-[10px] border border-brand-navy/15 py-3 text-sm font-semibold text-brand-navy/70 transition-colors hover:bg-brand-navy/5">
                Ir a mi cuenta
              </button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="shrink-0 text-brand-navy/50">{label}</dt>
      <dd className="text-right font-medium break-all text-brand-navy">{value}</dd>
    </div>
  )
}
