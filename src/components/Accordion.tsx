import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { renderInline } from '../lib/richText'

type AccordionItem = {
  /** Si se define, la sección se puede enlazar con #id */
  id?: string
  title: string
  content: string
  /** Contenido libre: si existe, se muestra en lugar de `content` */
  node?: ReactNode
}

type AccordionProps = {
  items: AccordionItem[]
  defaultOpen?: number
  /**
   * `pill`: preguntas frecuentes de la portada. `card`: información del programa.
   * `compact`: preguntas anidadas dentro de una tarjeta.
   */
  variant?: 'pill' | 'card' | 'compact'
  /** En pantallas grandes reparte los items en dos columnas */
  columns?: boolean
}

/**
 * Bloque de texto del contenido. Formato mínimo:
 * - líneas que empiezan con "- " son viñetas,
 * - líneas que empiezan con "# " son subtítulos,
 * - "**texto**" pone negrita,
 * - cualquier otra línea es un párrafo.
 */
function Block({ text }: { text: string }) {
  const lines = text.split('\n')
  const out: ReactNode[] = []
  let bullets: string[] = []

  const flush = () => {
    if (!bullets.length) return
    out.push(
      <ul key={`ul-${out.length}`} className="list-disc space-y-1 pl-5 marker:text-brand-sky">
        {bullets.map((b, i) => (
          <li key={i}>{renderInline(b)}</li>
        ))}
      </ul>,
    )
    bullets = []
  }

  for (const line of lines) {
    if (line.startsWith('- ')) {
      bullets.push(line.slice(2))
      continue
    }
    flush()
    if (line.startsWith('# ')) {
      out.push(
        <h4 key={out.length} className="font-heading text-[16px] font-bold text-brand-sky sm:text-[18px]">
          {line.slice(2)}
        </h4>,
      )
    } else {
      out.push(<p key={out.length}>{renderInline(line)}</p>)
    }
  }
  flush()

  return <div className="flex flex-col gap-1.5">{out}</div>
}

const shapes = {
  pill: 'rounded-[26px] sm:rounded-[32px]',
  card: 'rounded-[22px]',
  compact: 'rounded-[16px]',
}

const titles = {
  pill: 'text-[14px] leading-snug text-brand-navy/90 sm:text-[17px]',
  card: 'font-heading text-lg font-bold text-brand-blue sm:text-[26px]',
  compact: 'text-[13px] leading-snug text-brand-navy sm:text-[14.5px]',
}

const buttons = {
  pill: 'gap-5 px-6 py-5 sm:px-9 sm:py-6',
  card: 'gap-5 px-6 py-5 sm:px-9 sm:py-6',
  compact: 'gap-3 px-4 py-3.5 sm:px-5',
}

const bodies = {
  pill: 'px-6 pb-7 text-[14px] sm:px-9 sm:pb-9 sm:text-[16px]',
  card: 'px-6 pb-7 text-[14px] text-brand-navy sm:px-9 sm:pb-9 sm:text-[16px]',
  compact: 'px-4 pb-5 text-[13px] sm:px-5 sm:text-[14px]',
}

export default function Accordion({
  items,
  defaultOpen = -1,
  variant = 'pill',
  columns = false,
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState(defaultOpen)
  const compact = variant === 'compact'

  return (
    <div
      className={columns ? 'flex flex-col gap-4 lg:block lg:columns-2 lg:gap-5' : `flex flex-col ${compact ? 'gap-4' : 'gap-5'}`}
      style={{ perspective: '1400px' }}
    >
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <motion.div
            key={item.title + i}
            id={item.id}
            initial={{ opacity: 0, y: 26, rotateX: -12 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: (compact ? 0 : i) * 0.07, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
            className={`scroll-mt-28 overflow-hidden bg-brand-mist shadow-[0_10px_22px_-12px_rgba(10,24,44,0.45)] transition-shadow duration-500 hover:shadow-[0_18px_34px_-14px_rgba(10,24,44,0.5)] ${shapes[variant]} ${
              columns ? 'lg:mb-5 lg:break-inside-avoid' : ''
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className={`group flex w-full cursor-pointer items-center justify-between text-left ${buttons[variant]}`}
            >
              <span className={titles[variant]}>{item.title}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`flex shrink-0 transition-transform duration-300 group-hover:scale-125 ${
                  variant === 'card' ? 'text-brand-orange' : 'text-brand-sky'
                }`}
              >
                <ChevronDown
                  className={compact ? 'h-5 w-5' : 'h-6 w-6 sm:h-8 sm:w-8'}
                  strokeWidth={compact ? 2.2 : 2.4}
                />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{ y: -10 }}
                    animate={{ y: 0 }}
                    exit={{ y: -10 }}
                    transition={{ duration: 0.4 }}
                    className={`flex flex-col gap-4 leading-relaxed ${
                      variant === 'pill' ? 'text-brand-navy/75' : 'text-brand-navy'
                    } ${bodies[variant]}`}
                  >
                    {item.node ??
                      item.content.split('\n\n').map((block, k) => <Block key={k} text={block} />)}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
