import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

type ParallaxProps = {
  children: ReactNode
  className?: string
  /** Desplazamiento vertical total en px a lo largo del recorrido */
  offset?: number
  /** Profundidad Z que se recorre mientras la sección cruza la pantalla */
  depth?: number
  /** Giro máximo en grados sobre el eje X */
  rotate?: number
  scaleFrom?: number
}

/**
 * Mueve su contenido en Y y en Z según el avance del scroll,
 * dando sensación de capas a distintas distancias de la cámara.
 */
export default function Parallax({
  children,
  className = '',
  offset = 80,
  depth = 0,
  rotate = 0,
  scaleFrom = 1,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const soft = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })
  const y = useTransform(soft, [0, 1], [offset, -offset])
  const z = useTransform(soft, [0, 1], [-depth, depth])
  const rotateX = useTransform(soft, [0, 1], [rotate, -rotate])
  const scale = useTransform(soft, [0, 0.5, 1], [scaleFrom, 1, scaleFrom])

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <div ref={ref} className={className} style={{ perspective: 1200 }}>
      <motion.div style={{ y, z, rotateX, scale, transformStyle: 'preserve-3d' }}>
        {children}
      </motion.div>
    </div>
  )
}
