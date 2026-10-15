import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useEffect, useMemo } from 'react'

type Particle = {
  x: number
  y: number
  z: number
  size: number
  delay: number
  duration: number
  ring: boolean
}

/** Generador determinista: el campo se ve igual en cada render. */
function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

/**
 * Campo de partículas colocadas a distintas profundidades reales (translateZ).
 * La escena entera gira suavemente con el puntero, así que las partículas
 * cercanas se desplazan más que las lejanas: paralaje 3D auténtico.
 */
export default function DepthField({
  count = 26,
  className = '',
  color = 'rgba(255,255,255,0.75)',
  spread = 900,
}: {
  count?: number
  className?: string
  color?: string
  spread?: number
}) {
  const reduce = useReducedMotion()

  const particles = useMemo<Particle[]>(() => {
    const rnd = seeded(20260908)
    return Array.from({ length: count }, () => ({
      x: rnd() * 100,
      y: rnd() * 100,
      z: -spread * 0.5 + rnd() * spread,
      size: 3 + rnd() * 9,
      delay: rnd() * 5,
      duration: 5 + rnd() * 7,
      ring: rnd() > 0.72,
    }))
  }, [count, spread])

  const spring = { stiffness: 60, damping: 20, mass: 0.8 }
  const rotateX = useSpring(useMotionValue(0), spring)
  const rotateY = useSpring(useMotionValue(0), spring)

  useEffect(() => {
    if (reduce) return
    function onMove(e: MouseEvent) {
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      rotateY.set(nx * 16)
      rotateX.set(-ny * 12)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduce, rotateX, rotateY])

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="absolute inset-0"
      >
        {particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              transform: `translateZ(${p.z}px)`,
              background: p.ring ? 'transparent' : color,
              border: p.ring ? `1.5px solid ${color}` : undefined,
              // las partículas lejanas se ven más tenues
              opacity: 0.25 + ((p.z + spread / 2) / spread) * 0.6,
            }}
            animate={
              reduce
                ? undefined
                : { y: [0, -26, 0], opacity: [0.2, 0.9, 0.2], scale: [1, 1.25, 1] }
            }
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}
