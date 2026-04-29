import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const services: { label: string; detail: string }[] = [
  { label: 'Полная прозрачность', detail: 'Работаем строго по официальному договору. Полный пакет закрывающих финансовых и транспортных документов для бухгалтерии.' },
  { label: 'Ответственность', detail: 'Ответственность по договору. Гарантируем защиту интересов обеих сторон на каждом этапе сотрудничества.' },
  { label: 'Полный пакет документов', detail: 'Все необходимые транспортные документы. Работаем с НДС и без. Бухгалтерский отчёт в полном объёме.' },
  { label: 'Современный автопарк', detail: 'Автобусы до 49 и 53 мест, минивэны стандарт и бизнес-класса. Технически исправный транспорт любой вместимости.' },
  { label: 'Профессиональные водители', detail: 'Опытные водители со стажем работы от 5 лет. Знание маршрутов Санкт-Петербурга, Москвы и других регионов.' },
  { label: 'Оперативная поддержка', detail: 'Контроль выполнения поездки и оперативное решение всех возникающих вопросов 24/7.' },
  { label: 'Гибкое ценообразование', detail: 'Индивидуальный расчёт стоимости под ваши задачи. Прозрачные цены без скрытых платежей.' },
  { label: 'Международные перевозки', detail: 'Организация трансферов не только по России, но и в других странах. Международные версии с worldwide transfers.' },
]

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from('.adv-item', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          once: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#0b0b0b',
        padding: 'clamp(100px, 12vw, 160px) clamp(20px, 4vw, 60px)',
      }}
    >
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Top: title row */}
        <div
          style={{
            display: 'flex',
            gap: 'clamp(32px, 6vw, 80px)',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            marginBottom: '60px',
            paddingBottom: '28px',
            borderBottom: '1px solid rgba(255,255,255,0.35)',
          }}
        >
          <div style={{ flex: '1 1 500px' }}>
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.24em',
                color: '#C8A97E',
                textTransform: 'uppercase',
                marginBottom: '18px',
              }}
            >
              Почему выбирают нас
            </p>
            <h2
              style={{
                fontSize: 'clamp(40px, 6vw, 80px)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                color: '#ffffff',
                marginBottom: '24px',
              }}
            >
              Преимущества
            </h2>
            <p
              style={{
                fontSize: 'clamp(15px, 1.2vw, 18px)',
                fontWeight: 300,
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.78)',
                maxWidth: '640px',
              }}
            >
              Мы обеспечиваем полную юридическую и финансовую прозрачность.
              Работаем строго по договору — это гарантирует защиту интересов
              обеих сторон и ваше спокойствие в каждой поездке.
            </p>
          </div>
          <div
            style={{
              flex: '0 0 clamp(180px, 22vw, 280px)',
              aspectRatio: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <OrbitalBadge />
          </div>
        </div>

        {/* Bullet grid */}
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '2px',
            backgroundColor: 'rgba(255,255,255,0.18)',
            border: '1px solid rgba(255,255,255,0.18)',
          }}
        >
          {services.map((service, i) => (
            <BulletItem key={service.label} index={i} {...service} />
          ))}
        </ul>
      </div>
    </section>
  )
}

function BulletItem({
  label,
  detail,
  index,
}: {
  label: string
  detail: string
  index: number
}) {
  return (
    <li
      className="adv-item"
      style={{
        backgroundColor: 'rgba(11,11,11,0.55)',
        padding: '28px 32px',
        display: 'flex',
        gap: '20px',
        alignItems: 'flex-start',
        minHeight: '140px',
      }}
    >
      <span
        style={{
          flex: '0 0 auto',
          width: '28px',
          fontSize: '11px',
          letterSpacing: '0.14em',
          color: '#C8A97E',
          fontVariantNumeric: 'tabular-nums',
          paddingTop: '7px',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <div style={{ flex: '1 1 0%' }}>
        <h3
          style={{
            fontSize: 'clamp(18px, 1.6vw, 24px)',
            fontWeight: 500,
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
            color: '#ffffff',
            marginBottom: '10px',
          }}
        >
          {label}
        </h3>
        <p
          style={{
            fontSize: '14px',
            lineHeight: 1.55,
            color: 'rgba(255,255,255,0.72)',
            margin: 0,
          }}
        >
          {detail}
        </p>
      </div>
    </li>
  )
}

function OrbitalBadge() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const pathId = `orbital-path-${Math.floor(Math.random() * 10000)}`
    const duration = 25

    const path = svg.querySelector('path')
    if (!path) return

    path.setAttribute('id', pathId)
    path.setAttribute('fill', 'none')

    const textContent = 'VSE TRAVEL \u2022 ТРАНСФЕРНАЯ КОМПАНИЯ \u2022 САНКТ-ПЕТЕРБУРГ \u2022 '

    const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    textEl.setAttribute('fill', '#ffffff')
    textEl.setAttribute('font-family', "'Helvetica Neue', sans-serif")
    textEl.setAttribute('font-size', '18px')
    textEl.setAttribute('font-weight', '500')
    textEl.setAttribute('letter-spacing', '2px')

    const tp1 = document.createElementNS('http://www.w3.org/2000/svg', 'textPath')
    tp1.setAttribute('href', `#${pathId}`)
    tp1.setAttribute('startOffset', '0%')
    tp1.textContent = textContent

    const tp2 = document.createElementNS('http://www.w3.org/2000/svg', 'textPath')
    tp2.setAttribute('href', `#${pathId}`)
    tp2.setAttribute('startOffset', '0%')
    tp2.textContent = textContent

    textEl.appendChild(tp1)
    textEl.appendChild(tp2)
    svg.appendChild(textEl)

    const textPaths = svg.querySelectorAll('textPath')

    const tween1 = gsap.fromTo(
      textPaths[0],
      { attr: { startOffset: '0%' } },
      { attr: { startOffset: '-100%' }, duration, ease: 'none', repeat: -1 }
    )

    const tween2 = gsap.fromTo(
      textPaths[1],
      { attr: { startOffset: '100%' } },
      { attr: { startOffset: '0%' }, duration, ease: 'none', repeat: -1 }
    )

    return () => {
      tween1.kill()
      tween2.kill()
    }
  }, [])

  return (
    <div
      className="orbital-svg-container"
      style={{
        width: '100%',
        height: '100%',
        transform: 'rotate(-15deg)',
      }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 400 400"
        style={{ width: '100%', height: '100%' }}
      >
        <path
          d="M200,40 A160,160 0 1,1 199.99,40"
          fill="none"
          stroke="#C8A97E"
          strokeWidth="0.5"
          opacity="0.35"
        />
      </svg>
    </div>
  )
}
