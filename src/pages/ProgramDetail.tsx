import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import Accordion from '../components/Accordion'
import CornerLines from '../components/CornerLines'
import { HERO_GRADIENT } from '../components/heroGradient'
import AnimatedHeading from '../components/motion/AnimatedHeading'
import DepthField from '../components/motion/DepthField'
import Magnetic from '../components/motion/Magnetic'
import Reveal from '../components/Reveal'
import ctaImg from '../assets/images/Img_banner_quiero_inscribirme.webp'
import iconCalendar from '../assets/images/Icono_calendario.webp'
import iconDuration from '../assets/images/Icono_duracion.webp'
import iconModality from '../assets/images/Icono_modalidad.webp'
import iconLevel from '../assets/images/Icono_nivel_formativo.webp'
import textura from '../assets/images/Fondo_textura.webp'
import { faqs, programs } from '../data/programs'
import { renderInline } from '../lib/richText'

// Naranja a la izquierda y azul a la derecha, con la frontera inclinada y un
// brillo celeste en la esquina inferior derecha (colores medidos en el PDF).
const PROGRAM_HERO_BG = [
  'radial-gradient(ellipse 48% 62% at 100% 100%, #1e75c2 0%, rgba(30,117,194,0.55) 45%, rgba(30,117,194,0) 100%)',
  'linear-gradient(62deg, #ff6600 0%, #ff6600 30%, #c4601c 41%, #6c5260 47%, #2a4a79 53%, #23487b 100%)',
].join(', ')

const DOTS = 'radial-gradient(rgba(255,255,255,0.75) 2px, transparent 2.5px)'

