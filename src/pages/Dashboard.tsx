import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import { trpc } from '@/providers/trpc'
import gsap from 'gsap'

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [cancelHoverId, setCancelHoverId] = useState<number | null>(null)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/')
    }
  }, [isLoading, isAuthenticated, navigate])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      gsap.from('.dash-fade', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2,
      })
    }, section)
    return () => ctx.revert()
  }, [])

  const { data: requests, isLoading: requestsLoading } = trpc.transfer.myRequests.useQuery(
    undefined,
    { enabled: isAuthenticated }
  )

  const utils = trpc.useUtils()
  const cancelMutation = trpc.transfer.cancel.useMutation({
    onSuccess: () => {
      utils.transfer.myRequests.invalidate()
    },
  })

  if (isLoading) {
    return (
      <div style={{ paddingTop: '88px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#999' }}>Загрузка...</p>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  const pendingCount = requests?.filter((r) => r.status === 'pending').length ?? 0
  const confirmedCount = requests?.filter((r) => r.status === 'confirmed').length ?? 0
  const cancelledCount = requests?.filter((r) => r.status === 'cancelled').length ?? 0

  return (
    <div
      ref={sectionRef}
      style={{
        paddingTop: '88px',
        backgroundColor: '#f4f4f5',
        minHeight: '100vh',
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: '#0b0b0b',
          padding: 'clamp(40px, 5vw, 64px) clamp(20px, 4vw, 60px)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="dash-fade" style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name || 'User'}
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #C8A97E',
                }}
              />
            ) : (
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  backgroundColor: '#C8A97E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  fontWeight: 500,
                  color: '#0b0b0b',
                }}
              >
                {(user.name || 'U')[0].toUpperCase()}
              </div>
            )}
            <div>
              <h1
                style={{
                  fontSize: 'clamp(24px, 3vw, 36px)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: '#ffffff',
                  lineHeight: 1.2,
                }}
              >
                {user.name || 'Пользователь'}
              </h1>
              {user.email && (
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>
                  {user.email}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(32px, 4vw, 48px) clamp(20px, 4vw, 40px)' }}>
        {/* Stats */}
        <div
          className="dash-fade"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          <StatCard label="Всего заявок" value={requests?.length ?? 0} color="#C8A97E" />
          <StatCard label="В обработке" value={pendingCount} color="#E8A838" />
          <StatCard label="Подтверждено" value={confirmedCount} color="#4CAF50" />
          <StatCard label="Отменено" value={cancelledCount} color="#999999" />
        </div>

        {/* Requests table */}
        <div className="dash-fade">
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 500,
              color: '#000000',
              letterSpacing: '-0.01em',
              marginBottom: '20px',
            }}
          >
            История заявок
          </h2>

          {requestsLoading ? (
            <p style={{ color: '#999', fontSize: '14px' }}>Загрузка заявок...</p>
          ) : !requests || requests.length === 0 ? (
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e5e5',
                padding: '48px 32px',
                textAlign: 'center',
              }}
            >
              <p style={{ fontSize: '15px', color: '#999', marginBottom: '16px' }}>
                У вас пока нет заявок
              </p>
              <button
                onClick={() => navigate('/#hero')}
                style={{
                  padding: '12px 28px',
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  backgroundColor: '#C8A97E',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: '"Helvetica Neue", sans-serif',
                }}
              >
                Оставить заявку
              </button>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e5e5',
                  fontSize: '14px',
                }}
              >
                <thead>
                  <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                    <Th>№</Th>
                    <Th>Маршрут</Th>
                    <Th>Пассажиры</Th>
                    <Th>Телефон</Th>
                    <Th>Статус</Th>
                    <Th>Дата</Th>
                    <Th></Th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr
                      key={req.id}
                      style={{
                        borderBottom: '1px solid #f0f0f0',
                        transition: 'background-color 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fafafa')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <Td>#{req.id}</Td>
                      <Td>{req.route}</Td>
                      <Td>{req.passengers}</Td>
                      <Td>{req.phone}</Td>
                      <Td>
                        <StatusBadge status={req.status} />
                      </Td>
                      <Td>
                        {req.createdAt
                          ? new Date(req.createdAt).toLocaleDateString('ru-RU')
                          : '-'}
                      </Td>
                      <Td>
                        {req.status === 'pending' && (
                          <button
                            onClick={() => cancelMutation.mutate({ id: req.id })}
                            onMouseEnter={() => setCancelHoverId(req.id)}
                            onMouseLeave={() => setCancelHoverId(null)}
                            disabled={cancelMutation.isPending}
                            style={{
                              padding: '6px 14px',
                              fontSize: '11px',
                              fontWeight: 500,
                              letterSpacing: '0.1em',
                              textTransform: 'uppercase',
                              color: cancelHoverId === req.id ? '#ffffff' : '#999',
                              backgroundColor: cancelHoverId === req.id ? '#d32f2f' : 'transparent',
                              border: '1px solid #e5e5e5',
                              cursor: 'pointer',
                              transition: 'all 0.25s ease',
                              fontFamily: '"Helvetica Neue", sans-serif',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            Отменить
                          </button>
                        )}
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e5e5e5',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <span
        style={{
          fontSize: '32px',
          fontWeight: 400,
          color: color,
          letterSpacing: '-0.02em',
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontSize: '12px',
          letterSpacing: '0.14em',
          color: '#999',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; color: string; label: string }> = {
    pending: { bg: '#FFF8E1', color: '#E8A838', label: 'В обработке' },
    confirmed: { bg: '#E8F5E9', color: '#4CAF50', label: 'Подтверждено' },
    cancelled: { bg: '#F5F5F5', color: '#999', label: 'Отменено' },
  }

  const c = config[status] || config.pending

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 12px',
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        backgroundColor: c.bg,
        color: c.color,
        whiteSpace: 'nowrap',
      }}
    >
      {c.label}
    </span>
  )
}

function Th({ children }: { children?: React.ReactNode }) {
  return (
    <th
      style={{
        padding: '14px 16px',
        textAlign: 'left',
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: '#999',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </th>
  )
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td
      style={{
        padding: '14px 16px',
        color: '#444',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </td>
  )
}
