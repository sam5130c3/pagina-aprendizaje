import cardImg from '../assets/images/Miniatura_tecnico_laboral_desarrollo_sotfware.webp'
import heroBg from '../assets/images/Img_portada_con_fondo.webp'
import heroCollage from '../assets/images/Img_hero_programa_codificacion.webp'
import profileBg from '../assets/images/Fondo_img_perfil_del_egresado.webp'
import carrusel2 from '../assets/images/Img_carrusel_02.webp'
import carrusel3 from '../assets/images/Img_carrusel_03.webp'
import carrusel4 from '../assets/images/Img_carrusel_04.webp'
import grad1 from '../assets/images/Img_degradado_naranja_carrusel_01.webp'
import grad2 from '../assets/images/Img_degradado_naranja_carrusel_02.webp'
import grad3 from '../assets/images/Img_degradado_naranja_carrusel_03.webp'
import grad4 from '../assets/images/Img_degradado_naranja_carrusel_04.webp'

export type AccordionEntry = {
  /** Identificador para enlazar directo a la sección (#hash) */
  id?: string
  title: string
  /**
   * Bloques separados por una línea en blanco. Dentro de un bloque,
   * "- " abre una viñeta, "# " un subtítulo y "**texto**" pone negrita;
   * el resto son párrafos.
   */
  content: string
}

export type Program = {
  slug: string
  eyebrow: string
  name: string
  cardImage: string
  heroBg: string
  heroCollage: string
  profileBg: string
  level: string
  modality: string
  durationHours: string
  credits: string
  /** Plazo total, p. ej. "1 año" */
  duration: string
  /** Periodos en los que se divide, p. ej. "3 trimestres" */
  terms: string
  /** Valor de la inscripción en pesos colombianos, sin decimales */
  price: number
  /** Texto de la franja azul: frase destacada, introducción y datos clave */
  highlight?: string
  intro?: string[]
  keyFacts?: { label: string; text: string }[]
  profileParagraphs: string[]
  accordion: AccordionEntry[]
  comingSoon?: boolean
}

const loremShort =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.'

const codingPrice = 1200000

