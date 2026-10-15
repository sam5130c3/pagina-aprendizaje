/**
 * Integración con la pasarela de pagos ePayco (Colombia).
 *
 * Usa el "Checkout Onpage" oficial: se carga checkout.js y se abre la ventana
 * de pago con la llave PÚBLICA del comercio (esa llave está pensada para ir en
 * el navegador; la privada nunca debe publicarse aquí).
 *
 * Docs: https://docs.epayco.co/payments/checkout
 */

const SCRIPT_SRC = 'https://checkout.epayco.co/checkout.js'

const PUBLIC_KEY = import.meta.env.VITE_EPAYCO_PUBLIC_KEY as string | undefined
// En pruebas los pagos no mueven dinero real. Pon VITE_EPAYCO_TEST=false para producción.
const TEST_MODE = import.meta.env.VITE_EPAYCO_TEST !== 'false'

export const isPaymentsEnabled = Boolean(PUBLIC_KEY)
export const isPaymentsTestMode = TEST_MODE

type EpaycoHandler = { open: (data: Record<string, string>) => void }
type EpaycoGlobal = {
  checkout: { configure: (opts: { key: string; test: boolean }) => EpaycoHandler }
}

declare global {
  interface Window {
    ePayco?: EpaycoGlobal
  }
}

let loader: Promise<EpaycoGlobal> | null = null

function loadCheckout(): Promise<EpaycoGlobal> {
  if (window.ePayco) return Promise.resolve(window.ePayco)
  if (loader) return loader

  loader = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`)
    const script = existing ?? document.createElement('script')

    script.onload = () => {
      if (window.ePayco) resolve(window.ePayco)
      else reject(new Error('ePayco se cargó pero no expuso el checkout.'))
    }
    script.onerror = () => {
      loader = null
      reject(new Error('No se pudo cargar la pasarela de pagos. Revisa tu conexión.'))
    }

    if (!existing) {
      script.src = SCRIPT_SRC
      script.async = true
      document.body.appendChild(script)
    }
  })

  return loader
}

export type CheckoutData = {
  /** Nombre del programa que se está pagando */
  name: string
  description: string
  /** Referencia única de la inscripción (queda en la factura de ePayco) */
  invoice: string
  /** Valor en pesos, sin puntos ni decimales. Ej: "1200000" */
  amount: string
  /** Datos de facturación del estudiante */
  nameBilling: string
  emailBilling: string
  mobilePhone: string
  docType: string
  docNumber: string
  /** A dónde vuelve el usuario después de pagar */
  responseUrl: string
  /** Webhook de tu servidor que confirma el pago (opcional pero recomendado) */
  confirmationUrl?: string
  /** Dato libre que te devuelve ePayco en la confirmación */
  extra1?: string
}

export async function openCheckout(data: CheckoutData): Promise<void> {
  if (!PUBLIC_KEY) {
    throw new Error(
      'Falta la llave pública de ePayco. Agrégala como VITE_EPAYCO_PUBLIC_KEY en el archivo .env.',
    )
  }

  const ePayco = await loadCheckout()
  const handler = ePayco.checkout.configure({ key: PUBLIC_KEY, test: TEST_MODE })

  handler.open({
    name: data.name,
    description: data.description,
    invoice: data.invoice,
    currency: 'cop',
    amount: data.amount,
    tax: '0',
    tax_base: '0',
    tax_ico: '0',
    country: 'co',
    lang: 'es',
    // false = la pasarela se abre encima de la página (onpage)
    external: 'false',
    response: data.responseUrl,
    ...(data.confirmationUrl ? { confirmation: data.confirmationUrl } : {}),
    name_billing: data.nameBilling,
    email_billing: data.emailBilling,
    type_doc_billing: data.docType,
    number_doc_billing: data.docNumber,
    mobilephone_billing: data.mobilePhone,
    ...(data.extra1 ? { extra1: data.extra1 } : {}),
  })
}

export type TransactionState =
  | 'Aceptada'
  | 'Rechazada'
  | 'Pendiente'
  | 'Fallida'
  | 'Abandonada'
  | 'Cancelada'
  | 'Expirada'

export type Transaction = {
  ref_payco: string
  factura: string
  descripcion: string
  valor: string
  estado: TransactionState | string
  respuesta: string
  autorizacion: string
  recibo: string
  fecha: string
  franquicia: string
  cliente: string
  email: string
}

/**
 * Consulta el estado real de una transacción en ePayco a partir del ref_payco
 * que la pasarela agrega a la URL de respuesta. Es un endpoint público.
 */
export async function fetchTransaction(refPayco: string): Promise<Transaction> {
  const res = await fetch(`https://secure.epayco.co/validation/v1/reference/${refPayco}`)
  if (!res.ok) throw new Error('No pudimos consultar el estado del pago.')

  const json = (await res.json()) as { success: boolean; data: Transaction }
  if (!json.success) throw new Error('No encontramos esta transacción.')

  return json.data
}
