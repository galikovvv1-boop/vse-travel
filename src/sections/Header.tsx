import { useEffect, useRef, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router'
import { TelegramIcon } from '@/components/TelegramIcon'

interface HeaderProps {
  scrollRef: React.MutableRefObject<{ y: number; speed: number }>
  forceLight?: boolean
}

const navItems = ['Услуги', 'Автопарк', 'Контакты']
const sectionIds = ['#capabilities', '#works', '#footer']

function getOAuthUrl() {
  const kimiAuthUrl = import.meta.env.VITE_KIMI_AUTH_URL
  const appID = import.meta.env.VITE_APP_ID
  const redirectUri = `${window.location.origin}/api/oauth/callback`
  const state = btoa(redirectUri)

  const url = new URL(`${kimiAuthUrl}/api/oauth/authorize`)
  url.searchParams.set('client_id', appID)
  url.searchParams.set('redirect_uri', redirectUri)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('scope', 'profile')
  url.searchParams.set('state', state)

  return url.toString()
}

export default function Header({ scrollRef, forceLight = false }: HeaderProps) {
  const [isCompact, setIsCompact] = useState(false)
  const [overHeroRaw, setOverHeroRaw] = useState(true)
  const rafRef = useRef<number>(0)
  const navigate = useNavigate()

  useEffect(() => {
    const check = () => {
      const y = scrollRef.current.y
      setIsCompact(y > 100)
      setOverHeroRaw(y < window.innerHeight * 0.85)
      rafRef.current = requestAnimationFrame(check)
    }
    rafRef.current = requestAnimationFrame(check)
    return () => cancelAnimationFrame(rafRef.current)
  }, [scrollRef])

  const overHero = overHeroRaw && !forceLight
  const { user, isAuthenticated, logout } = useAuth()

  const handleNavClick = (index: number) => {
    const target = document.querySelector(sectionIds[index])
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const textColor = overHero ? '#ffffff' : '#000000'

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: isCompact ? '64px' : '88px',
        backgroundColor: overHero ? 'transparent' : '#ffffff',
        borderBottom: overHero
          ? '1px solid rgba(255,255,255,0.18)'
          : '1px solid #e5e5e5',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(20px, 4vw, 60px)',
        transition:
          'height 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease, border-color 0.4s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <div
          style={{
            fontSize: '20px',
            fontWeight: 600,
            letterSpacing: '0.18em',
            cursor: 'pointer',
            color: textColor,
            transition: 'color 0.4s ease',
          }}
          onClick={() => {
            navigate('/')
            setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)
          }}
        >
          VSE TRAVEL
        </div>
        <span
          style={{
            fontSize: '11px',
            color: overHero ? 'rgba(255,255,255,0.6)' : '#999',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            display: window.innerWidth > 640 ? 'block' : 'none',
          }}
        >
          Трансферная компания
        </span>
      </div>

      <nav style={{ display: 'flex', alignItems: 'stretch', height: '100%' }}>
        {navItems.map((item, i) => (
          <NavItem
            key={item}
            label={item}
            overHero={overHero}
            onClick={() => handleNavClick(i)}
          />
        ))}
        <a
          href="https://t.me/INTELEGENT_Spb"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            color: overHero ? '#ffffff' : '#000000',
            textDecoration: 'none',
            transition: 'color 0.4s ease',
          }}
          title="Написать в Telegram"
        >
          <TelegramIcon className="size-5" />
        </a>
        <a
          href="tel:+79052794030"
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.06em',
            color: overHero ? '#ffffff' : '#000000',
            textDecoration: 'none',
            transition: 'color 0.4s ease',
            whiteSpace: 'nowrap',
          }}
        >
          +7 (905) 279-40-30
        </a>

        {isAuthenticated && user ? (
          <>
            <NavItem
              label="Кабинет"
              overHero={overHero}
              onClick={() => navigate('/dashboard')}
            />
            <NavItem
              label="Выйти"
              overHero={overHero}
              onClick={logout}
            />
          </>
        ) : (
          <NavItem
            label="Войти"
            overHero={overHero}
            onClick={() => { window.location.href = getOAuthUrl() }}
          />
        )}
      </nav>
    </header>
  )
}

function NavItem({
  label,
  overHero,
  onClick,
}: {
  label: string
  overHero: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  const baseColor = overHero ? '#ffffff' : '#000000'
  const hoverBg = overHero ? '#C8A97E' : '#C8A97E'
  const hoverFg = '#ffffff'

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 20px',
        fontSize: '13px',
        fontWeight: 400,
        letterSpacing: '0.08em',
        backgroundColor: hovered ? hoverBg : 'transparent',
        color: hovered ? hoverFg : baseColor,
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.25s ease, color 0.25s ease',
        whiteSpace: 'nowrap',
        fontFamily: '"Helvetica Neue", sans-serif',
        textTransform: 'uppercase',
      }}
    >
      {label}
    </button>
  )
}
