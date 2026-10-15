import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { Project } from '../data/about'

function PhotoGallery({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Galería de fotos: Proyecto ${project.name}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-navy/85 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-full w-full max-w-4xl flex-col gap-3 overflow-y-auto rounded-[28px] bg-white p-4 sm:p-6"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar galería"
          className="absolute top-3 right-3 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-brand-navy shadow-lg transition-colors hover:bg-brand-orange hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
        <h3 className="pr-12 font-heading text-xl font-bold text-brand-blue sm:text-2xl">
          Proyecto <span className="text-brand-orange">{project.name}</span>
        </h3>
        {project.photos.map((src, i) => (
          <img
            key={src + i}
            src={src}
            alt={`Proyecto ${project.name}, foto ${i + 1}`}
            className="w-full rounded-[20px] object-cover"
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

/** Carrusel horizontal de proyectos; cada tarjeta abre su galería de fotos. */
export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<Project | null>(null)

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * (el.clientWidth * 0.7), behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-[6vw] py-8 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-9 lg:px-[5vw] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project, i) => (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, y: 60, rotateX: -14 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8 }}
            className="group flex w-[270px] shrink-0 snap-center flex-col overflow-hidden rounded-[30px] bg-white shadow-[0_26px_55px_-24px_rgba(10,24,44,0.45)] sm:w-[360px] lg:w-[420px]"
          >
            <div className="p-4 sm:p-5">
              <div className="aspect-[16/9] overflow-hidden rounded-[22px] bg-brand-mist">
                <img
                  src={project.image}
                  alt={`Proyecto ${project.name}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                />
              </div>
            </div>
            <h3 className="px-5 pt-2 pb-7 text-center font-heading leading-tight font-bold sm:pb-9">
              <span className="block text-xl text-brand-blue sm:text-[27px]">Proyecto</span>
              <span className="mt-1 block text-xl text-brand-orange sm:text-[27px]">
                {project.name}
              </span>
            </h3>
            <button
              type="button"
              onClick={() => setOpen(project)}
              className="sheen mt-auto cursor-pointer bg-brand-orange py-3.5 text-center font-heading text-lg font-bold text-white transition-colors duration-300 hover:bg-brand-blue sm:py-4 sm:text-[22px]"
            >
              Galería de fotos
            </button>
          </motion.article>
        ))}
      </div>

      {(['prev', 'next'] as const).map((dir) => (
        <button
          key={dir}
          type="button"
          onClick={() => scroll(dir === 'next' ? 1 : -1)}
          aria-label={dir === 'next' ? 'Siguiente' : 'Anterior'}
          className={`absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-brand-sky/80 text-white shadow-lg transition-colors hover:bg-brand-orange sm:h-12 sm:w-12 ${
            dir === 'next' ? 'right-3 sm:right-6' : 'left-3 sm:left-6'
          }`}
        >
          {dir === 'next' ? (
            <ChevronRight className="h-6 w-6" strokeWidth={2.5} />
          ) : (
            <ChevronLeft className="h-6 w-6" strokeWidth={2.5} />
          )}
        </button>
      ))}

      <AnimatePresence>
        {open && <PhotoGallery project={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </div>
  )
}
