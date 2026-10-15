import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import ScrollProgress from './components/motion/ScrollProgress'
import ScrollManager from './components/ScrollManager'
import { AuthProvider } from './context/AuthContext'
import About from './pages/About'
import Account from './pages/Account'
import Checkout from './pages/Checkout'
import Home from './pages/Home'
import PaymentResult from './pages/PaymentResult'
import ProgramDetail from './pages/ProgramDetail'
import Programs from './pages/Programs'

function PageTransition({ children }: { children: ReactNode }) {
  // la perspectiva vive en el contenedor para que el giro de salida se vea en 3D
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotateX: -6, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      exit={{ opacity: 0, y: -18, rotateX: 4, scale: 0.99 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        {/* recorte compartido por las portadas (medidas tomadas del PDF de la propuesta) */}
        <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
          <clipPath id="hero-clip" clipPathUnits="objectBoundingBox">
            <path d="M0,0 H1 V0.668 Q1,0.692 0.982,0.703 L0.516,0.987 Q0.5,0.997 0.484,0.987 L0.018,0.703 Q0,0.692 0,0.668 Z" />
          </clipPath>
        </svg>
        <ScrollManager />
        <ScrollProgress />
        <Header />
        <main className="flex-1" style={{ perspective: '1600px' }}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageTransition>
                    <Home />
                  </PageTransition>
                }
              />
              <Route
                path="/conocenos"
                element={
                  <PageTransition>
                    <About />
                  </PageTransition>
                }
              />
              <Route
                path="/programas"
                element={
                  <PageTransition>
                    <Programs />
                  </PageTransition>
                }
              />
              <Route
                path="/programas/:slug"
                element={
                  <PageTransition>
                    <ProgramDetail />
                  </PageTransition>
                }
              />
              <Route
                path="/inscripcion/:slug"
                element={
                  <PageTransition>
                    <Checkout />
                  </PageTransition>
                }
              />
              <Route
                path="/pago/respuesta"
                element={
                  <PageTransition>
                    <PaymentResult />
                  </PageTransition>
                }
              />
              <Route
                path="/cuenta"
                element={
                  <PageTransition>
                    <Account />
                  </PageTransition>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}
