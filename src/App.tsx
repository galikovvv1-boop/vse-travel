import { useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import Header from './sections/Header'
import Hero from './sections/Hero'
import Philosophy from './sections/Philosophy'
import Works from './sections/Works'
import Capabilities from './sections/Capabilities'
import Spatial from './sections/Spatial'
import HowWeWork from './sections/HowWeWork'
import Footer from './sections/Footer'
import Preloader from './sections/Preloader'
import BusDetail from './pages/BusDetail'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { ChatWidget } from './components/ai-chat/ChatWidget'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function AppContent() {
  const scrollRef = useRef({ y: 0, speed: 0 })
  const [currentBusId, setCurrentBusId] = useState<string | null>(null)
  const location = useLocation()
  const isDashboard = location.pathname === '/dashboard'
  const isBusDetail = currentBusId !== null

  useEffect(() => {
    let rafId: number
    let prevY = window.scrollY

    const tick = () => {
      const y = window.scrollY
      const delta = y - prevY
      scrollRef.current.y = y
      scrollRef.current.speed = delta
      prevY = y
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafId)
  }, [])

  const handleSelectBus = (id: string) => {
    setCurrentBusId(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const handleBack = () => {
    setCurrentBusId(null)
    setTimeout(() => {
      document.querySelector('#works')?.scrollIntoView({ behavior: 'auto' })
    }, 0)
  }

  return (
    <>
      <ScrollToTop />
      {!isDashboard && <Preloader />}
      <Header scrollRef={scrollRef} forceLight={isDashboard || isBusDetail} />

      {isDashboard ? (
        <Dashboard />
      ) : currentBusId ? (
        <BusDetail busId={currentBusId} onBack={handleBack} />
      ) : (
        <main>
          <Spatial />
          <Philosophy />
          <Works scrollRef={scrollRef} onSelectBus={handleSelectBus} />
          <Capabilities />
          <HowWeWork />
          <Hero />
          <Footer />
        </main>
      )}
      <ChatWidget />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<AppContent />} />
    </Routes>
  )
}
