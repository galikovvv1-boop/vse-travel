import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { allVehicles } from '../data/buses'

interface BusDetailProps {
  busId: string
  onBack: () => void
}

export default function BusDetail({ busId, onBack }: BusDetailProps) {
  const vehicle = allVehicles.find((v) => v.id === busId)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [reserveHovered, setReserveHovered] = useState(false)
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      gsap.from('.detail-fade', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.2,
      })
    }, section)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  if (!vehicle) {
    return (
      <div style={{ padding: '120px 40px', textAlign: 'center' }}>
        <h2>Автомобиль не найден</h2>
        <button onClick={onBack}>Назад</button>
      </div>
    )
  }

  return (
    <div
      ref={sectionRef}
      style={{
        paddingTop: '88px',
        backgroundColor: '#ffffff',
        minHeight: '100vh',
      }}
    >
      {/* Hero image */}
      <div
        style={{
          width: '100%',
          height: 'clamp(280px, 45vh, 520px)',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#0b0b0b',
        }}
      >
        <img
          src={vehicle.img}
          alt={vehicle.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)',
          }}
        />
        <div
          className="detail-fade"
          style={{
            position: 'absolute',
            bottom: 'clamp(24px, 4vw, 48px)',
            left: 'clamp(24px, 4vw, 48px)',
            color: '#ffffff',
          }}
        >
          {vehicle.subtitle && (
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.2em',
                color: '#C8A97E',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              {vehicle.subtitle}
            </p>
          )}
          <h1
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            {vehicle.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: 'clamp(40px, 6vw, 64px) clamp(20px, 4vw, 40px)',
        }}
      >
        {/* Price row */}
        <div
          className="detail-fade"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '40px',
            paddingBottom: '32px',
            borderBottom: '1px solid #e5e5e5',
          }}
        >
          <div>
            <span
              style={{
                fontSize: 'clamp(28px, 3.5vw, 40px)',
                fontWeight: 400,
                color: '#000000',
                letterSpacing: '-0.02em',
              }}
            >
              {vehicle.price}
            </span>
          </div>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '15px',
              color: '#666666',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            {vehicle.capacity}
          </span>
        </div>

        {/* CTA */}
        <div
          className="detail-fade"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={onBack}
              style={{
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.14em',
                color: '#000000',
                backgroundColor: 'transparent',
                border: '1px solid #000000',
                padding: '16px 32px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                transition: 'all 0.25s ease',
                fontFamily: '"Helvetica Neue", sans-serif',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#000000'
                e.currentTarget.style.color = '#ffffff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#000000'
              }}
            >
              &#8592; Назад
            </button>
            <a
              href="https://t.me/INTELEGENT_Spb"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setReserveHovered(true)}
              onMouseLeave={() => setReserveHovered(false)}
              style={{
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.14em',
                color: reserveHovered ? '#0b0b0b' : '#ffffff',
                backgroundColor: reserveHovered ? '#C8A97E' : '#000000',
                border: '1px solid #000000',
                padding: '16px 32px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                transition: 'all 0.25s ease',
                fontFamily: '"Helvetica Neue", sans-serif',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Заказать
            </a>
          </div>
          <p style={{ fontSize: '13px', color: '#666666', margin: 0 }}>
            Быстрый ответ — напишите нам в{' '}
            <a
              href="https://t.me/INTELEGENT_Spb"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#C8A97E', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
            >
              Telegram @INTELEGENT_Spb
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
