import talentoTech from '../assets/images/Img_proyecto_talento_tech.webp'
import jovenesEnPaz from '../assets/images/Img_proyecto_jovenes_en_paz.webp'
import ciudadBolivar from '../assets/images/Img_proyecto_ciudad_bolivar.webp'

export const aboutParagraphs = [
  'Somos una empresa enfocada en educación que transforma la forma en que las organizaciones enseñan, aprenden y capacitan mediante soluciones de tecnología educativa y e-learning en Colombia. Desarrollamos LMS (Learning Management Systems), simuladores educativos, contenido SCORM y soluciones de capacitación corporativa, integrando innovación, tecnología y metodologías de aprendizaje para crear experiencias formativas más dinámicas, accesibles y efectivas.',
  'Nuestra oferta incluye soluciones de Salesforce educativo, plataformas LMS, contenidos digitales y capacitación empresarial, diseñadas para responder a las necesidades de organizaciones que buscan fortalecer el aprendizaje y desarrollar el talento.',
  'Además, ofrecemos cursos, diplomados y programas técnicos laborales dirigidos directamente a estudiantes, con una formación orientada al desarrollo de competencias y habilidades para el mundo laboral. Así, conectamos la tecnología, la educación y las necesidades del mercado para llevar el aprendizaje más allá de los métodos tradicionales.',
]

export type Project = {
  slug: string
  name: string
  /** Foto de portada de la tarjeta */
  image: string
  /** Fotos que se muestran al abrir la galería (la primera es la portada) */
  photos: string[]
}

export const projects: Project[] = [
  { slug: 'talento-tech', name: 'Talento Tech', image: talentoTech, photos: [talentoTech] },
  { slug: 'jovenes-en-paz', name: 'Jóvenes en Paz', image: jovenesEnPaz, photos: [jovenesEnPaz] },
  { slug: 'ciudad-bolivar', name: 'Ciudad Bolívar', image: ciudadBolivar, photos: [ciudadBolivar] },
]
