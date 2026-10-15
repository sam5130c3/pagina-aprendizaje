import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import type { PointerEvent, ReactNode } from 'react'

/**
 * Atrae ligeramente al elemento hacia el cursor y lo empuja en el eje Z.
 * Pensado para botones y llamadas a la acción.
 */
export default function Magnetic({
  children,
  className = '',
  strength = 0.35,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const reduce = useReducedMotion()
  const spring = { stiffness: 260, damping: 18, mass: 0.5 }
  const x = useSpring(useMotionValue(0), spring)
  const y = useSpring(useMotionValue(0), spring)
  const z = useSpring(useMotionValue(0), spring)

  function move(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType === 'touch') return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
    z.set(24)
  }

  function reset() {
    x.set(0)
    y.set(0)
    z.set(0)
  }

  return (
    <motion.div
      onPointerMove={move}
      onPointerLeave={reset}
      style={{ x, y, z, transformStyle: 'preserve-3d', perspective: 600 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}
