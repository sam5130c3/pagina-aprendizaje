import { motion, useScroll, useSpring } from 'framer-motion'

/** Barra fina que marca el avance de lectura de la página. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand-orange via-brand-orange-light to-brand-sky"
    />
  )
}
