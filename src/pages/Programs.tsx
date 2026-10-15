import { motion } from 'framer-motion'
import CornerLines from '../components/CornerLines'
import { HERO_GRADIENT } from '../components/heroGradient'
import AnimatedHeading from '../components/motion/AnimatedHeading'
import DepthField from '../components/motion/DepthField'
import ProgramCard from '../components/ProgramCard'
import heroBg from '../assets/images/Img_portada_sin_fondo.png'
import textura from '../assets/images/Fondo_textura.webp'
import { programs } from '../data/programs'

export default function Programs() {
  return (
    <div>
      {/* ------------------------------------------------------- PORTADA */}
      <section className="bg-fade-left">
        <div
          className="hero-shape relative overflow-hidden lg:aspect-[1920/1225]"
          style={{ background: HERO_GRADIENT }}
        >
          <DepthField count={24} spread={1000} color="rgba(255,255,255,0.75)" />

          <div className="relative z-10 px-6 pt-[110px] text-center sm:pt-[150px]">
            <h1 className="font-heading leading-[1.06] font-black">
              <AnimatedHeading
                text="Formación que impulsa tu"
                by="word"
                className="block text-3xl text-brand-navy sm:text-[52px]"
              />
              <AnimatedHeading
                text="futuro profesional"
                delay={0.3}
                stagger={0.04}
                className="mt-1 block text-5xl text-brand-blue sm:text-[105px]"
              />
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 flex justify-center"
            style={{ marginTop: '-9.5%', perspective: 1400, transformStyle: 'preserve-3d' }}
          >
            <motion.img
              src={heroBg}
              alt="Bombilla encendida sobre fondo turquesa"
              animate={{ y: [0, -16, 0], rotateZ: [0, -0.7, 0] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-[120%] max-w-none drop-shadow-2xl sm:w-[78%]"
            />
          </motion.div>

          <CornerLines className="pointer-events-none absolute right-0 bottom-0 z-30 w-[240px] sm:w-[420px]" />
        </div>
      </section>

      {/* ------------------------------------------------ LISTA DE PROGRAMAS */}
      <section className="bg-fade-left relative overflow-hidden px-6 py-20 sm:py-28">
        <img
          src={textura}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute texture-fade mix-blend-multiply -top-24 -right-56 w-[850px] max-w-none opacity-70 select-none"
        />
        <img
          src={textura}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute texture-fade mix-blend-multiply -bottom-40 -left-64 w-[850px] max-w-none -scale-x-100 opacity-70 select-none"
        />

        <div className="relative mx-auto max-w-[1400px]">
          <h2 className="text-center font-heading leading-[1.05]">
            <AnimatedHeading
              text="Conoce nuestros"
              by="word"
              className="block text-3xl font-semibold text-brand-navy sm:text-[55px]"
            />
            <AnimatedHeading
              text="programas"
              delay={0.2}
              stagger={0.045}
              className="block text-6xl font-black text-brand-blue sm:text-[128px]"
            />
          </h2>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:gap-14">
            {programs.map((program, i) => (
              <ProgramCard key={program.slug} program={program} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
