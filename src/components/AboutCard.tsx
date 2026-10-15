import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import logoWhite from '../assets/images/Logo_AI_blanco.png'
import collage from '../assets/images/Img_quienes_somos.webp'

type AboutCardProps = {
  paragraphs: string[]
  /** Enlace o botón bajo el texto (por ejemplo "Ver más") */
  action?: ReactNode
}

/**
 * Tarjeta azul de "¿Quiénes somos?": texto justificado a la izquierda y, a la
 * derecha, el collage recortado en círculo con el sello naranja de la marca.
 */
export default function AboutCard({ paragraphs, action }: AboutCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: -8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        transformOrigin: 'top center',
        background: 'linear-gradient(120deg, #5b7ea9 0%, #5f92cb 55%, #62a6e0 100%)',
      }}
      className="relative mx-auto grid max-w-[1260px] overflow-hidden rounded-[28px] shadow-[0_30px_60px_-30px_rgba(10,24,44,0.55)] sm:rounded-[38px] lg:grid-cols-[1.12fr_0.88fr]"
    >
      <div className="flex flex-col gap-5 px-7 py-9 text-justify text-[14px] leading-[1.55] text-white sm:px-12 sm:py-12 sm:text-[16px] lg:pr-6">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {action}
      </div>

      <div className="relative flex items-center justify-center px-6 pb-10 lg:py-10 lg:pr-12 lg:pl-0">
        <span
          aria-hidden="true"
          className="absolute top-6 right-10 h-9 w-9 rounded-full border border-white/70 sm:h-12 sm:w-12"
        />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="relative aspect-square w-[78%] max-w-[420px] lg:w-full"
        >
          <div className="h-full w-full overflow-hidden rounded-full bg-[#8aa0bb] shadow-[0_20px_40px_-20px_rgba(10,24,44,0.6)]">
            <img
              src={collage}
              alt="Collage de Aprendizaje Interactivo"
              loading="lazy"
              className="h-full w-full object-cover object-[48%_50%]"
            />
          </div>
          <div className="absolute top-[34%] -left-[22%] flex aspect-square w-[46%] items-center justify-center rounded-full border-[6px] border-white bg-brand-orange shadow-[0_14px_30px_-12px_rgba(10,24,44,0.6)] sm:border-[8px]">
            <img src={logoWhite} alt="" aria-hidden="true" className="w-[78%]" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
