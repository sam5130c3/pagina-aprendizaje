import { motion } from 'framer-motion'
import { MonitorPlay, Pin } from 'lucide-react'

type Cell =
  | { kind: 'text'; title: string; notes?: string[] }
  | { kind: 'session'; ordinal: string; module: string }

type Tone = 'empty' | 'module0' | 'module1' | 'module2'

const weekdays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

const session = (ordinal: string, module: string): Cell => ({ kind: 'session', ordinal, module })
const text = (title: string, notes?: string[]): Cell => ({ kind: 'text', title, notes })

// Lunes a domingo; `null` es una celda vacía
const rows: { tone: Tone; cells: (Cell | null)[] }[] = [
  { tone: 'empty', cells: [null, null, null, null, null, null, null] },
  {
    tone: 'module0',
    cells: [
      text('Apertura del módulo 0'),
      null,
      null,
      null,
      null,
      null,
      text('Finalización del módulo 0'),
    ],
  },
  {
    tone: 'module1',
    cells: [
      text('Apertura del módulo 1'),
      session('Primera', 'M1'),
      null,
      session('Segunda', 'M1'),
      null,
      null,
      null,
    ],
  },
  {
    tone: 'module1',
    cells: [
      null,
      session('Tercera', 'M1'),
      null,
      session('Cuarta', 'M1'),
      null,
      null,
      text('Finalización del módulo 1', ['Fecha máxima de:', '• Entrega de Reto', '• Evaluación']),
    ],
  },
  {
    tone: 'module2',
    cells: [
      text('Apertura del módulo 2'),
      session('Primera', 'M2'),
      null,
      session('Segunda', 'M2'),
      null,
      null,
      null,
    ],
  },
  {
    tone: 'module2',
    cells: [null, session('Tercera', 'M2'), null, session('Cuarta', 'M2'), null, null, null],
  },
]

const tones: Record<Tone, string> = {
  empty: 'bg-[#cdcdcd] h-16 sm:h-[88px]',
  module0: 'bg-[#f8b97c] h-14 sm:h-[60px]',
  module1: 'bg-brand-orange h-16 sm:h-[84px]',
  module2: 'bg-[#9fd4f7] h-16 sm:h-[84px]',
}

const reminders = [
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna',
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed',
  'sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna',
]

function CellContent({ cell }: { cell: Cell }) {
  if (cell.kind === 'session') {
    return (
      <span className="flex items-center gap-1.5 text-left">
        <MonitorPlay className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden="true" />
        <span>
          <b>{cell.ordinal}</b> sesión sincrónica <b>{cell.module}</b>
        </span>
      </span>
    )
  }
  return (
    <span className="flex flex-col items-center">
      <b>{cell.title}</b>
      {cell.notes?.map((n) => (
        <span key={n} className="text-[8px] font-normal sm:text-[9px]">
          {n}
        </span>
      ))}
    </span>
  )
}

/**
 * Calendario académico del módulo: semana a semana, con la apertura de cada
 * módulo, las sesiones sincrónicas y las fechas de cierre.
 */
export default function AcademicCalendar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: 'top center' }}
      className="relative rounded-[24px] bg-gradient-to-b from-brand-sky to-brand-blue px-3 pt-12 pb-5 shadow-[0_30px_60px_-28px_rgba(10,24,44,0.6)] sm:rounded-[28px] sm:px-6 sm:pt-14"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 rounded-b-[20px] bg-gradient-to-b from-[#f7a23b] to-brand-orange px-12 py-1.5 font-heading text-lg font-black text-white shadow-md sm:px-16 sm:text-2xl">
        Mes #1
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[640px]">
          <div className="grid grid-cols-7 gap-px bg-white">
            {weekdays.map((d) => (
              <div
                key={d}
                className="bg-[#0b1a2e] py-1 text-center font-heading text-[11px] font-bold text-white sm:text-[13px]"
              >
                {d}
              </div>
            ))}
            {rows.map((row, r) =>
              row.cells.map((cell, c) => (
                <div
                  key={`${r}-${c}`}
                  className={`flex items-center justify-center px-1.5 text-center font-heading text-[9px] leading-tight text-black sm:text-[11px] ${tones[row.tone]}`}
                >
                  {cell && <CellContent cell={cell} />}
                </div>
              )),
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center gap-4 sm:flex-row sm:gap-8 sm:px-4">
        <div className="flex shrink-0 flex-col items-center">
          <span className="flex items-center gap-2 font-heading text-2xl font-black text-brand-orange [text-shadow:0_0_6px_#fff,0_0_2px_#fff] sm:text-[32px]">
            <Pin className="h-6 w-6 -rotate-45 text-white sm:h-7 sm:w-7" aria-hidden="true" />
            ¡Recuerda!
          </span>
          <span className="mt-0.5 h-0.5 w-full rounded-full bg-brand-sky" />
        </div>
        <ul className="list-disc space-y-0.5 pl-4 text-[11px] leading-snug text-white sm:text-[12.5px]">
          {reminders.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
