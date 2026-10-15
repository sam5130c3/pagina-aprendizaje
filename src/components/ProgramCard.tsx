import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import iconDuration from '../assets/images/Icono_duracion.webp'
import iconModality from '../assets/images/Icono_modalidad.webp'
import type { Program } from '../data/programs'
import Tilt3D from './motion/Tilt3D'

/**
 * Tarjeta de programa tal como aparece en la propuesta: lámina blanca con la
 * imagen enmarcada arriba, el nombre en dos tonos, la fila de datos y la
 * barra naranja de "Más información" ocupando todo el ancho inferior.
 */
export default function ProgramCard({ program, index }: { program: Program; index: number }) {
  const stats = [
    { icon: iconModality, label: 'Modalidad', value: program.modality, sub: '' },
    {
      icon: iconDuration,
      label: 'Duración',
      value: program.durationHours,
      sub: program.credits,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 70, rotateX: -14 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1400 }}
    >
      <Tilt3D max={9} lift={26} className="group/tilt h-full">
        <article className="group flex h-full flex-col overflow-hidden rounded-[32px] bg-white shadow-[0_26px_55px_-24px_rgba(10,24,44,0.45)] transition-shadow duration-500 hover:shadow-[0_45px_80px_-28px_rgba(10,24,44,0.55)]">
          <div className="p-4 sm:p-5" style={{ transform: 'translateZ(28px)' }}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] bg-brand-mist">
              {program.cardImage ? (
                <img
                  src={program.cardImage}
                  alt={program.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-brand-navy/35">
                  Próximamente
                </div>
              )}
              <span className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-black/5 ring-inset" />
            </div>
          </div>

          <div
            className="flex flex-1 flex-col px-5 pb-0 text-center sm:px-7"
            style={{ transform: 'translateZ(18px)' }}
          >
            <h3 className="font-heading leading-tight font-bold">
              <span className="block text-xl text-brand-blue sm:text-[27px]">{program.eyebrow}</span>
              <span className="mt-1 block text-xl text-brand-orange sm:text-[27px]">
                {program.name}
              </span>
            </h3>

            <div className="mt-auto flex items-stretch justify-center gap-4 pt-7 pb-6 sm:gap-8">
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex items-stretch gap-4 sm:gap-8">
                  {i > 0 && <span className="w-px self-stretch bg-brand-blue/25" />}
                  <div className="flex flex-1 flex-col items-center">
                    <motion.img
                      src={stat.icon}
                      alt=""
                      aria-hidden="true"
                      whileHover={{ scale: 1.18, rotate: 6 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 14 }}
                      className="h-11 w-auto sm:h-14"
                    />
                    <span className="mt-1 font-heading text-[13px] font-bold text-brand-blue sm:text-[15px]">
                      {stat.label}
                    </span>
                    <span className="font-heading text-[15px] font-bold text-brand-orange sm:text-[19px]">
                      {stat.value}
                    </span>
                    {stat.sub && (
                      <span className="font-heading text-[11px] font-bold text-brand-orange sm:text-[13px]">
                        {stat.sub}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            to={`/programas/${program.slug}`}
            className="sheen relative block bg-brand-orange py-4 text-center font-heading text-lg font-bold text-white transition-colors duration-300 hover:bg-brand-blue sm:py-5 sm:text-[25px]"
            style={{ transform: 'translateZ(14px)' }}
          >
            Más información
          </Link>
        </article>
      </Tilt3D>
    </motion.div>
  )
}
