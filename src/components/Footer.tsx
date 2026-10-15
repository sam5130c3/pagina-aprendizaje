import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import logoWhite from '../assets/images/Logo_AI_blanco.png'
import { faqPath } from '../data/programs'

const links = [
  { label: 'Inicio', to: '/' },
  { label: 'Programas', to: '/programas' },
  { label: 'Conócenos', to: '/conocenos' },
  { label: 'Estudiantes', to: '/#estudiar' },
  { label: 'Preguntas frecuentes', to: faqPath },
  { label: 'Inscríbete', to: '/cuenta' },
]

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <rect x="3" y="3" width="18" height="18" rx="5.4" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M16.6 5.82a4.28 4.28 0 0 1-2.63-2.05h-3v13.4a2.6 2.6 0 1 1-2.19-2.57v-3.05a5.62 5.62 0 1 0 5.19 5.6V9.4a7.24 7.24 0 0 0 4.24 1.36V7.75a4.27 4.27 0 0 1-1.61-1.93Z" />
    </svg>
  )
}

const socials = [
  { Icon: InstagramIcon, label: 'Instagram' },
  { Icon: TikTokIcon, label: 'TikTok' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-navy text-white">
      {/* halos suaves que respiran detrás del contenido */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.25, 0.55, 0.25], scale: [1, 1.15, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-brand-orange/25 blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.3, 0.15, 0.3], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-brand-sky/25 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-[1500px] grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1fr_0.7fr] lg:gap-0 lg:py-16">
        <motion.div
          initial={{ opacity: 0, x: -40, rotateY: -25 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: 900 }}
          className="flex items-center justify-center lg:justify-start lg:pr-10"
        >
          <motion.img
            src={logoWhite}
            alt="Aprendizaje Interactivo"
            whileHover={{ scale: 1.05, rotateZ: -2 }}
            transition={{ type: 'spring', stiffness: 240, damping: 14 }}
            className="h-24 w-auto sm:h-32 lg:h-36"
          />
        </motion.div>

        <motion.nav
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:px-10"
        >
          <ul className="space-y-1.5">
            {links.map((l, i) => (
              <motion.li
                key={l.label}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.15 + i * 0.06 }}
              >
                <Link
                  to={l.to}
                  className="inline-block font-heading text-lg font-bold text-brand-orange transition-all duration-300 hover:translate-x-1.5 hover:text-brand-orange-light sm:text-[23px]"
                >
                  {l.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:border-l lg:border-white/20 lg:px-10"
        >
          <h3 className="mb-5 font-heading text-xl font-bold text-brand-orange sm:text-[25px]">
            Contáctanos
          </h3>
          <ul className="space-y-4 text-[15px] leading-relaxed text-white/85">
            <li>
              <a href="mailto:administrativa@ainteractivo.com" className="transition-colors hover:text-brand-orange">
                administrativa@ainteractivo.com
              </a>
            </li>
            <li>
              <a href="tel:+573102566171" className="transition-colors hover:text-brand-orange">
                3102566171
              </a>
            </li>
            <li>Cra. 7 #37-25, piso 12 – Edificio Lutaima, Bogotá D. C.</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="lg:border-l lg:border-white/20 lg:pl-10"
        >
          <h3 className="mb-5 font-heading text-xl font-bold text-brand-orange sm:text-[25px]">
            Síguenos
          </h3>
          <div className="flex gap-4" style={{ perspective: 600 }}>
            {socials.map(({ Icon, label }) => (
              <motion.a
                key={label}
                href="#"
                aria-label={label}
                whileHover={{ scale: 1.15, rotateY: 20, rotateZ: 6 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 14 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange text-white shadow-[0_10px_24px_-8px_rgba(237,118,1,0.9)] transition-colors hover:bg-brand-orange-light"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="relative pb-8 text-center text-xs text-white/55">
        Aprendizaje Interactivo. Todos los derechos reservados. Bogotá, Colombia – 2026
      </div>
    </footer>
  )
}
