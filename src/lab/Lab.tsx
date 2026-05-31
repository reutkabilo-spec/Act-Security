import { useEffect, useState, type ReactNode } from 'react'
import { Sun, Moon, ArrowRight } from 'lucide-react'
import { ActLogo, ConstructionArt, SpotIllustration } from '../components/Brand'
import { LogoTile } from '../components/LogoTile'
import { StatusBadge, StatusDot } from '../components/StatusBadge'
import { IntegrationCard } from '../components/IntegrationCard'
import { CopilotMark, CopilotTip, CopilotInsight, SetupCopilotPanel } from '../components/Copilot'
import { INTEGRATIONS } from '../data/integrations'
import { STATUS_META } from '../lib/status'
import type { Integration, Status } from '../types'

const ALL_STATUSES: Status[] = [
  'not_connected',
  'connecting',
  'syncing',
  'connected',
  'degraded',
  'needs_attention',
  'error',
  'disabled',
]

/** A sample card per status - clone a real integration, override the status. */
const base = INTEGRATIONS.find((i) => i.id === 'aws') ?? INTEGRATIONS[0]
const cardSamples: Integration[] = ALL_STATUSES.map((status, n) => ({
  ...base,
  id: `sample-${status}`,
  name: ['Amazon Web Services', 'Okta', 'Microsoft Entra ID', 'Splunk', 'Jira', 'Microsoft Sentinel', 'Slack', 'Terraform Cloud'][n] ?? base.name,
  mono: ['AWS', 'OK', 'EN', 'SP', 'JR', 'ST', 'SL', 'TF'][n] ?? base.mono,
  color: ['#FF9900', '#2563EB', '#0F6CBD', '#65A637', '#2684FF', '#0078D4', '#611F69', '#7B42BC'][n] ?? base.color,
  status,
  recommended: status === 'not_connected',
  lastSync: status === 'connected' || status === 'syncing' ? '2 min ago' : undefined,
  copilotWhy: n === 0 ? base.copilotWhy : undefined,
}))

const SWATCHES: { name: string; v: string; ink?: string }[] = [
  { name: 'bg', v: '--bg' },
  { name: 'surface-1', v: '--surface-1' },
  { name: 'surface-2', v: '--surface-2' },
  { name: 'surface-3', v: '--surface-3' },
  { name: 'border', v: '--border' },
  { name: 'border-strong', v: '--border-strong' },
  { name: 'text-1', v: '--text-1', ink: 'var(--bg)' },
  { name: 'text-2', v: '--text-2', ink: 'var(--bg)' },
  { name: 'text-3', v: '--text-3', ink: 'var(--bg)' },
  { name: 'accent (lime)', v: '--accent', ink: 'var(--accent-ink)' },
  { name: 'brand-red', v: '--brand-red', ink: 'var(--brand-red-ink)' },
  { name: 'ok', v: '--ok', ink: 'var(--bg)' },
  { name: 'info', v: '--info', ink: 'var(--bg)' },
  { name: 'warn', v: '--warn', ink: 'var(--bg)' },
  { name: 'degraded', v: '--degraded', ink: 'var(--bg)' },
  { name: 'danger', v: '--danger', ink: 'var(--bg)' },
]

