import { useState } from 'react'
import { TelegramIcon } from '@/components/TelegramIcon'

export default function Footer() {
  return (
    <footer
      id="footer"
      style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid #000000',
        padding: '80px clamp(20px, 4vw, 60px) 0',
        minHeight: '500px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}
    >
      {/* Top: Info */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          paddingBottom: '80px',
        }}
      >
        <InfoColumn
          title="КОНТАКТЫ"
          items={[
            'Тел: +7 (905) 279-40-30',
            'Telegram: @INTELEGENT_Spb',
            'VK: vk.com/club227375437',
            'WhatsApp: +7 (905) 279-40-30',
          ]}
        />
        <InfoColumn
          title="НАВИГАЦИЯ"
          items={[
            'Главная',
            'Услуги',
            'Автопарк',
            'Контакты',
          ]}
          isNav
        />
        <InfoColumn
          title="УСЛУГИ"
          items={[
            'Туристические группы',
            'Корпоративные перевозки',
            'Трансферы для мероприятий',
            'Международные перевозки',
          ]}
        />
        <div>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.18em',
              color: '#000000',
              marginBottom: '20px',
            }}
          >
            СОЦСЕТИ
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <SocialLink href="https://t.me/INTELEGENT_Spb" label="TG" icon />
            <SocialLink href="https://vk.com/club227375437" label="VK" />
            <SocialLink href="https://wa.me/79052794030" label="WA" />
          </div>
        </div>
      </div>

      {/* Bottom: Giant Wordmark */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          lineHeight: 0.85,
          paddingBottom: '0',
        }}
      >
        <span
          style={{
            display: 'block',
            fontSize: 'clamp(60px, 15vw, 280px)',
            fontWeight: 400,
            letterSpacing: '-0.04em',
            color: '#000000',
            whiteSpace: 'nowrap',
            transform: 'translateY(15%)',
            userSelect: 'none',
          }}
        >
          VSE TRAVEL
        </span>
      </div>

      {/* Copyright */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          padding: '24px 0',
          borderTop: '1px solid #e5e5e5',
          marginTop: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <p style={{ fontSize: '12px', color: '#999999' }}>
            &copy; 2025 VSE Travel. Все права защищены.
          </p>
          <p style={{ fontSize: '12px', color: '#999999' }}>
            Политика конфиденциальности
          </p>
        </div>
      </div>
    </footer>
  )
}

function InfoColumn({
  title,
  items,
  isNav,
}: {
  title: string
  items: string[]
  isNav?: boolean
}) {
  return (
    <div>
      <p
        style={{
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '0.18em',
          color: '#000000',
          marginBottom: '20px',
        }}
      >
        {title}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {items.map((item) =>
          isNav ? (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                fontSize: '14px',
                color: '#666666',
                textDecoration: 'none',
                lineHeight: 1.6,
                transition: 'color 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#C8A97E')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#666666')}
            >
              {item}
            </a>
          ) : (
            <p
              key={item}
              style={{ fontSize: '14px', color: '#666666', lineHeight: 1.6, margin: 0 }}
            >
              {item}
            </p>
          )
        )}
      </div>
    </div>
  )
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon?: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '44px',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `1px solid ${hovered ? '#C8A97E' : '#000000'}`,
        color: hovered ? '#C8A97E' : '#000000',
        fontSize: '12px',
        fontWeight: 500,
        letterSpacing: '0.08em',
        textDecoration: 'none',
        transition: 'all 0.25s ease',
      }}
    >
      {icon ? <TelegramIcon className="size-5" /> : label}
    </a>
  )
}

