import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import logo from '../assets/images/Logo_aprendizaje_interactivo.png'
import logoWhite from '../assets/images/Logo_AI_blanco.png'
import { useAuth } from '../context/AuthContext'
import { faqPath } from '../data/programs'

// Dirección del campus virtual (se define en .env como VITE_CAMPUS_URL)
const CAMPUS_URL = (import.meta.env.VITE_CAMPUS_URL as string | undefined) || '#'

type NavItem = { label: string; to: string; section: boolean; external?: boolean }

const navItems: NavItem[] = [
  { label: 'Inicio', to: '/', section: false },
  { label: 'Programas', to: '/programas', section: false },
  { label: 'Conócenos', to: '/conocenos', section: false },
  { label: 'Estudiantes', to: '/#estudiar', section: true },
  { label: 'Preguntas frecuentes', to: faqPath, section: true },
  { label: 'Inscríbete', to: '/cuenta', section: false },
  { label: 'Campus virtual', to: CAMPUS_URL, section: false, external: true },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const { user } = useAuth()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24))

  // Cuando hay sesión, el último item del menú muestra el nombre del estudiante.
  const firstName = (user?.user_metadata?.full_name as string | undefined)?.split(' ')[0]
  const items = navItems.map((item) =>
    item.to === '/cuenta' && user ? { ...item, label: firstName || 'Mi cuenta' } : item,
  )

  // en el detalle de programa el banner es oscuro: el logo va en blanco
  const onDarkHero = /^\/programas\/.+/.test(pathname)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
      style={{ perspective: 900 }}
    >
      <div
        className={`relative mx-auto flex max-w-[1600px] items-center px-5 transition-all duration-500 sm:px-10 ${
          scrolled ? 'h-[66px]' : 'h-[86px]'
        }`}
      >
        <NavLink to="/" className="relative z-10 shrink-0" onClick={() => setOpen(false)}>
          <motion.img
            src={onDarkHero ? logoWhite : logo}
            alt="Aprendizaje Interactivo"
            whileHover={{ rotateY: 18, rotateZ: -3, scale: 1.06 }}
            transition={{ type: 'spring', stiffness: 260, damping: 15 }}
            style={{ transformStyle: 'preserve-3d' }}
            className={`w-auto transition-all duration-500 ${scrolled ? 'h-10 sm:h-12' : 'h-11 sm:h-16'}`}
          />
        </NavLink>

        <nav
          className={`absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-[18px] bg-white/95 px-2 py-1.5 backdrop-blur-md transition-shadow duration-500 lg:flex ${
            scrolled
              ? 'shadow-[0_10px_34px_rgba(10,24,44,0.18)]'
              : 'shadow-[0_6px_24px_rgba(10,24,44,0.10)]'
          }`}
        >
          {items.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.to}
                target={item.to === '#' ? undefined : '_blank'}
                rel="noreferrer"
                className="relative rounded-[10px] px-3 py-2.5 text-[13px] font-semibold tracking-wide whitespace-nowrap text-brand-navy/75 uppercase transition-colors duration-300 hover:text-brand-orange xl:px-4"
              >
                {item.label}
              </a>
            ) : (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => {
                const active = isActive && !item.section
                return `relative rounded-[10px] px-3 py-2.5 text-[13px] font-semibold tracking-wide uppercase whitespace-nowrap transition-colors duration-300 xl:px-4 ${
                  active
                    ? 'text-brand-navy'
                    : 'text-brand-navy/75 hover:text-brand-orange'
                }`
              }}
            >
              {({ isActive }) => {
                const active = isActive && !item.section
                return (
                  <>
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-0 -z-10 rounded-[10px] bg-brand-orange-soft"
                      />
                    )}
                    {item.label}
                  </>
                )
              }}
            </NavLink>
            ),
          )}
        </nav>

        <button
          type="button"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-full bg-white shadow-[0_6px_24px_rgba(10,24,44,0.12)] lg:hidden"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="h-0.5 w-5 rounded-full bg-brand-navy"
          />
          <motion.span
            animate={open ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
            className="h-0.5 w-5 rounded-full bg-brand-navy"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="h-0.5 w-5 rounded-full bg-brand-navy"
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -20, rotateX: -25 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -20, rotateX: -25 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top center' }}
            className="mx-5 flex flex-col gap-1 overflow-hidden rounded-3xl bg-white p-3 shadow-[0_30px_60px_-20px_rgba(10,24,44,0.4)] lg:hidden"
          >
            {items.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.05, duration: 0.35 }}
              >
                {item.external ? (
                  <a
                    href={item.to}
                    target={item.to === '#' ? undefined : '_blank'}
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                    className="block rounded-[12px] px-4 py-3 text-sm font-semibold text-brand-navy/80 uppercase transition-colors hover:bg-brand-mist"
                  >
                    {item.label}
                  </a>
                ) : (
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) => {
                      const active = isActive && !item.section
                      return `block rounded-[12px] px-4 py-3 text-sm font-semibold uppercase transition-colors ${
                        active
                          ? 'bg-brand-orange-soft text-brand-navy'
                          : 'text-brand-navy/80 hover:bg-brand-mist'
                      }`
                    }}
                  >
                    {item.label}
                  </NavLink>
                )}
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