export default function Lab() {
  const params = new URLSearchParams(window.location.search)
  const [theme, setTheme] = useState<'dark' | 'light'>(params.get('theme') === 'light' ? 'light' : 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const [items, setItems] = useState<Integration[]>(INTEGRATIONS)

  return (
    <div className="min-h-full" style={{ background: 'var(--bg)', color: 'var(--text-1)' }}>
      {/* header */}
      <header
        className="sticky top-0 z-10 flex items-center gap-3 px-8 py-3.5"
        style={{ background: 'color-mix(in srgb, var(--surface-1) 90%, transparent)', borderBottom: '1px solid var(--border)', backdropFilter: 'blur(8px)' }}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: 'var(--brand-red)' }}>
          <ActLogo size={13} color="#FBFCEA" />
        </div>
        <div>
          <div className="text-sm font-bold" style={{ color: 'var(--text-1)', fontFamily: 'var(--font-display)' }}>
            Component Lab
          </div>
          <div className="text-xs" style={{ color: 'var(--text-3)' }}>
            Act Integrations · design system
          </div>
        </div>
        <button
          onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          className="btn btn-ghost ml-auto px-2.5 py-2"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          <span className="text-xs">{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
      </header>

      <main className="mx-auto max-w-[1180px] px-8 py-8">
        {/* Foundations */}
        <Section title="Foundations" kicker="Brand, type & color">
          <SubLabel>Logo</SubLabel>
          <div className="mb-6 flex flex-wrap items-center gap-6">
            <Tile><ActLogo size={28} /></Tile>
            <Tile style={{ background: 'var(--brand-red)' }}><ActLogo size={20} color="#FBFCEA" /></Tile>
            <Tile style={{ background: 'var(--accent)' }}><ActLogo size={20} color="var(--accent-ink)" /></Tile>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: 'var(--brand-red)' }}>
              <ActLogo size={18} color="#FBFCEA" />
            </div>
          </div>

          <SubLabel>Display type - Grold (headings)</SubLabel>
          <div className="mb-6 space-y-1">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 700, letterSpacing: '-0.02em' }}>
              Integrations are your control plane
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500 }}>
              Foundation · Context · Action
            </div>
            <p className="max-w-xl text-sm" style={{ color: 'var(--text-2)' }}>
              Body copy stays in the system sans (Inter) for long-form legibility - Grold is reserved for headings and the brand voice.
            </p>
          </div>

          <SubLabel>Color tokens</SubLabel>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-8">
            {SWATCHES.map((s) => (
              <div key={s.v} className="overflow-hidden rounded-xl" style={{ border: '1px solid var(--border)' }}>
                <div className="flex h-14 items-end p-1.5" style={{ background: `var(${s.v})`, color: s.ink ?? 'var(--text-1)' }}>
                  <span className="mono text-[10px] opacity-80">{s.v}</span>
                </div>
                <div className="px-1.5 py-1 text-[11px] font-medium" style={{ background: 'var(--surface-1)', color: 'var(--text-2)' }}>
                  {s.name}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Buttons */}
        <Section title="Buttons" kicker="Actions & CTAs">
          <div className="flex flex-wrap items-center gap-3">
            <button className="btn btn-primary">Connect <ArrowRight size={15} /></button>
            <button className="btn btn-brand">Start free trial</button>
            <button className="btn btn-ghost">Manage</button>
            <button className="btn btn-danger">Disconnect</button>
            <button className="btn btn-primary" disabled>Disabled</button>
          </div>
        </Section>

        {/* Chips, fields */}
        <Section title="Chips & inputs" kicker="Filters, tags & form controls">
          <SubLabel>Chips</SubLabel>
          <div className="mb-6 flex flex-wrap gap-2">
            <span className="chip" style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}>All</span>
            <span className="chip" style={{ background: 'var(--surface-2)', color: 'var(--text-2)', border: '1px solid var(--border)' }}>Cloud</span>
            <span className="chip" style={{ background: 'var(--surface-2)', color: 'var(--text-2)', border: '1px solid var(--border)' }}>Identity</span>
            <span className="chip" style={{ background: 'var(--accent-soft)', color: 'var(--accent)', border: '1px solid color-mix(in srgb, var(--accent) 35%, transparent)' }}>Recommended</span>
          </div>
          <SubLabel>Input & label</SubLabel>
          <div className="max-w-sm">
            <label className="label">External ID</label>
            <input className="field" placeholder="act-7f3c9a2e…" defaultValue="act-7f3c9a2e1b" />
          </div>
        </Section>

        {/* Status system */}
        <Section title="Status system" kicker="8-state health model">
          <SubLabel>Badges</SubLabel>
          <div className="mb-6 flex flex-wrap gap-2.5">
            {ALL_STATUSES.map((s) => (
              <StatusBadge key={s} status={s} />
            ))}
          </div>
          <SubLabel>Dots</SubLabel>
          <div className="flex flex-wrap items-center gap-5">
            {ALL_STATUSES.map((s) => (
              <span key={s} className="inline-flex items-center gap-2 text-xs" style={{ color: 'var(--text-2)' }}>
                <StatusDot status={s} /> {STATUS_META[s].label}
              </span>
            ))}
          </div>
        </Section>

        {/* Logo tiles */}
        <Section title="Logo tiles" kicker="Real SVG vendor logos · authentic brand colour on a white chip">
          <div className="flex flex-wrap items-center gap-4">
            <LogoTile id="aws" mono="AWS" color="#FF9900" />
            <LogoTile id="okta" mono="OK" color="#007DC1" />
            <LogoTile id="splunk" mono="SP" color="#65A637" />
            <LogoTile id="jira" mono="JR" color="#2684FF" />
            <LogoTile id="slack" mono="SL" color="#4A154B" />
            <LogoTile id="terraform" mono="TF" color="#7B42BC" size={56} />
          </div>
        </Section>

        {/* Setup Copilot */}
        <Section title="Setup Copilot" kicker="AI guidance - recommends, never acts">
          <SubLabel>Mark · tip · insight</SubLabel>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start">
            <CopilotMark />
            <div className="max-w-sm flex-1">
              <CopilotTip>Connect AWS and Entra ID first to unlock access-risk mapping.</CopilotTip>
            </div>
            <div className="max-w-xs flex-1">
              <CopilotInsight text="Pairs with your cloud accounts to resolve which humans sit behind each role." />
            </div>
          </div>
          <SubLabel>Recommendation panel</SubLabel>
          <SetupCopilotPanel items={items} onOpen={() => {}} />
        </Section>

        {/* Integration cards */}
        <Section title="Integration card" kicker="All 8 states">
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {cardSamples.map((i) => (
              <IntegrationCard key={i.id} integration={i} onOpen={() => {}} />
            ))}
          </div>
        </Section>

        {/* Empty / status illustrations */}
        <Section title="State illustrations" kicker="Subtle construction-line spots for empty · success · error">
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
            <StateTile variant="empty" title="Empty" sub="No results / nothing connected yet" />
            <StateTile variant="success" title="Success" sub="Connected & syncing" />
            <StateTile variant="error" title="Error" sub="Validation failed - fix & retry" />
          </div>
        </Section>

        {/* Hover / selected affordances */}
        <Section title="Hover & selected" kicker="Brand-matched card affordances">
          <p className="mb-3 text-sm" style={{ color: 'var(--text-2)' }}>
            Hover lifts the card with a lime ring; the card whose panel is open keeps a persistent lime
            border + ring. (Hover the left card; the right card shows the selected state.)
          </p>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            <IntegrationCard integration={cardSamples[0]} onOpen={() => {}} />
            <IntegrationCard integration={{ ...cardSamples[3], status: 'connected', name: 'Splunk' }} onOpen={() => {}} active />
          </div>
        </Section>

        {/* Decorative */}
        <Section title="Brand illustration" kicker="Construction-line motif">
          <div className="overflow-hidden rounded-2xl" style={{ border: '1px solid var(--border)', background: 'var(--surface-1)' }}>
            <ConstructionArt style={{ width: '100%', maxWidth: 480, display: 'block', margin: '0 auto' }} />
          </div>
        </Section>

        <div className="py-10 text-center text-xs" style={{ color: 'var(--text-3)' }}>
          {/* keep linter happy about setItems usage */}
          <button className="underline" onClick={() => setItems(INTEGRATIONS)}>Reset Copilot data</button>
        </div>
      </main>
    </div>
  )
}

function Section({ title, kicker, children }: { title: string; kicker: string; children: ReactNode }) {
  return (
    <section className="mb-12">
      <div className="mb-5 border-b pb-3" style={{ borderColor: 'var(--border)' }}>
        <div className="slide-kicker" style={{ fontSize: 11 }}>{kicker}</div>
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)', fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  )
}

function SubLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-2.5 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-3)' }}>
      {children}
    </div>
  )
}

function StateTile({ variant, title, sub }: { variant: 'empty' | 'success' | 'error'; title: string; sub: string }) {
  return (
    <div
      className="flex flex-col items-center rounded-2xl px-5 py-7 text-center"
      style={{ background: 'var(--surface-1)', border: '1px solid var(--border)' }}
    >
      <SpotIllustration variant={variant} size={120} />
      <div className="mt-3 text-sm font-bold" style={{ color: 'var(--text-1)' }}>
        {title}
      </div>
      <div className="mt-1 text-xs" style={{ color: 'var(--text-3)' }}>
        {sub}
      </div>
    </div>
  )
}

function Tile({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      className="flex h-16 items-center justify-center rounded-xl px-5"
      style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', ...style }}
    >
      {children}
    </div>
  )
}
