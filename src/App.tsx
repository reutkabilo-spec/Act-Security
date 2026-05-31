import { useEffect, useMemo, useState } from 'react'
import {
  Sun,
  Moon,
  LayoutDashboard,
  ShieldAlert,
  Crosshair,
  Plug,
  Settings,
  ChevronRight,
  Layers,
  AlertTriangle,
  Info,
} from 'lucide-react'
import { buildPreset, type DemoState } from './data/integrations'
import { LAYERS, type Integration, type Layer, type Status } from './types'
import { IntegrationCard } from './components/IntegrationCard'
import { ConnectPanel, type Phase } from './components/ConnectPanel'
import { SetupCopilotPanel, GetStartedHero } from './components/Copilot'
import { FilterRail, type StatusFilter } from './components/FilterRail'
import { ActLogo, SpotIllustration } from './components/Brand'
import { Tooltip } from './components/ui'

const params = new URLSearchParams(window.location.search)
const DEEP_OPEN = params.get('open')
const DEEP_PHASE = (params.get('phase') as Phase | null) ?? undefined
const DEEP_THEME = params.get('theme') === 'light' ? 'light' : null

const CATEGORIES = ['All', 'Cloud', 'Identity', 'SIEM', 'Ticketing', 'SOAR', 'Comms', 'IaC / CI-CD']
const LAYER_ORDER: Layer[] = ['foundation', 'context', 'action']

const INITIAL_DEMO: DemoState = params.get('demo') === 'live' ? 'live' : 'fresh'
const INITIAL_ITEMS = buildPreset(INITIAL_DEMO)