export const programs: Program[] = [
  {
    slug: 'desarrollo-software-fullstack',
    eyebrow: 'Técnico Laboral en',
    name: 'Manejo de Herramientas para Codificación de Software',
    cardImage: cardImg,
    heroBg,
    heroCollage,
    profileBg,
    level: 'Técnico Laboral',
    modality: '100% virtual',
    durationHours: '864 horas',
    credits: '18 créditos',
    duration: '1 año',
    terms: '3 trimestres',
    price: codingPrice,
    highlight:
      'Aprende a programar, desarrolla aplicaciones web y prepárate para integrarte a equipos de desarrollo de software, con Python, tecnologías web, bases de datos, Git, APIs, Docker, AWS e inteligencia artificial.',
    intro: [
      'Una formación 100 % virtual diseñada para desarrollar las competencias necesarias para participar en procesos de **codificación, integración, prueba, documentación y ejecución de software**.',
      'Durante el programa aprenderás a trabajar con herramientas y tecnologías utilizadas en el desarrollo de aplicaciones web, desde los fundamentos de programación hasta ambientes de nube, automatización e inteligencia artificial aplicada a la codificación.',
    ],
    keyFacts: [
      { label: 'Perfil de ingreso', text: 'bachiller o bachiller técnico.' },
      { label: 'Componente práctico', text: '60% de la formación.' },
      { label: 'Lenguaje principal', text: 'Python.' },
      {
        label: 'Proyecto final',
        text: 'desarrollo de un proyecto integrador y construcción de un portafolio digital.',
      },
    ],
    profileParagraphs: [
      'El egresado del Técnico Laboral en Manejo de Herramientas para Codificación de Software estará preparado para integrarse a equipos de desarrollo de software y participar en la creación, implementación y mantenimiento de soluciones digitales.',
      'Contará con competencias para configurar y utilizar entornos y herramientas de programación, interpretar requerimientos técnicos, estructurar algoritmos, escribir y modificar código, desarrollar componentes de aplicaciones web, trabajar con bases de datos, realizar pruebas y gestionar código mediante sistemas de control de versiones.',
      'También estará familiarizado con herramientas y tecnologías como Python, FastAPI, APIs REST, SQL, PostgreSQL, HTML, CSS, JavaScript, React, Git, GitHub, Docker, fundamentos de Kubernetes, AWS e inteligencia artificial aplicada al desarrollo de software.',
      'Su formación le permitirá participar en procesos de desarrollo frontend y backend, integración de aplicaciones, documentación técnica y apoyo en procesos de despliegue y automatización, trabajando de manera colaborativa y aplicando criterios de calidad, seguridad y uso responsable de la tecnología.',
      'Además de las competencias técnicas, el egresado fortalecerá su pensamiento computacional, capacidad para resolver problemas, trabajo en equipo, aprendizaje continuo e inglés técnico, herramientas fundamentales para desenvolverse en entornos tecnológicos.',
    ],
    accordion: [
      {
        title: '¿Qué aprenderás?',
        content: [
          'Aprenderás a crear, **modificar, ejecutar y verificar código**, utilizando herramientas y entornos propios del desarrollo de software.',
          '# Programación desde cero\n- Pensamiento computacional y lógica de programación.\n- Algoritmos, variables, estructuras de control y funciones.\n- Programación estructurada y orientada a objetos.\n- Python como lenguaje principal.',
          '# Desarrollo de aplicaciones web\n- Frontend: HTML, CSS, JavaScript y React.\n- Backend: Python y FastAPI.\n- Construcción y consumo de APIs REST.\n- Integración entre frontend, backend y bases de datos.',
          '# Datos\n- SQL.\n- Bases de datos relacionales.\n- PostgreSQL.\n- ORM y operaciones CRUD.',
          '# Herramientas profesionales\n- Git y GitHub.\n- Repositorios, ramas, commits y pull requests.\n- Línea de comandos.\n- Documentación técnica.\n- Pruebas y depuración de código.',
          '# Tecnologías emergentes\n- DevOps y CI/CD con GitHub Actions.\n- Docker y fundamentos de Kubernetes.\n- Nube y despliegue con AWS.\n- Inteligencia artificial aplicada a la codificación.',
          'La IA se incorpora como herramienta de apoyo para programar, documentar, probar y depurar, siempre con validación de los resultados y criterios de seguridad, privacidad y uso responsable.',
        ].join('\n\n'),
      },
      {
        title: 'Competencias',
        content: [
          'El programa está estructurado alrededor de cinco competencias laborales principales:',
          '- Reconocer: identificar los componentes y herramientas que hacen parte de un entorno de programación.\n- Verificar: comprobar la compatibilidad técnica y tecnológica de los recursos necesarios para programar.\n- Configurar: instalar y preparar herramientas, dependencias y ambientes de programación.\n- Utilizar: escribir, modificar, organizar y gestionar código utilizando diferentes herramientas y lenguajes.\n- Ejecutar y verificar código: ejecutar programas, identificar errores básicos, realizar ajustes y comprobar su funcionamiento.',
          'Además, desarrollarás competencias transversales en:',
          '- Pensamiento lógico y resolución de problemas.\n- Comunicación técnica.\n- Inglés técnico.\n- Trabajo colaborativo.\n- Aprendizaje autónomo.\n- Adaptabilidad tecnológica.\n- Ética, seguridad y responsabilidad digital.',
        ].join('\n\n'),
      },
      {
        title: 'Plan de estudios',
        content: [
          '# Trimestre 1 — Fundamentación\n288 horas | 6 créditos\n- Pensamiento computacional y lógica de programación — 48 h\n- Inglés técnico para desarrollo de software — 96 h\n- Python desde cero — 96 h\n- Herramientas del desarrollador y flujo de trabajo profesional — 48 h',
          '# Trimestre 2 — Consolidación\n288 horas | 6 créditos\n- APIs REST y FastAPI — 96 h\n- Bases de datos, SQL y ORM — 48 h\n- Autenticación, autorización y pruebas de backend — 48 h\n- Frontend con HTML, CSS, JavaScript y React — 96 h',
          '# Trimestre 3 — Profundización\n288 horas | 6 créditos\n- DevOps y CI/CD con GitHub Actions — 48 h\n- Contenedores con Docker y fundamentos de Kubernetes — 48 h\n- Nube AWS y despliegue con contenedores — 48 h\n- Habilidades socioemocionales para el trabajo en tecnología — 48 h\n- IA aplicada con Claude y proyecto final — 96 h',
          'Total: 18 créditos / 864 horas.',
          'Al menos el 60 % del programa es práctico, con ejercicios de programación, laboratorios, configuración de ambientes, bases de datos, nube, contenedores y un proyecto final 100 % práctico.',
        ].join('\n\n'),
      },
      {
        title: 'Campos laborales',
        content: [
          'El egresado está preparado para desempeñarse en roles de nivel inicial y de apoyo técnico dentro de equipos de desarrollo de software.',
          '# Desarrollo de software\n- Codificación de componentes frontend y backend.\n- Desarrollo e integración de aplicaciones web.\n- Construcción y consumo de APIs.\n- Modificación y mantenimiento de código.',
          '# Pruebas y soporte al desarrollo\n- Ejecución de código.\n- Identificación y corrección de errores básicos.\n- Pruebas automatizadas básicas.\n- Documentación de desarrollos.\n- Gestión de incidencias.',
          '# Equipos de desarrollo\n- Manejo de Git y repositorios.\n- Control de versiones.\n- Integración básica de código.\n- Apoyo en procesos de implementación y despliegue.',
          '# ¿Dónde puede desempeñarse?\nEl egresado podrá participar en equipos y proyectos de desarrollo de software en empresas de tecnología, organizaciones públicas y privadas y diferentes sectores que utilicen soluciones digitales, desempeñando funciones técnicas y de apoyo relacionadas con la programación y codificación de software.',
        ].join('\n\n'),
      },
    ],
  },
  {
    slug: 'proximamente-1',
    eyebrow: 'Técnico Laboral en',
    name: 'XXXXXXXX XX XXXXXXXXXX',
    cardImage: carrusel2,
    heroBg,
    heroCollage: '',
    profileBg,
    level: 'Técnico Laboral',
    modality: '100% virtual',
    durationHours: '812 horas',
    credits: '17 créditos',
    duration: '1 año',
    terms: '3 trimestres',
    price: 1200000,
    profileParagraphs: [loremShort],
    accordion: [],
    comingSoon: true,
  },
  {
    slug: 'proximamente-2',
    eyebrow: 'Técnico Laboral en',
    name: 'XXXXXXXX XX XXXXXXXXXX',
    cardImage: carrusel3,
    heroBg,
    heroCollage: '',
    profileBg,
    level: 'Técnico Laboral',
    modality: '100% virtual',
    durationHours: '812 horas',
    credits: '17 créditos',
    duration: '1 año',
    terms: '3 trimestres',
    price: 1200000,
    profileParagraphs: [loremShort],
    accordion: [],
    comingSoon: true,
  },
  {
    slug: 'proximamente-3',
    eyebrow: 'Técnico Laboral en',
    name: 'XXXXXXXX XX XXXXXXXXXX',
    cardImage: carrusel4,
    heroBg,
    heroCollage: '',
    profileBg,
    level: 'Técnico Laboral',
    modality: '100% virtual',
    durationHours: '812 horas',
    credits: '17 créditos',
    duration: '1 año',
    terms: '3 trimestres',
    price: 1200000,
    profileParagraphs: [loremShort],
    accordion: [],
    comingSoon: true,
  },
]

