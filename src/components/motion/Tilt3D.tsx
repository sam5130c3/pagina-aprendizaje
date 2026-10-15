import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import type { PointerEvent, ReactNode } from 'react'

type Tilt3DProps = {
  children: ReactNode
  className?: string
  /** Grados máximos de inclinación en cada eje */
  max?: number
  /** Cuánto se acerca la tarjeta al cursor, en px sobre el eje Z */
  lift?: number
  /** Reflejo que sigue al cursor */
  glare?: boolean
  /** Perspectiva de la escena, en px */
  perspective?: number
}

/**
 * Envoltorio que inclina su contenido en 3D siguiendo al puntero.
 * Se desactiva solo en dispositivos táctiles y con "reducir movimiento".
 */
export default function Tilt3D({
  children,
  className = '',
  max = 12,
  lift = 30,
  glare = true,
  perspective = 1000,
}: Tilt3DProps) {
  const reduce = useReducedMotion()

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const spring = { stiffness: 220, damping: 22, mass: 0.6 }
  const rotateX = useSpring(useMotionValue(0), spring)
  const rotateY = useSpring(useMotionValue(0), spring)
  const z = useSpring(useMotionValue(0), spring)

  const glareX = useMotionTemplate`${px}`
  const glareBg = useMotionTemplate`radial-gradient(circle at calc(${glareX} * 100%) calc(${py} * 100%), rgba(255,255,255,0.35), transparent 55%)`

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType === 'touch') return
    const rect = e.currentTarget.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width
    const ny = (e.clientY - rect.top) / rect.height
    px.set(nx)
    py.set(ny)
    rotateY.set((nx - 0.5) * max * 2)
    rotateX.set(-(ny - 0.5) * max * 2)
    z.set(lift)
  }

  function reset() {
    rotateX.set(0)
    rotateY.set(0)
    z.set(0)
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <div style={{ perspective: `${perspective}px` }} className={className}>
      <motion.div
        onPointerMove={handleMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY, z, transformStyle: 'preserve-3d' }}
        className="relative h-full w-full"
      >
        {children}
        {glare && !reduce && (
          <motion.span
            aria-hidden="true"
            style={{ background: glareBg }}
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 [.group\/tilt:hover_&]:opacity-100"
          />
        )}
      </motion.div>
    </div>
  )
}
