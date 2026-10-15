import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import AboutCard from '../components/AboutCard'
import AcademicCalendar from '../components/AcademicCalendar'
import ArcDivider from '../components/ArcDivider'
import CornerLines from '../components/CornerLines'
import { HERO_GRADIENT } from '../components/heroGradient'
import AnimatedHeading from '../components/motion/AnimatedHeading'
import DepthField from '../components/motion/DepthField'
import Magnetic from '../components/motion/Magnetic'
import Parallax from '../components/motion/Parallax'
import Reveal from '../components/Reveal'
import StudyCarousel from '../components/StudyCarousel'
import heroImg from '../assets/images/Img_portada_INICIO_sin_fondo.webp'
import calendarImg from '../assets/images/Img_calendario_academico.webp'
import textura from '../assets/images/Fondo_textura.webp'
import { aboutParagraphs } from '../data/about'

export default function Home() {
  return (
    <div id="top">
      {/* ------------------------------------------------------- PORTADA */}
      <section className="bg-fade-right">
        <div
          className="hero-shape relative overflow-hidden lg:aspect-[1920/1225]"
          style={{ background: HERO_GRADIENT }}
        >
          <DepthField count={30} spread={1100} color="rgba(255,255,255,0.8)" />

          <div className="relative z-10 flex flex-col items-center px-6 pt-[96px] text-center sm:pt-[120px]">
            <h1 className="font-heading leading-[1.05] font-bold text-brand-navy">
              <AnimatedHeading
                text="Conoce nuestros"
                by="word"
                className="block text-3xl font-semibold sm:text-[55px]"
              />
              <AnimatedHeading
                text="programas"
                delay={0.25}
                stagger={0.045}
                className="block text-6xl font-black sm:text-[128px]"
              />
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-2"
            >
              <Magnetic>
                <Link to="/programas">
                  <motion.span
                    whileHover={{ scale: 1.06, rotateX: -8 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 16 }}
                    style={{ transformStyle: 'preserve-3d' }}
                    className="sheen inline-flex cursor-pointer items-center gap-2 rounded-[8px] bg-brand-sky px-4 py-1.5 text-[15px] font-medium text-white shadow-[0_14px_30px_-12px_rgba(34,71,122,0.9)]"
                  >
                    Más info
                  </motion.span>
                </Link>
              </Magnetic>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotateX: 18 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            style={{ perspective: 1400, transformStyle: 'preserve-3d' }}
            className="relative z-20 mt-6 flex justify-center"
          >
            <motion.img
              src={heroImg}
              alt="Estudiante de tecnología rodeado de libros"
              animate={{ y: [0, -18, 0], rotateZ: [0, 0.6, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="w-[135%] max-w-none drop-shadow-2xl sm:w-[102%]"
            />
          </motion.div>

          <CornerLines className="pointer-events-none absolute right-0 bottom-0 z-30 w-[240px] sm:w-[420px]" />
        </div>
      </section>

      {/* ------------------------------------------------- QUIENES SOMOS */}
      <section id="que-es" className="bg-fade-right relative overflow-hidden px-6 py-20 sm:py-28">
        <img
          src={textura}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute texture-fade mix-blend-multiply -top-40 -right-40 w-[900px] max-w-none opacity-70 select-none"
        />

        <div className="relative mx-auto max-w-[1400px]">
          <AnimatedHeading
            as="h2"
            text="¿Quiénes somos?"
            by="word"
            className="block text-center font-heading text-3xl font-black text-brand-orange sm:text-5xl lg:text-[60px]"
          />

          <div className="mt-12 lg:mt-16" style={{ perspective: 1400 }}>
            <AboutCard
              paragraphs={aboutParagraphs.slice(0, 2)}
              action={
                <Link
                  to="/conocenos"
                  className="w-fit font-bold italic transition-colors hover:text-brand-orange-soft"
                >
                  Ver más
                </Link>
              }
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ CARRUSEL */}
      <section
        id="estudiar"
        className="relative overflow-hidden py-24 sm:py-32"
        style={{ background: 'linear-gradient(180deg, #22477A 0%, #1F6CB4 55%, #2284D8 100%)' }}
      >
        <ArcDivider side="top" color="#ededed" />
        <ArcDivider side="bottom" color="#f4f4f4" />

        <DepthField count={18} spread={700} color="rgba(255,255,255,0.55)" />

        <div className="relative z-20">
          <StudyCarousel />
        </div>
      </section>

      {/* --------------------------------------------- CALENDARIO ACADEMICO */}
      <section
        id="calendario"
        className="bg-fade-left relative overflow-hidden px-6 pt-20 pb-24 sm:pt-28 sm:pb-32"
      >
        <img
          src={textura}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute texture-fade mix-blend-multiply -bottom-32 -left-64 w-[900px] max-w-none -scale-x-100 opacity-80 select-none"
        />

        <div className="relative mx-auto max-w-[1400px]">
          <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Parallax offset={30} depth={60} className="flex justify-center">
              <div className="flex flex-col items-center">
                <motion.img
                  src={calendarImg}
                  alt="Calendario con una mano señalando una fecha"
                  initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="w-[260px] max-w-full drop-shadow-xl sm:w-[360px] lg:w-[420px]"
                />
                <Reveal>
                  <h2 className="-mt-2 text-center font-heading leading-none">
                    <span className="block text-4xl font-black text-brand-orange sm:text-[58px]">
                      Calendario
                    </span>
                    <span className="block text-2xl font-semibold text-brand-blue sm:text-[38px]">
                      Académico
                    </span>
                  </h2>
                </Reveal>
              </div>
            </Parallax>

            <div style={{ perspective: 1400 }}>
              <AcademicCalendar />
            </div>
          </div>

          <div className="mt-16 flex justify-center sm:mt-20">
            <Magnetic>
              <Link to="/programas">
                <motion.span
                  whileHover={{ scale: 1.06, rotateX: -8 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 16 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="sheen inline-flex cursor-pointer items-center rounded-[14px] bg-brand-blue px-9 py-3 text-xl font-medium text-white shadow-[0_18px_34px_-14px_rgba(34,71,122,0.9)] sm:px-12 sm:py-4 sm:text-[30px]"
                >
                  Inscríbete ahora
                </motion.span>
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>
    </div>
  )
}