/** Ruta del detalle del programa principal, donde viven las preguntas frecuentes */
export const faqPath = `/programas/${programs[0].slug}#preguntas-frecuentes`

/**
 * Las cifras (864 h, 18 créditos, tres trimestres) siguen la ficha del
 * programa; las respuestas del documento original que citaban 816 h,
 * 17 créditos y cuatro bimestres se alinearon con esa ficha.
 */
export const faqs: { question: string; answer: string }[] = [
  {
    question: '¿Qué es el Técnico Laboral en Manejo de Herramientas para Codificación de Software?',
    answer:
      'Es un programa de formación para el trabajo orientado al desarrollo de competencias para la programación y codificación de software. Está diseñado para aprender a configurar y utilizar herramientas de desarrollo, escribir y modificar código, trabajar con bases de datos, desarrollar aplicaciones web, realizar pruebas y participar en equipos de desarrollo de software.',
  },
  {
    question: '¿El Técnico Laboral en Programación es virtual?',
    answer:
      'Sí. El Técnico Laboral en Manejo de Herramientas para Codificación de Software de IGNUX LAB es 100 % virtual, lo que permite desarrollar el proceso de formación mediante herramientas y entornos digitales de aprendizaje.',
  },
  {
    question: '¿Cuánto dura el Técnico Laboral en Programación?',
    answer:
      'El programa tiene una intensidad de 864 horas y 18 créditos, distribuidos en tres trimestres de formación. El plan de estudios combina fundamentos de programación, desarrollo web, bases de datos, herramientas profesionales, inteligencia artificial y un proyecto final.',
  },
  {
    question: '¿Qué se aprende en un Técnico Laboral en Programación?',
    answer:
      'Durante el programa aprenderás pensamiento computacional, lógica de programación, Python, desarrollo de APIs, bases de datos y SQL, desarrollo frontend, React, Git y GitHub, pruebas de software, Docker, fundamentos de Kubernetes, AWS, CI/CD e inteligencia artificial aplicada al desarrollo de software.\n\nTambién desarrollarás habilidades de trabajo en equipo, solución de problemas, documentación técnica e inglés técnico para programación.',
  },
  {
    question: '¿Qué lenguajes de programación se aprenden?',
    answer:
      'El programa tiene como uno de sus principales lenguajes de formación Python. Además, aborda tecnologías fundamentales para el desarrollo web como HTML, CSS y JavaScript, junto con React para frontend y FastAPI para el desarrollo de APIs.',
  },
  {
    question: '¿Se aprende desarrollo web en este Técnico Laboral?',
    answer:
      'Sí. El plan de estudios incluye desarrollo frontend y backend, con tecnologías como HTML, CSS, JavaScript, React, Python, FastAPI y APIs REST. También se trabajan bases de datos y herramientas necesarias para integrar diferentes componentes de una aplicación web.',
  },
  {
    question: '¿Se aprende inteligencia artificial en el Técnico Laboral en Programación?',
    answer:
      'Sí. El programa incluye un espacio de IA aplicada con Claude y proyecto final, orientado al uso de herramientas de inteligencia artificial como apoyo para actividades de programación, documentación, pruebas, depuración y solución de problemas.\n\nLa inteligencia artificial se aborda como una herramienta complementaria a los fundamentos de programación y requiere validación, criterios de seguridad, ética y uso responsable.',
  },
  {
    question: '¿Qué herramientas y tecnologías se aprenden?',
    answer:
      'A lo largo del programa tendrás contacto con tecnologías y herramientas utilizadas en diferentes etapas del desarrollo de software, entre ellas:\n- Python\n- FastAPI\n- APIs REST\n- SQL y bases de datos relacionales\n- PostgreSQL\n- ORM\n- HTML, CSS y JavaScript\n- React\n- Git y GitHub\n- GitHub Actions\n- Docker\n- Fundamentos de Kubernetes\n- AWS\n- Claude e inteligencia artificial aplicada',
  },
  {
    question: '¿Necesito saber programación para estudiar este Técnico Laboral?',
    answer:
      'No se requiere partir de conocimientos avanzados de programación. El plan de estudios comienza con pensamiento computacional y lógica de programación, seguido por Python desde cero y herramientas del desarrollador.\n\nEl programa está orientado a desarrollar progresivamente las competencias necesarias para trabajar con herramientas de codificación de software.',
  },
  {
    question: '¿Qué competencias desarrolla el Técnico Laboral en Programación?',
    answer:
      'El programa desarrolla competencias relacionadas con el manejo de herramientas para la codificación de software, entre ellas:\n- Reconocer los componentes funcionales de un entorno de programación.\n- Verificar la compatibilidad técnica y tecnológica.\n- Configurar entornos y herramientas de desarrollo.\n- Utilizar herramientas de programación de acuerdo con criterios técnicos.\n- Ejecutar código de programación de software.\n\nTambién fortalece el pensamiento lógico, la resolución de problemas, el trabajo colaborativo, la documentación técnica y el aprendizaje continuo.',
  },
  {
    question: '¿Cuáles son las materias del Técnico Laboral en Programación?',
    answer:
      'El plan de estudios está organizado en tres trimestres:\n# Trimestre 1 — Fundamentación\n- Pensamiento computacional y lógica de programación\n- Inglés técnico para desarrollo de software\n- Python desde cero\n- Herramientas del desarrollador y flujo de trabajo profesional\n\n# Trimestre 2 — Consolidación\n- APIs REST y FastAPI\n- Bases de datos, SQL y ORM\n- Autenticación, autorización y pruebas de backend\n- Frontend con HTML, CSS, JavaScript y React\n\n# Trimestre 3 — Profundización\n- DevOps y CI/CD con GitHub Actions\n- Contenedores con Docker y fundamentos de Kubernetes\n- Nube AWS y despliegue con contenedores\n- Habilidades socioemocionales para el trabajo en tecnología\n- IA aplicada con Claude y proyecto final',
  },
  {
    question: '¿El Técnico Laboral en Programación tiene formación práctica?',
    answer:
      'Sí. El programa tiene un enfoque práctico: aproximadamente el 60 % de la intensidad total corresponde a formación práctica.\n\nLa metodología busca que el estudiante aplique sus conocimientos mediante ejercicios, desarrollo de soluciones y un proyecto integrador que contribuya a construir un portafolio de evidencias.',
  },
  {
    question: '¿Qué proyecto se realiza al finalizar el Técnico Laboral?',
    answer:
      'El programa incluye un proyecto final integrador, en el que se ponen en práctica los conocimientos y competencias desarrollados durante la formación.\n\nEl proyecto permite integrar diferentes áreas como programación, desarrollo web, bases de datos, herramientas de desarrollo, despliegue e inteligencia artificial.',
  },
  {
    question: '¿En qué puede trabajar un Técnico Laboral en Programación?',
    answer:
      'Al finalizar la formación, podrás participar en equipos de desarrollo de software en roles iniciales y de apoyo relacionados con la codificación y desarrollo de soluciones digitales.\n\nLas competencias del programa permiten participar en actividades como:\n- Desarrollo de componentes frontend y backend.\n- Codificación y modificación de software.\n- Desarrollo y consumo de APIs.\n- Manejo de bases de datos.\n- Integración de componentes de aplicaciones web.\n- Pruebas básicas de software.\n- Gestión de código fuente.\n- Documentación técnica.\n- Apoyo en procesos de integración, contenedores y despliegue.',
  },
  {
    question: '¿Cuáles son las salidas laborales de un Técnico Laboral en Programación?',
    answer:
      'Las competencias adquiridas pueden aplicarse en organizaciones que desarrollen o utilicen soluciones digitales, incluyendo empresas de tecnología, organizaciones públicas y privadas y compañías de diferentes sectores productivos.\n\nEntre los sectores donde pueden existir oportunidades se encuentran tecnología, educación, salud, comercio, industria, finanzas, agroindustria, logística y administración pública.',
  },
  {
    question: '¿Puedo trabajar mientras estudio el Técnico Laboral en Programación?',
    answer:
      'La modalidad virtual puede facilitar la organización del tiempo de estudio con otras actividades. Sin embargo, la posibilidad de trabajar simultáneamente dependerá de la disponibilidad y organización de cada estudiante.',
  },
  {
    question: '¿El Técnico Laboral en Programación es lo mismo que estudiar Ingeniería de Software?',
    answer:
      'No. Un Técnico Laboral y una carrera profesional en Ingeniería de Software son rutas de formación diferentes.\n\nEste programa está orientado al desarrollo de competencias laborales específicas para el manejo de herramientas de codificación de software y a la preparación para desempeñarse en funciones técnicas y de apoyo dentro de equipos de desarrollo.',
  },
  {
    question: '¿Qué diferencia hay entre un curso de programación y un Técnico Laboral en Programación?',
    answer:
      'Un curso de programación puede estar enfocado en aprender una herramienta, lenguaje o habilidad específica. En cambio, un programa de formación laboral desarrolla un conjunto estructurado de competencias laborales, con un plan de estudios que integra diferentes áreas de formación.\n\nEn Colombia, los programas de formación laboral hacen parte de la Educación para el Trabajo y el Desarrollo Humano y están orientados a desarrollar competencias específicas relacionadas con los sectores productivos.',
  },
  {
    question: '¿Qué requisitos se necesitan para estudiar este Técnico Laboral?',
    answer:
      'De acuerdo con la información del programa, está dirigido principalmente a personas con formación de bachiller o bachiller técnico.\n\nLos requisitos específicos de admisión deben ser confirmados directamente con IGNUX LAB.',
  },
  {
    question: '¿Qué certificado se obtiene al terminar el Técnico Laboral?',
    answer:
      'Al culminar satisfactoriamente un programa de formación laboral se puede obtener un Certificado de Técnico Laboral por Competencias, de acuerdo con las condiciones y autorización correspondientes de la institución educativa. El Ministerio de Educación Nacional establece que este certificado se otorga a quienes alcanzan satisfactoriamente las competencias establecidas en el programa.',
  },
]

export const studyCards = [
  { title: '¿Cómo puedo inscribirme?', text: loremShort, image: grad3 },
  { title: 'Beneficios de estudiar con nosotros', text: loremShort, image: grad1 },
  { title: '¿Qué puedo estudiar?', text: loremShort, image: grad2 },
  { title: '¿Cómo puedo inscribirme?', text: loremShort, image: grad3 },
  { title: '¿Por qué debería elegirlo?', text: loremShort, image: grad4 },
]
