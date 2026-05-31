import type { Meta, StoryObj } from '@storybook/react-vite'
import { Sparkles } from 'lucide-react'

const meta = {
  title: 'Foundations/Tokens',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

export const Buttons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <button className="btn btn-primary">Primary</button>
      <button className="btn btn-brand">
        <Sparkles size={14} /> Brand
      </button>
      <button className="btn btn-ghost">Ghost</button>
      <button className="btn btn-danger">Danger</button>
    </div>
  ),
}

export const Chips: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <span className="chip" style={{ background: 'var(--accent)', color: 'var(--accent-ink)', border: '1px solid transparent' }}>
        <Sparkles size={12} /> Recommended
      </span>
      <span className="chip" style={{ background: 'var(--surface-3)', color: 'var(--text-3)', border: '1px solid var(--border)' }}>
        Neutral
      </span>
      <span className="chip" style={{ background: 'color-mix(in srgb, var(--ok) 14%, transparent)', color: 'var(--ok)', border: '1px solid color-mix(in srgb, var(--ok) 28%, transparent)' }}>
        Connected
      </span>
    </div>
  ),
}

export const Fields: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      <input className="field" placeholder="Search integrations…" />
      <input className="field" defaultValue="us-east-1" />
    </div>
  ),
}

export const Typography: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <h1 style={{ margin: 0 }}>Heading 1 - Grold display</h1>
      <h2 style={{ margin: 0 }}>Heading 2 - Grold display</h2>
      <h3 style={{ margin: 0 }}>Heading 3 - Grold display</h3>
      <p style={{ margin: 0, color: 'var(--text-2)', maxWidth: 520 }}>
        Body copy stays in Inter for readability. Act pairs the geometric rounded
        Grold display face on headings with a neutral grotesque for body text.
      </p>
      <code className="mono" style={{ color: 'var(--text-3)' }}>mono · v2.1.0 · us-east-1</code>
    </div>
  ),
}

const TOKENS = [
  '--bg',
  '--surface-1',
  '--surface-2',
  '--surface-3',
  '--border',
  '--text-1',
  '--text-2',
  '--text-3',
  '--brand-red',
  '--accent',
  '--accent-ink',
  '--accent-soft',
  '--ok',
  '--warn',
  '--danger',
  '--info',
  '--degraded',
  '--ring',
]

export const ColorTokens: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 }}>
      {TOKENS.map((t) => (
        <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: 9,
              background: `var(${t})`,
              border: '1px solid var(--border)',
              flexShrink: 0,
            }}
          />
          <code style={{ fontSize: 11, color: 'var(--text-2)' }}>{t}</code>
        </div>
      ))}
    </div>
  ),
}