export default function ProgramDetail() {
  const { slug } = useParams()
  const { hash } = useLocation()
  const program = programs.find((p) => p.slug === slug)

  if (!program) return <Navigate to="/programas" replace />

  const stats = [
    { icon: iconModality, label: 'Modalidad', value: program.modality, sub: '' },
    { icon: iconLevel, label: 'Créditos', value: program.credits.split(' ')[0], sub: '' },
    { icon: iconDuration, label: 'Intensidad', value: program.durationHours, sub: '' },
    { icon: iconCalendar, label: 'Duración', value: program.duration, sub: program.terms },
  ]

  // el último item (preguntas frecuentes) se abre solo cuando llegan con su #ancla
  const items = [
    ...program.accordion,
    { title: 'Perfil del egresado', content: program.profileParagraphs.join('\n\n') },
    {
      id: 'preguntas-frecuentes',
      title: 'Preguntas frecuentes de este curso',
      content: '',
      node: (
        <Accordion
          items={faqs.map((f) => ({ title: f.question, content: f.answer }))}
          variant="compact"
          columns
        />
      ),
    },
  ]
  const openFaq = hash === '#preguntas-frecuentes'

  return (
    <div>
      {/* ------------------------------------------------------- PORTADA */}
      <section className="bg-fade-right">
        {program.heroCollage ? (
          <div
            className="hero-shape relative overflow-hidden"
            style={{ background: PROGRAM_HERO_BG }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[8%] left-0 h-[46%] w-[26%] opacity-50"
              style={{
                backgroundImage: DOTS,
                backgroundSize: '22px 22px',
                maskImage: 'linear-gradient(to right, black, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, black, transparent)',
              }}
            />
            <DepthField count={16} spread={600} color="rgba(255,255,255,0.4)" />

            <div className="relative flex flex-col px-6 pt-[104px] pb-[130px] sm:pb-[200px] lg:block lg:aspect-[1920/1225] lg:px-0 lg:pt-0 lg:pb-0">
              <div className="relative z-20 lg:absolute lg:top-[17%] lg:left-[58%] lg:w-[38%]">
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="font-heading text-white [text-shadow:0_3px_10px_rgba(0,0,0,0.35)]"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="rounded-lg bg-brand-orange px-3 py-1 text-sm font-bold text-white shadow-md [text-shadow:none] sm:text-xl lg:rounded-[0.6vw] lg:px-[1vw] lg:py-[0.35vw] lg:text-[1.9vw]">
                      {program.eyebrow}
                    </span>
                    <span className="text-xl font-bold sm:text-3xl lg:text-[2.3vw]">Manejo de</span>
                  </div>
                  <div className="mt-1 text-3xl leading-[1.05] font-bold sm:text-5xl lg:mt-[0.4vw] lg:text-[3.7vw]">
                    Herramientas para
                  </div>
                  <div className="text-4xl leading-[1.05] font-black sm:text-6xl lg:text-[4.9vw]">
                    Codificación
                  </div>
                  <div className="mt-1 inline-block rounded-2xl bg-brand-navy px-4 py-1 text-4xl leading-[1.15] font-black sm:text-6xl lg:rounded-[1.3vw] lg:px-[1.2vw] lg:py-[0.2vw] lg:text-[4.6vw]">
                    de Software
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="mt-6 lg:mt-[2.6vw]"
                >
                  <div className="flex items-center gap-5 font-heading text-white lg:gap-[1.4vw]">
                    <span className="text-lg font-bold sm:text-2xl lg:text-[1.9vw]">
                      {program.modality}
                    </span>
                    <span className="h-12 w-px bg-white/60 lg:h-[3.4vw]" />
                    <span className="flex flex-col leading-tight">
                      <span className="text-lg font-bold sm:text-2xl lg:text-[1.9vw]">
                        {program.durationHours}
                      </span>
                      <span className="text-xs font-bold sm:text-sm lg:text-[1.1vw]">
                        {program.credits}
                      </span>
                    </span>
                  </div>

                  <div className="mt-5 lg:mt-[1.7vw]">
                    <Magnetic>
                      <Link to={`/inscripcion/${program.slug}`}>
                        <motion.span
                          whileHover={{ scale: 1.07, rotateX: -10 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: 'spring', stiffness: 320, damping: 16 }}
                          style={{ transformStyle: 'preserve-3d' }}
                          className="sheen inline-flex cursor-pointer items-center gap-2 rounded-[10px] bg-brand-orange px-5 py-2.5 text-base font-semibold whitespace-nowrap text-white shadow-[0_16px_34px_-12px_rgba(0,0,0,0.7)] sm:px-7 sm:py-3 sm:text-[19px] lg:rounded-[0.7vw] lg:px-[1.9vw] lg:py-[0.9vw] lg:text-[1.55vw]"
                        >
                          Inscríbete ahora
                        </motion.span>
                      </Link>
                    </Magnetic>
                  </div>
                </motion.div>
              </div>

              <motion.img
                src={program.heroCollage}
                alt={`${program.eyebrow} ${program.name}`}
                initial={{ opacity: 0, scale: 1.06, x: -30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-0 mx-auto mt-8 w-[92%] max-w-[560px] lg:absolute lg:top-[13.6%] lg:left-[0.6%] lg:mx-0 lg:mt-0 lg:w-[60%] lg:max-w-none"
              />
            </div>

            <CornerLines className="pointer-events-none absolute right-0 bottom-0 z-30 w-[240px] sm:w-[420px]" />
          </div>
        ) : (
          <div
            className="hero-shape relative overflow-hidden px-6 pt-[130px] pb-32 text-center text-brand-navy"
            style={{ background: HERO_GRADIENT }}
          >
            <DepthField count={20} spread={800} color="rgba(255,255,255,0.75)" />
            <span className="relative inline-block rounded-full bg-brand-orange px-4 py-1.5 text-sm font-semibold text-white">
              {program.eyebrow}
            </span>
            <h1 className="relative mt-3 font-heading text-3xl font-black sm:text-5xl">
              {program.name}
            </h1>
            <div className="relative mx-auto mt-10 flex h-56 w-56 items-center justify-center rounded-3xl border-2 border-dashed border-brand-navy/25 text-brand-navy/50">
              Próximamente
            </div>
          </div>
        )}
      </section>

      {/* -------------------------------------------- CONOCE EL PROGRAMA */}
      <section className="bg-fade-right relative overflow-hidden px-6 pt-10 pb-24 sm:pt-14 sm:pb-28">
        <img
          src={textura}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute texture-fade mix-blend-multiply -top-32 -right-48 w-[800px] max-w-none opacity-70 select-none"
        />

        <div className="relative">
          <AnimatedHeading
            as="h2"
            text="Conoce el programa"
            by="word"
            className="block text-center font-heading text-3xl font-black text-brand-blue sm:text-[52px]"
          />

          <div
            className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-x-4 gap-y-10 sm:mt-14 sm:grid-cols-4 sm:gap-x-0"
            style={{ perspective: 1200 }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40, rotateY: -25 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
                className={`flex flex-col items-center gap-1 text-center ${
                  i > 0 ? 'sm:border-l sm:border-brand-blue/25' : ''
                }`}
              >
                <motion.img
                  src={stat.icon}
                  alt=""
                  aria-hidden="true"
                  whileHover={{ scale: 1.18, rotateY: 22, rotateZ: 5 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 13 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="h-14 w-auto sm:h-[86px]"
                />
                <div className="mt-1 font-heading text-sm font-bold text-brand-blue sm:text-lg">
                  {stat.label}
                </div>
                <div className="font-heading text-xl font-bold text-brand-orange sm:text-[27px]">
                  {stat.value}
                </div>
                {stat.sub && (
                  <div className="font-heading text-sm font-bold text-brand-orange sm:text-[17px]">
                    {stat.sub}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------- FRANJA AZUL DEL PROGRAMA */}
      <section className="relative flex flex-col overflow-hidden bg-brand-blue lg:aspect-[1920/989] lg:flex-row lg:items-center">
        {/* la imagen ya trae el degradado azul y los bordes rasgados */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${program.profileBg})` }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#12315a]/90 via-[#12315a]/55 to-transparent lg:from-[#12315a]/45 lg:via-transparent"
        />

        <div className="relative z-10 px-6 pt-20 pb-10 text-white lg:w-[52%] lg:py-0 lg:pr-0 lg:pl-[6%]">
          <div className="flex flex-col gap-5 text-justify text-[15px] leading-relaxed sm:text-[17px] lg:text-[clamp(16px,1.15vw,23px)]">
            {program.highlight && (
              <Reveal>
                <p>{program.highlight}</p>
              </Reveal>
            )}
            {program.intro?.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.1}>
                <p>{renderInline(p)}</p>
              </Reveal>
            ))}
            {program.keyFacts && (
              <Reveal delay={0.3}>
                <ul className="list-disc space-y-0.5 pl-5 text-left">
                  {program.keyFacts.map((fact) => (
                    <li key={fact.label}>
                      <strong className="font-bold">{fact.label}</strong>: {fact.text}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </div>

      </section>

      {/* --------------------------------------- INFORMACION DEL PROGRAMA */}
      <section className="bg-fade-left relative overflow-hidden px-6 py-20 sm:py-28">
        <img
          src={textura}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute texture-fade mix-blend-multiply -bottom-40 -left-64 w-[850px] max-w-none -scale-x-100 opacity-75 select-none"
        />

        <div className="relative mx-auto max-w-[1200px]">
          <AnimatedHeading
            as="h2"
            text="Información sobre el programa"
            by="word"
            className="block text-center font-heading text-3xl font-black text-brand-orange sm:text-[58px]"
          />

          <div className="mt-10 sm:mt-14">
            {program.accordion.length > 0 ? (
              <Accordion
                key={hash}
                items={items}
                defaultOpen={openFaq ? items.length - 1 : 0}
                variant="card"
              />
            ) : (
              <div className="rounded-[22px] border-2 border-dashed border-brand-navy/15 p-10 text-center text-brand-navy/50">
                La información detallada de este programa estará disponible próximamente.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- BANNER FINAL */}
      <section className="relative">
        <motion.img
          src={ctaImg}
          alt="¡Quiero inscribirme!"
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="absolute top-[83%] left-[46.7%] -translate-x-1/2 -translate-y-1/2"
        >
          <Magnetic>
            <Link to={`/inscripcion/${program.slug}`}>
              <motion.span
                whileHover={{ scale: 1.07, rotateX: -10 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 320, damping: 16 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="sheen inline-flex cursor-pointer items-center gap-1 rounded-[10px] bg-brand-sky px-3 py-1.5 text-[10px] font-semibold whitespace-nowrap text-white shadow-[0_16px_30px_-12px_rgba(0,0,0,0.5)] sm:gap-2 sm:px-7 sm:py-3.5 sm:text-[19px]"
              >
                Iniciar
                <ArrowRight className="h-3 w-3 sm:h-5 sm:w-5" />
              </motion.span>
            </Link>
          </Magnetic>
        </motion.div>
      </section>
    </div>
  )
}
