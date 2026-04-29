import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { fleetCategories, type Vehicle } from '../data/buses'

gsap.registerPlugin(ScrollTrigger)

interface WorksProps {
  scrollRef: React.MutableRefObject<{ y: number; speed: number }>
  onSelectBus: (id: string) => void
}

export default function Works({ onSelectBus }: WorksProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeCategory, setActiveCategory] = useState('minivan-standard')

  const currentCategory = fleetCategories.find((c) => c.id === activeCategory)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from('.vehicle-card', {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          once: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [activeCategory])

  return (
    <section
      id="works"
      ref={sectionRef}
      style={{
        backgroundColor: '#0b0b0b',
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 4vw, 60px)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(40px, 6vw, 64px)',
          }}
        >
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.24em',
              color: '#C8A97E',
              textTransform: 'uppercase',
              marginBottom: '18px',
            }}
          >
            Автопарк
          </p>
          <h2
            style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#ffffff',
              marginBottom: '16px',
            }}
          >
            Наш автопарк
          </h2>
          <p
            style={{
              fontSize: 'clamp(14px, 1.2vw, 17px)',
              color: 'rgba(255,255,255,0.6)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            В нашем распоряжении огромное количество разнообразных автомобилей
            в разных странах.
          </p>
        </div>

        {/* Category tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2px',
            marginBottom: '48px',
            flexWrap: 'wrap',
          }}
        >
          {fleetCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '12px 24px',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: cat.id === activeCategory ? '#ffffff' : 'rgba(255,255,255,0.5)',
                backgroundColor:
                  cat.id === activeCategory ? 'rgba(200,169,126,0.2)' : 'transparent',
                border: 'none',
                borderBottom:
                  cat.id === activeCategory ? '2px solid #C8A97E' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                fontFamily: '"Helvetica Neue", sans-serif',
                whiteSpace: 'nowrap',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Vehicles grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fill, minmax(min(100%, 400px), 1fr))',
            gap: '24px',
          }}
        >
          {currentCategory?.vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onClick={() => onSelectBus(vehicle.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function VehicleCard({
  vehicle,
  onClick,
}: {
  vehicle: Vehicle
  onClick: () => void
}) {
  const [btnHovered, setBtnHovered] = useState(false)

  return (
    <div
      className="vehicle-card"
      style={{
        backgroundColor: '#111111',
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/10',
          overflow: 'hidden',
          backgroundColor: '#1a1a1a',
          cursor: 'pointer',
        }}
        onClick={onClick}
      >
        <img
          src={vehicle.img}
          alt={vehicle.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.5s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
        />
      </div>

      {/* Info */}
      <div
        style={{
          padding: '20px 24px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          flex: 1,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
          <div>
            <h3
              style={{
                fontSize: '17px',
                fontWeight: 500,
                color: '#ffffff',
                letterSpacing: '-0.01em',
                lineHeight: 1.3,
              }}
            >
              {vehicle.title}
            </h3>
            {vehicle.subtitle && (
              <p
                style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.45)',
                  marginTop: '2px',
                }}
              >
                {vehicle.subtitle}
              </p>
            )}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            marginTop: '4px',
          }}
        >
          <span
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#C8A97E',
            }}
          >
            {vehicle.price}
          </span>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            {vehicle.capacity}
          </span>
        </div>

        <a
          href="https://t.me/INTELEGENT_Spb"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            display: 'inline-block',
            padding: '12px 28px',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: btnHovered ? '#0b0b0b' : '#ffffff',
            backgroundColor: btnHovered ? '#C8A97E' : 'transparent',
            border: '1px solid #C8A97E',
            textDecoration: 'none',
            transition: 'all 0.25s ease',
            fontFamily: '"Helvetica Neue", sans-serif',
            textAlign: 'center',
            marginTop: '8px',
            alignSelf: 'flex-start',
          }}
        >
          Заказать
        </a>
      </div>
    </div>
  )
}
