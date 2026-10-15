import { motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef } from 'react'
import { studyCards } from '../data/programs'

/**
 * Carrusel tipo "coverflow": las tarjetas giran sobre el eje Y y se alejan
 * en Z según su distancia al centro, así que el riel se curva de verdad
 * en el espacio en lugar de simular la curva con una imagen.
 */
export default function StudyCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLElement | null)[]>([])
  const frame = useRef(0)
  const reduce = useReducedMotion()

  const layout = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const center = track.scrollLeft + track.clientWidth / 2

    for (const card of cardsRef.current) {
      if (!card) return
      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      // -1 = fuera por la izquierda, 0 = centrado, 1 = fuera por la derecha
      const d = Math.max(-1.4, Math.min(1.4, (cardCenter - center) / (track.clientWidth / 2)))
      const abs = Math.abs(d)

      if (reduce) {
        card.style.transform = ''
        card.style.opacity = '1'
        continue
      }

      card.style.transform =
        `rotateY(${-d * 26}deg) translateZ(${-abs * 170}px) translateX(${d * 14}px) scale(${1 - abs * 0.06})`
      card.style.opacity = String(1 - abs * 0.3)
      card.style.zIndex = String(100 - Math.round(abs * 50))
    }
  }, [reduce])

  const schedule = useCallback(() => {
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(layout)
  }, [layout])

  useEffect(() => {
    schedule()
    const track = trackRef.current
    if (!track) return
    track.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame.current)
      track.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [schedule])

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const card = cardsRef.current[0]
    const step = (card?.offsetWidth ?? 280) + 20
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[8vw] py-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ perspective: '1600px', perspectiveOrigin: '50% 50%' }}
      >
        {studyCards.map((card, i) => (
          <motion.article
            key={card.title + i}
            ref={(el) => {
              cardsRef.current[i] = el
            }}
            initial={{ opacity: 0, y: 60, rotateX: -18 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
            className="group relative aspect-[372/557] w-[220px] shrink-0 snap-center overflow-hidden rounded-[26px] shadow-[0_26px_50px_-18px_rgba(6,20,40,0.65)] transition-[box-shadow] duration-500 will-change-transform hover:shadow-[0_40px_70px_-20px_rgba(6,20,40,0.8)] sm:w-[272px] lg:w-[320px]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <img
              src={card.image}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
            />
            {/* refuerza la legibilidad sin alterar el degradado naranja original */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/25 to-transparent" />

            <div
              className="absolute inset-x-0 bottom-0 flex flex-col gap-2 px-5 pb-6 text-white sm:px-6 sm:pb-7"
              style={{ transform: 'translateZ(40px)' }}
            >
              <h3 className="font-heading text-center text-[17px] leading-tight font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] sm:text-xl lg:text-[23px]">
                {card.title}
              </h3>
              <p className="text-[11px] leading-snug text-white/90 sm:text-[12.5px]">{card.text}</p>
            </div>

            <span className="pointer-events-none absolute inset-0 rounded-[26px] ring-1 ring-white/20 ring-inset" />
          </motion.article>
        ))}
      </div>

      {(['prev', 'next'] as const).map((dir) => (
        <motion.button
          key={dir}
          type="button"
          onClick={() => scroll(dir === 'next' ? 1 : -1)}
          whileHover={{ scale: 1.12, rotate: dir === 'next' ? 6 : -6 }}
          whileTap={{ scale: 0.9 }}
          aria-label={dir === 'next' ? 'Siguiente' : 'Anterior'}
          className={`absolute top-1/2 z-[200] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-navy shadow-[0_10px_25px_rgba(6,20,40,0.35)] transition-colors hover:bg-brand-orange hover:text-white sm:h-14 sm:w-14 ${
            dir === 'next' ? 'right-3 sm:right-6' : 'left-3 sm:left-6'
          }`}
        >
          {dir === 'next' ? (
            <ChevronRight className="h-5 w-5 sm:h-7 sm:w-7" strokeWidth={2.5} />
          ) : (
            <ChevronLeft className="h-5 w-5 sm:h-7 sm:w-7" strokeWidth={2.5} />
          )}
        </motion.button>
      ))}
    </div>
  )
}
