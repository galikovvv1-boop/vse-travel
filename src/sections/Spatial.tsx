import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Spatial() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [hovered2, setHovered2] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const ctx = gsap.context(() => {
      gsap.from(content.children, {
        y: 40,
        opacity: 0,
        duration: 1.1,
        stagger: 0.18,
        ease: 'power3.out',
        delay: 0.4,
      })
    }, section)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.play().catch(() => {})
  }, [])

  return (
    <section
      id="spatial"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '640px',
        overflow: 'hidden',
        backgroundColor: '#0b0b0b',
      }}
    >
      <video
        ref={videoRef}
        src="/videos/hero-travel.mp4"
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.70) 100%)',
        }}
      />

      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: '28px',
          padding: '0 clamp(32px, 4.5vw, 72px)',
        }}
      >
        <span
          style={{
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.28em',
            color: 'rgba(255,255,255,0.8)',
            textTransform: 'uppercase',
          }}
        >
          Трансферная компания Санкт-Петербурга
        </span>

        <h1
          style={{
            fontSize: 'clamp(40px, 7vw, 100px)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: 1.02,
            color: '#ffffff',
            maxWidth: '900px',
            textShadow: '0 2px 24px rgba(0,0,0,0.25)',
          }}
        >
          Групповые
          <br />
          трансферы
        </h1>

        <p
          style={{
            fontSize: 'clamp(15px, 1.2vw, 18px)',
            fontWeight: 300,
            lineHeight: 1.65,
            color: 'rgba(255,255,255,0.88)',
            maxWidth: '520px',
          }}
        >
          Организация групповых трансферов для туристов и корпоративных
          клиентов в Санкт-Петербурге, Москве и других городах. VSE
          путешествуют, а мы помогаем.
        </p>

        <div style={{ display: 'flex', gap: '16px', marginTop: '12px', flexWrap: 'wrap' }}>
          <a
            href="https://t.me/INTELEGENT_spb"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.14em',
              color: hovered ? '#0b0b0b' : '#ffffff',
              backgroundColor: hovered ? '#C8A97E' : 'transparent',
              border: '1px solid #C8A97E',
              padding: '16px 36px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              fontFamily: '"Helvetica Neue", sans-serif',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Рассчитать стоимость
          </a>
          <button
            onClick={() => document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' })}
            onMouseEnter={() => setHovered2(true)}
            onMouseLeave={() => setHovered2(false)}
            style={{
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.14em',
              color: hovered2 ? '#C8A97E' : '#ffffff',
              backgroundColor: 'transparent',
              border: 'none',
              padding: '16px 8px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              fontFamily: '"Helvetica Neue", sans-serif',
              textDecoration: 'underline',
              textUnderlineOffset: '6px',
              transition: 'color 0.3s ease',
            }}
          >
            Оставить заявку →
          </button>
        </div>
      </div>
    </section>
  )
}
