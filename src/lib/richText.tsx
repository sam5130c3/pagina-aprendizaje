import type { ReactNode } from 'react'

/** Convierte los tramos entre `**` en negrita. El resto del texto no cambia. */
export function renderInline(text: string): ReactNode[] {
  return text.split('**').map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-bold">
        {part}
      </strong>
    ) : (
      part
    ),
  )
}
