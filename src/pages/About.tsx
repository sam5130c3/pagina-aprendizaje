import { motion } from 'framer-motion'
import AboutCard from '../components/AboutCard'
import CornerLines from '../components/CornerLines'
import { HERO_GRADIENT } from '../components/heroGradient'
import AnimatedHeading from '../components/motion/AnimatedHeading'
import DepthField from '../components/motion/DepthField'
import ProjectCarousel from '../components/ProjectCarousel'
import heroImg from '../assets/images/Img_nosotros_portada.webp'
import textura from '../assets/images/Fondo_textura.webp'
import { aboutParagraphs, projects } from '../data/about'

export default function About() {
  return (
    <div>
      {/* ------------------------------------------------------- PORTADA */}
      <section className="bg-fade-left">
        <div
          className="hero-shape relative overflow-hidden lg:aspect-[1920/1225]"
          style={{ background: HERO_GRADIENT }}
        >
          <DepthField count={24} spread={1000} color="rgba(255,255,255,0.75)" />

          <div className="relative z-10 px-6 pt-[110px] text-center sm:pt-[130px]">
            <h1 className="font-heading leading-[1.06] font-black">
              <AnimatedHeading
                text="Conoce más sobre"
                by="word"
                className="block text-3xl font-medium text-brand-navy sm:text-[64px]"
              />
              <AnimatedHeading
                text="Nosotros"
                delay={0.3}
                stagger={0.05}
                className="mt-1 block text-5xl text-brand-blue sm:text-[100px] sm:pl-[16%]"
              />
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 flex justify-center"
            style={{ marginTop: '-1%', perspective: 1400, transformStyle: 'preserve-3d' }}
          >
            <motion.img
              src={heroImg}
              alt="Persona con bombilla por cabeza leyendo un libro"
              animate={{ y: [0, -14, 0], rotateZ: [0, -0.6, 0] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-[80%] max-w-none drop-shadow-2xl sm:w-[34%]"
            />
          </motion.div>

          <CornerLines className="pointer-events-none absolute right-0 bottom-0 z-30 w-[240px] sm:w-[420px]" />
        </div>
      </section>

      {/* ------------------------------------------------- QUIENES SOMOS */}
      <section
        id="quienes-somos"
        className="bg-fade-left relative overflow-hidden px-6 pt-16 pb-24 sm:pt-24"
      >
        <img
          src={textura}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute texture-fade mix-blend-multiply -top-24 -right-56 w-[850px] max-w-none opacity-70 select-none"
        />
        <div className="relative mx-auto max-w-[1400px]">
          <AnimatedHeading
            as="h2"
            text="¿Quiénes somos?"
            by="word"
            className="block text-center font-heading text-3xl font-black text-brand-orange sm:text-5xl lg:text-[60px]"
          />
          <div className="mt-12 lg:mt-16" style={{ perspective: 1400 }}>
            <AboutCard paragraphs={aboutParagraphs} />
          </div>
        </div>
      </section>

      {/* ----------------------------------------------- NUESTRA EXPERIENCIA */}
      <section
        id="experiencia"
        className="bg-fade-left relative overflow-hidden px-0 pt-8 pb-24 sm:pb-32"
      >
        <img
          src={textura}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute texture-fade mix-blend-multiply -bottom-40 -left-64 w-[850px] max-w-none -scale-x-100 opacity-70 select-none"
        />
        <div className="relative mx-auto max-w-[1600px]">
          <h2 className="px-6 text-center font-heading leading-[1.05]">
            <AnimatedHeading
              text="Conoce nuestra"
              by="word"
              className="block text-3xl font-semibold text-brand-navy sm:text-[55px]"
            />
            <AnimatedHeading
              text="experiencia"
              delay={0.2}
              stagger={0.045}
              className="block text-5xl font-black text-brand-blue sm:text-[110px]"
            />
          </h2>

          <div className="mt-8 sm:mt-12">
            <ProjectCarousel projects={projects} />
          </div>
        </div>
      </section>
    </div>
  )
}