export default function App() {
  const [demo, setDemo] = useState<DemoState>(INITIAL_DEMO)
  const [items, setItems] = useState<Integration[]>(INITIAL_ITEMS)
  const [active, setActive] = useState<Integration | null>(
    () => (DEEP_OPEN ? INITIAL_ITEMS.find((it) => it.id === DEEP_OPEN) ?? null : null),
  )
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [theme, setTheme] = useState<'dark' | 'light'>(DEEP_THEME ?? 'dark')

  // Flip between the two demo acts (Day 0 / Day N). Resets transient UI so the
  // story always starts clean.
  const switchDemo = (next: DemoState) => {
    setDemo(next)
    setItems(buildPreset(next))
    setActive(null)
    setQuery('')
    setCategory('All')
    setStatus('all')
  }

  useEffect(() => {
    if (DEEP_THEME) document.documentElement.setAttribute('data-theme', DEEP_THEME)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
  }

  const onStatusChange = (id: string, status: Status) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id
          ? {
              ...it,
              status,
              lastSync: status === 'syncing' || status === 'connected' ? 'just now' : it.lastSync,
              connectedBy: status === 'syncing' ? 'you@act.security' : it.connectedBy,
            }
          : it,
      ),
    )
    setActive((a) => (a && a.id === id ? { ...a, status } : a))
  }

  const isLive = (i: Integration) => i.status === 'connected' || i.status === 'syncing'
  const isBroken = (i: Integration) =>
    i.status === 'needs_attention' || i.status === 'error' || i.status === 'degraded'
  // "Needs attention" = broken connections + live ones with a pending version update
  const needsAttn = (i: Integration) => isBroken(i) || (!!i.updateAvailable && isLive(i))
  const statusMatch = (i: Integration, s: StatusFilter) => {
    if (s === 'all') return true
    if (s === 'attention') return needsAttn(i)
    if (s === 'connected') return isLive(i)
    return i.status === 'not_connected' || i.status === 'disabled' // available
  }

  const matchesQuery = (it: Integration) => {
    const q = query.trim().toLowerCase()
    return !q || it.name.toLowerCase().includes(q) || it.category.toLowerCase().includes(q)
  }

  // faceted counts: each facet's counts reflect the *other* active facets
  const byQuery = useMemo(() => items.filter(matchesQuery), [items, query])
  const byQueryCat = byQuery.filter((i) => category === 'All' || i.category === category)
  const byQueryStatus = byQuery.filter((i) => statusMatch(i, status))

  const statusCount = (s: StatusFilter) => byQueryCat.filter((i) => statusMatch(i, s)).length
  const categoryCount = (c: string) =>
    byQueryStatus.filter((i) => c === 'All' || i.category === c).length

  // final visible set + the triage list (only surfaced on the 'all' view)
  const filtered = byQueryCat.filter((i) => statusMatch(i, status))
  const attention = status === 'all' ? filtered.filter(needsAttn) : []

  // "All integrations × All categories": collapse the layered view into a flat
  // connected-first list, each group sorted A–Z.
  const allView = status === 'all' && category === 'All'
  const byName = (a: Integration, b: Integration) => a.name.localeCompare(b.name)
  const connectedSorted = filtered.filter(isLive).slice().sort(byName)
  const notConnectedSorted = filtered.filter((i) => !isLive(i)).slice().sort(byName)
  const healthyCount = connectedSorted.filter((i) => !needsAttn(i)).length
  const attentionCount = filtered.filter(needsAttn).length
  const clearFilters = () => {
    setQuery('')
    setCategory('All')
    setStatus('all')
  }

  return (
    <div className="flex h-full" style={{ background: 'var(--bg)' }}>
      {/* sidebar rail */}
      <nav
        className="flex w-[68px] shrink-0 flex-col items-center gap-1 py-4"
        style={{ background: 'var(--surface-1)', borderRight: '1px solid var(--border)' }}
      >
        <div
          className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: 'var(--brand-red)' }}
        >
          <ActLogo size={15} color="#FBFCEA" />
        </div>
        <RailIcon icon={<LayoutDashboard size={19} />} />
        <RailIcon icon={<ShieldAlert size={19} />} />
        <RailIcon icon={<Crosshair size={19} />} />
        <RailIcon icon={<Plug size={19} />} active />
        <div className="flex-1" />
        <RailIcon icon={<Settings size={19} />} />
      </nav>

      {/* main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* topbar */}
        <header
          className="flex items-center gap-2 px-8 py-3.5"
          style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface-1)' }}
        >
          <div className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--text-3)' }}>
            <span>Settings</span>
            <ChevronRight size={14} />
            <span className="font-semibold" style={{ color: 'var(--text-1)' }}>
              Integrations
            </span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <DemoSwitch demo={demo} onChange={switchDemo} />
            <button
              onClick={toggleTheme}
              className="btn-ghost btn px-2.5 py-2"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
              style={{ background: 'var(--surface-3)', color: 'var(--text-2)', border: '1px solid var(--border)' }}
            >
              MC
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-8 py-9">
          <div className="mx-auto max-w-[1180px]">
            {/* page header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
                Integrations
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                Connect Act to your stack. Integrations are your{' '}
                <span style={{ color: 'var(--text-1)', fontWeight: 600 }}>control plane</span> - start with
                the foundation, enrich with context, then wire up where Act takes action.
              </p>
            </div>

            {/* Day 0 → a designed get-started hero; Day N → the compact Copilot
                banner. Both surface the AI's next recommendation. */}
            {items.some(isLive) ? (
              <SetupCopilotPanel items={items} onOpen={setActive} />
            ) : (
              <GetStartedHero items={items} onOpen={setActive} />
            )}

            {/* results - left filter rail + integration grid */}
            <div className="flex gap-8">
              <FilterRail
                query={query}
                onQuery={setQuery}
                status={status}
                onStatus={setStatus}
                category={category}
                onCategory={setCategory}
                categories={CATEGORIES}
                statusCount={statusCount}
                categoryCount={categoryCount}
                onClear={clearFilters}
              />

              <div className="min-w-0 flex-1">
                {allView ? (
                  <>
                    {/* connected first, A–Z */}
                    {connectedSorted.length > 0 && (
                      <section className="mb-8">
                        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span
                            className="flex items-center gap-1.5 text-sm font-bold"
                            style={{ color: 'var(--text-1)' }}
                          >
                            <Plug size={15} style={{ color: 'var(--ok)' }} />
                            Connected
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs" style={{ color: 'var(--ok)' }}>
                            <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--ok)' }} />
                            {healthyCount} healthy
                          </span>
                          {attentionCount > 0 && (
                            <button
                              onClick={() => setStatus('attention')}
                              className="inline-flex items-center gap-1.5 text-xs"
                              style={{
                                color: 'var(--warn)',
                                textDecorationLine: 'underline',
                                textUnderlineOffset: 2,
                                textDecorationColor: 'color-mix(in srgb, var(--warn) 45%, transparent)',
                              }}
                            >
                              <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--warn)' }} />
                              {attentionCount} need attention
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                          {connectedSorted.map((i) => (
                            <IntegrationCard key={i.id} integration={i} onOpen={setActive} active={active?.id === i.id} />
                          ))}
                        </div>
                      </section>
                    )}

                    {/* divider between the two groups */}
                    {connectedSorted.length > 0 && notConnectedSorted.length > 0 && (
                      <div className="mb-8 border-t" style={{ borderColor: 'var(--border)' }} />
                    )}

                    {/* everything not connected, A–Z */}
                    {notConnectedSorted.length > 0 && (
                      <section className="mb-9">
                        <SectionTitle
                          icon={<Plug size={15} style={{ color: 'var(--text-3)' }} />}
                          title="Not connected"
                          hint="Available to connect"
                        />
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                          {notConnectedSorted.map((i) => (
                            <IntegrationCard key={i.id} integration={i} onOpen={setActive} active={active?.id === i.id} />
                          ))}
                        </div>
                      </section>
                    )}
                  </>
                ) : (
                  <>
                    {/* needs attention - triage callout (only on the unfiltered view) */}
                    {attention.length > 0 && (
                      <section className="mb-9">
                        <SectionTitle
                          icon={<AlertTriangle size={15} style={{ color: 'var(--warn)' }} />}
                          title="Needs attention"
                          hint="Broken connections & pending updates"
                        />
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                          {attention.map((i) => (
                            <IntegrationCard key={i.id} integration={i} onOpen={setActive} active={active?.id === i.id} />
                          ))}
                        </div>
                      </section>
                    )}

                    {/* layers */}
                    {LAYER_ORDER.map((layer) => {
                      const inLayer = filtered.filter(
                        (i) => i.layer === layer && !(status === 'all' && needsAttn(i)),
                      )
                      if (inLayer.length === 0) return null
                      const meta = LAYERS[layer]
                      return (
                        <section key={layer} className="mb-9">
                          <SectionTitle
                            icon={<Layers size={15} style={{ color: 'var(--accent-strong)' }} />}
                            title={meta.title}
                            hint={meta.kicker}
                          />
                          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                            {inLayer.map((i) => (
                              <IntegrationCard key={i.id} integration={i} onOpen={setActive} active={active?.id === i.id} />
                            ))}
                          </div>
                        </section>
                      )
                    })}
                  </>
                )}

                {filtered.length === 0 && (
                  <div className="flex flex-col items-center px-6 py-16 text-center">
                    <SpotIllustration variant="empty" size={132} />
                    <h3 className="mt-4 text-base font-bold" style={{ color: 'var(--text-1)' }}>
                      No integrations found
                    </h3>
                    <p className="mt-1.5 max-w-sm text-sm" style={{ color: 'var(--text-2)' }}>
                      Nothing matches the current filters. Try a different search or reset them.
                    </p>
                    <button className="btn btn-ghost mt-4" onClick={clearFilters}>
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* One drawer, two modes - ConnectPanel renders the install flow when the
          integration isn't connected, and the manage view when it is. */}
      {active && (
        <ConnectPanel
          integration={active}
          onClose={() => setActive(null)}
          onStatusChange={onStatusChange}
          initialPhase={active.id === DEEP_OPEN ? DEEP_PHASE : undefined}
          onOpenIntegration={(id) => {
            const next = items.find((it) => it.id === id)
            if (next) setActive(next)
          }}
        />
      )}
    </div>
  )
}

