import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    title: 'ЗАПРОС',
    desc: 'Отправьте нам заявку или напишите в Telegram @INTELEGENT_Spb — мы свяжемся с вами в течение 5 минут.',
  },
  {
    num: '02',
    title: 'РАСЧЁТ',
    desc: 'Наш менеджер уточняет детали (кол-во человек, багаж, маршрут, даты) и присылает расчёт стоимости в течение 1-2 часов.',
  },
  {
    num: '03',
    title: 'СОГЛАСОВАНИЕ',
    desc: 'Мы согласовываем детали, график и заключаем договор.',
  },
  {
    num: '04',
    title: 'ОРГАНИЗАЦИЯ',
    desc: 'Мы назначаем водителей, согласовываем окончательные точки подачи и контакты гидов.',
  },
  {
    num: '05',
    title: 'КОНТРОЛЬ',
    desc: 'Мы контролируем выполнение поездки и оперативно решаем все возникающие вопросы.',
  },
  {
    num: '06',
    title: 'ПОДТВЕРЖДЕНИЕ',
    desc: 'После выполнения заказа предоставляем полный пакет документов.',
  },
]

export default function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from('.step-item', {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
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
      id="howwework"
      ref={sectionRef}
      style={{
        backgroundColor: '#f4f4f5',
        padding: '120px clamp(20px, 4vw, 60px)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div
          style={{
            marginBottom: '60px',
            borderBottom: '1px solid #1a1a1a',
            paddingBottom: '20px',
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
            Процесс работы
          </p>
          <h2
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              color: '#000000',
            }}
          >
            Как мы работаем
          </h2>
          <p
            style={{
              fontSize: '16px',
              fontWeight: 300,
              lineHeight: 1.6,
              color: '#666666',
              marginTop: '16px',
              maxWidth: '600px',
            }}
          >
            Последовательность выполнения заказа — от заявки до финальных документов
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '24px',
          }}
        >
          {steps.map((step) => (
            <StepCard key={step.num} {...step} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StepCard({
  num,
  title,
  desc,
}: {
  num: string
  title: string
  desc: string
}) {
  return (
    <div
      className="step-item"
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #000000',
        padding: '32px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <span
        style={{
          fontSize: '48px',
          fontWeight: 300,
          color: '#C8A97E',
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}
      >
        {num}
      </span>
      <h3
        style={{
          fontSize: '18px',
          fontWeight: 500,
          letterSpacing: '0.12em',
          color: '#000000',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: '#666666',
        }}
      >
        {desc}
      </p>
    </div>
  )
}
