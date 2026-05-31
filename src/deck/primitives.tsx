import type { ReactNode } from 'react'
import { ActLogo } from '../components/Brand'

export const DECK_TOTAL = 17

export function Slide({
  n,
  children,
  pad = true,
}: {
  n: number
  children: ReactNode
  pad?: boolean
}) {
  return (
    <section className="slide" data-slide={n}>
      {pad ? <div className="slide-pad">{children}</div> : children}
      <span className="slide-brand">
        <ActLogo size={15} />
        <span style={{ color: 'var(--text-3)' }}>· Integrations</span>
      </span>
      <span className="slide-num">
        {String(n).padStart(2, '0')} / {DECK_TOTAL}
      </span>
    </section>
  )
}

export function Kicker({ children }: { children: ReactNode }) {
  return <div className="slide-kicker">{children}</div>
}

export function Title({ children }: { children: ReactNode }) {
  return (
    <h2
      className="mt-3 font-bold"
      style={{ color: 'var(--text-1)', fontSize: 40, letterSpacing: '-0.025em', lineHeight: 1.08 }}
    >
      {children}
    </h2>
  )
}

export function Lead({ children }: { children: ReactNode }) {
  return (
    <p
      className="mt-4 max-w-4xl"
      style={{ color: 'var(--text-2)', fontSize: 18, lineHeight: 1.5 }}
    >
      {children}
    </p>
  )
}

export function Hi({ children }: { children: ReactNode }) {
  return <span style={{ color: 'var(--text-1)', fontWeight: 600 }}>{children}</span>
}

export function Accent({ children }: { children: ReactNode }) {
  return <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{children}</span>
}

export function Card({
  children,
  tone,
  className = '',
}: {
  children: ReactNode
  tone?: 'accent' | 'warn' | 'danger' | 'ok'
  className?: string
}) {
  const toneColor = tone ? `var(--${tone === 'accent' ? 'accent' : tone})` : 'var(--border)'
  return (
    <div
      className={`surface rounded-2xl p-5 ${className}`}
      style={
        tone
          ? { borderColor: `color-mix(in srgb, ${toneColor} 35%, var(--border))` }
          : undefined
      }
    >
      {children}
    </div>
  )
}

export function Eyebrow({ children, color = 'var(--text-3)' }: { children: ReactNode; color?: string }) {
  return (
    <div
      className="font-bold"
      style={{ color, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}
    >
      {children}
    </div>
  )
}