/** Tiny segmented control to flip the prototype between its two demo acts. */
function DemoSwitch({ demo, onChange }: { demo: DemoState; onChange: (d: DemoState) => void }) {
  const opts: { key: DemoState; label: string; hint: string }[] = [
    {
      key: 'fresh',
      label: 'Day 0',
      hint: 'Start mode - a brand-new account with nothing connected yet. Shows the first-run, get-started experience.',
    },
    {
      key: 'live',
      label: 'Live',
      hint: 'Live mode - a populated account: AWS connected, Okta needs an update, and others in failed / degraded / needs-attention states.',
    },
  ]
  return (
    <div className="flex items-center gap-1.5">
      <Tooltip
        side="bottom"
        align="end"
        width={236}
        label={
          <span>
            <strong style={{ color: 'var(--accent-strong)' }}>Prototype demo control.</strong> Flip
            between the two stories this prototype tells - <strong>Day 0</strong> (start mode) and{' '}
            <strong>Live</strong> (populated mode).
          </span>
        }
      >
        <span
          className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide"
          style={{ color: 'var(--text-3)' }}
        >
          <Info size={12} /> Demo
        </span>
      </Tooltip>
      <div
        className="flex items-center gap-0.5 rounded-lg p-0.5"
        style={{ background: 'var(--surface-3)', border: '1px solid var(--border)' }}
      >
        {opts.map((o) => {
          const on = demo === o.key
          return (
            <Tooltip key={o.key} side="bottom" align="end" width={224} label={o.hint}>
              <button
                onClick={() => onChange(o.key)}
                className="rounded-md px-2.5 py-1 text-[12px] font-semibold transition-colors"
                style={{
                  background: on ? 'var(--accent)' : 'transparent',
                  color: on ? 'var(--accent-ink)' : 'var(--text-2)',
                  boxShadow: on ? 'var(--shadow-sm)' : 'none',
                }}
              >
                {o.label}
              </button>
            </Tooltip>
          )
        })}
      </div>
    </div>
  )
}

function RailIcon({ icon, active }: { icon: React.ReactNode; active?: boolean }) {
  return (
    <button
      className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors"
      style={{
        background: active ? 'var(--surface-3)' : 'transparent',
        color: active ? 'var(--accent-strong)' : 'var(--text-3)',
      }}
    >
      {icon}
    </button>
  )
}

function SectionTitle({ icon, title, hint }: { icon: React.ReactNode; title: string; hint: string }) {
  return (
    <div className="mb-4 flex items-baseline gap-2.5">
      <span className="flex items-center gap-1.5 text-sm font-bold" style={{ color: 'var(--text-1)' }}>
        {icon}
        {title}
      </span>
      <span className="text-xs" style={{ color: 'var(--text-3)' }}>
        {hint}
      </span>
    </div>
  )
}
