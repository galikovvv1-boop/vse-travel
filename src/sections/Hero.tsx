import { useEffect, useState } from 'react'
import { trpc } from '@/providers/trpc'
import { useAuth } from '@/hooks/useAuth'

export default function Hero() {
  const [submitHovered, setSubmitHovered] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    route: '',
    passengers: '',
    message: '',
  })

  const { user } = useAuth()

  // Pre-fill name from authenticated user
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || prev.name,
      }))
    }
  }, [user])

  const createTransfer = trpc.transfer.create.useMutation({
    onSuccess: () => {
      setSubmitted(true)
      setSubmitError(null)
    },
    onError: (err) => {
      setSubmitError(err.message || 'Что-то пошло не так. Попробуйте снова.')
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    if (!formData.name || !formData.phone || !formData.route || !formData.passengers) {
      setSubmitError('Пожалуйста, заполните все обязательные поля.')
      return
    }

    createTransfer.mutate({
      name: formData.name,
      phone: formData.phone,
      route: formData.route,
      passengers: formData.passengers,
      message: formData.message || undefined,
      userId: user?.id,
    })
  }

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '700px',
        backgroundColor: '#0b0b0b',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
      }}
    >
      {/* Left: info */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '420px',
          overflow: 'hidden',
          backgroundColor: '#111111',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(40px, 5vw, 72px)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '4px',
            background: 'linear-gradient(90deg, #C8A97E 0%, #E8D5B5 50%, #C8A97E 100%)',
          }}
        />
        <div style={{ maxWidth: '480px' }}>
          <h2
            style={{
              fontSize: 'clamp(36px, 4.5vw, 64px)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: 1.02,
              color: '#ffffff',
              marginBottom: '24px',
            }}
          >
            Получить
            <br />
            точный расчёт
          </h2>
          <p
            style={{
              fontSize: '16px',
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.75)',
              marginBottom: '36px',
            }}
          >
            Оставьте контакты, и наш менеджер подготовит детализированное
            коммерческое предложение в течение 1-2 часов.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <ContactRow label="Телефон" value="+7 (905) 279-40-30" href="tel:+79052794030" />
            <ContactRow label="Telegram" value="@VSEtravell" href="https://t.me/VSEtravell" />
            <ContactRow label="VK" value="vse-travel" href="https://vk.com/club227375437" />
            <ContactRow label="WhatsApp" value="+7 (905) 279-40-30" href="https://wa.me/79052794030" />
          </div>
        </div>
      </div>

      {/* Right: form */}
      <div
        style={{
          backgroundColor: '#0b0b0b',
          color: '#ffffff',
          padding: 'clamp(40px, 5vw, 72px) clamp(24px, 4vw, 60px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div style={{ maxWidth: '520px', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.24em',
              color: '#C8A97E',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}
          >
            Онлайн-заявка
          </p>
          <h3
            style={{
              fontSize: 'clamp(28px, 3.2vw, 40px)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              marginBottom: '36px',
            }}
          >
            Расчёт стоимости для вашей группы
          </h3>

          {submitted ? (
            <div
              style={{
                border: '1px solid rgba(200,169,126,0.5)',
                padding: '32px 28px',
                fontSize: '15px',
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.85)',
              }}
            >
              Спасибо! Наш менеджер свяжется с вами в течение 1-2 часов.
              Подтверждение заявки будет отправлено на указанные контакты.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              {submitError && (
                <div
                  style={{
                    border: '1px solid rgba(255,100,100,0.5)',
                    padding: '14px 18px',
                    fontSize: '13px',
                    lineHeight: 1.5,
                    color: 'rgba(255,150,150,0.9)',
                    marginBottom: '4px',
                  }}
                >
                  {submitError}
                </div>
              )}
              <Field
                label="Имя / название компании *"
                type="text"
                name="name"
                placeholder="Иван Иванов"
                value={formData.name}
                onChange={handleChange}
              />
              <Field
                label="Номер телефона / Telegram *"
                type="text"
                name="phone"
                placeholder="+7 (999) 000-00-00"
                value={formData.phone}
                onChange={handleChange}
              />
              <Field
                label="Маршрут и дата *"
                type="text"
                name="route"
                placeholder="СПб — Петергоф, 25.05.2025"
                value={formData.route}
                onChange={handleChange}
              />
              <Field
                label="Количество пассажиров *"
                type="number"
                name="passengers"
                placeholder="25"
                min={1}
                value={formData.passengers}
                onChange={handleChange}
              />
              <TextareaField
                label="Дополнительная информация"
                name="message"
                placeholder="Особые требования, багаж, детские кресла..."
                value={formData.message}
                onChange={handleChange}
              />
              <button
                type="submit"
                disabled={createTransfer.isPending}
                onMouseEnter={() => setSubmitHovered(true)}
                onMouseLeave={() => setSubmitHovered(false)}
                style={{
                  marginTop: '12px',
                  padding: '18px 24px',
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.16em',
                  color: submitHovered ? '#0b0b0b' : '#ffffff',
                  backgroundColor: submitHovered ? '#C8A97E' : 'transparent',
                  border: '1px solid #C8A97E',
                  cursor: createTransfer.isPending ? 'wait' : 'pointer',
                  textTransform: 'uppercase',
                  transition: 'all 0.25s ease',
                  fontFamily: '"Helvetica Neue", sans-serif',
                  opacity: createTransfer.isPending ? 0.6 : 1,
                }}
              >
                {createTransfer.isPending ? 'Отправка...' : 'Оставить заявку'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function ContactRow({
  label,
  value,
  href,
}: {
  label: string
  value: string
  href: string
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        textDecoration: 'none',
        paddingBottom: '16px',
        borderBottom: '1px solid rgba(255,255,255,0.12)',
        transition: 'border-color 0.25s ease',
      }}
    >
      <span
        style={{
          fontSize: '11px',
          letterSpacing: '0.2em',
          color: '#C8A97E',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: '16px',
          color: hovered ? '#C8A97E' : 'rgba(255,255,255,0.9)',
          transition: 'color 0.25s ease',
        }}
      >
        {value}
      </span>
    </a>
  )
}

const fieldBase: React.CSSProperties = {
  width: '100%',
  padding: '12px 0',
  fontSize: '15px',
  backgroundColor: 'transparent',
  color: '#ffffff',
  border: 'none',
  borderBottom: '1px solid rgba(255,255,255,0.35)',
  outline: 'none',
  fontFamily: 'inherit',
  letterSpacing: '0.01em',
  appearance: 'none',
  colorScheme: 'dark',
}

const labelBase: React.CSSProperties = {
  fontSize: '11px',
  letterSpacing: '0.2em',
  color: 'rgba(255,255,255,0.6)',
  textTransform: 'uppercase',
  marginBottom: '4px',
  display: 'block',
}

function Field({
  label,
  type,
  name,
  placeholder,
  min,
  value,
  onChange,
}: {
  label: string
  type: string
  name: string
  placeholder?: string
  min?: number
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <label style={{ display: 'block' }}>
      <span style={labelBase}>{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        min={min}
        value={value}
        onChange={onChange}
        style={fieldBase}
        onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#C8A97E')}
        onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.35)')}
      />
    </label>
  )
}

function TextareaField({
  label,
  name,
  placeholder,
  value,
  onChange,
}: {
  label: string
  name: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}) {
  return (
    <label style={{ display: 'block' }}>
      <span style={labelBase}>{label}</span>
      <textarea
        name={name}
        placeholder={placeholder}
        rows={3}
        value={value}
        onChange={onChange}
        style={{ ...fieldBase, resize: 'vertical', paddingTop: '12px' }}
        onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#C8A97E')}
        onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.35)')}
      />
    </label>
  )
}
