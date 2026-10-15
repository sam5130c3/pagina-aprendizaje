import { motion, useReducedMotion } from 'framer-motion'
import { useMemo, type ElementType } from 'react'

type AnimatedHeadingProps = {
  text: string
  className?: string
  as?: ElementType
  delay?: number
  /** Reparte la animación por palabras (mejor para titulares muy grandes) */
  by?: 'word' | 'char'
  stagger?: number
}

/**
 * Titular que entra girando sobre el eje X, letra a letra o palabra a palabra,
 * como si cada pieza cayera desde el fondo de la escena.
 */
export default function AnimatedHeading({
  text,
  className = '',
  as: Tag = 'span',
  delay = 0,
  by = 'char',
  stagger,
}: AnimatedHeadingProps) {
  const reduce = useReducedMotion()
  // memoizado: motion.create(Tag) crearía un componente nuevo en cada render,
  // perdiendo el estado de la animación de entrada
  const MotionTag = useMemo(() => motion.create(Tag), [Tag])

  if (reduce) return <Tag className={className}>{text}</Tag>

  const step = stagger ?? (by === 'word' ? 0.08 : 0.03)
  const pieces = by === 'word' ? text.split(' ') : Array.from(text)

  return (
    <MotionTag
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ show: { transition: { staggerChildren: step, delayChildren: delay } } }}
      className={className}
      style={{ perspective: 800 }}
      aria-label={text}
    >
      {pieces.map((piece, i) => (
        <motion.span
          key={`${piece}-${i}`}
          aria-hidden="true"
          variants={{
            hidden: { opacity: 0, y: '0.5em', rotateX: -75, z: -80 },
            show: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              z: 0,
              transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          style={{ display: 'inline-block', transformOrigin: '50% 100%', whiteSpace: 'pre' }}
        >
          {piece === ' ' ? '\u00A0' : piece}
          {by === 'word' && i < pieces.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </MotionTag>
  )
}
