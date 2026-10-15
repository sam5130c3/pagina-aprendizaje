type ArcDividerProps = {
  /** Color del bloque que invade la sección (normalmente el de la sección vecina) */
  color?: string
  /** `top`: el bloque baja desde arriba. `bottom`: sube desde abajo. */
  side?: 'top' | 'bottom'
  /** Línea fina de acompañamiento, como en la propuesta */
  hairline?: string
  className?: string
}

/**
 * Borde curvo suave que separa la banda azul del resto de la página,
 * igual que en la propuesta: un arco muy abierto más una línea fina paralela.
 */
export default function ArcDivider({
  color = '#ffffff',
  side = 'top',
  hairline = 'rgba(34,132,216,0.55)',
  className = '',
}: ArcDividerProps) {
  const isTop = side === 'top'

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 z-10 h-14 sm:h-24 ${
        isTop ? 'top-0 -translate-y-px' : 'bottom-0 translate-y-px'
      } ${className}`}
    >
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="h-full w-full">
        {isTop ? (
          <>
            <path d="M0,0 H1440 V52 Q720,104 0,52 Z" fill={color} />
            <path
              d="M0,64 Q720,116 1440,64"
              fill="none"
              stroke={hairline}
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </>
        ) : (
          <>
            <path d="M0,120 H1440 V68 Q720,16 0,68 Z" fill={color} />
            <path
              d="M0,56 Q720,4 1440,56"
              fill="none"
              stroke={hairline}
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </>
        )}
      </svg>
    </div>
  )
}
