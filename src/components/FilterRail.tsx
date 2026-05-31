import { Search, AlertTriangle, CheckCircle2, Circle, LayoutGrid, X } from 'lucide-react'
import type { ReactNode } from 'react'

export type StatusFilter = 'all' | 'attention' | 'connected' | 'available'

const STATUS_OPTIONS: { key: StatusFilter; label: string; icon: ReactNode; tone: string }[] = [
  { key: 'all', label: 'All integrations', icon: <LayoutGrid size={15} />, tone: 'var(--text-2)' },
  { key: 'attention', label: 'Needs attention', icon: <AlertTriangle size={15} />, tone: 'var(--warn)' },
  { key: 'connected', label: 'Connected', icon: <CheckCircle2 size={15} />, tone: 'var(--ok)' },
  { key: 'available', label: 'Available', icon: <Circle size={15} />, tone: 'var(--text-3)' },
]

interface Props {
  query: string
  onQuery: (v: string) => void
  status: StatusFilter
  onStatus: (s: StatusFilter) => void
  category: string
  onCategory: (c: string) => void
  categories: string[]
  statusCount: (s: StatusFilter) => number
  categoryCount: (c: string) => number
  onClear: () => void
}

export function FilterRail({
  query,
  onQuery,
  status,
  onStatus,
  category,
  onCategory,
  categories,
  statusCount,
  categoryCount,
  onClear,
}: Props) {
  const dirty = query !== '' || status !== 'all' || category !== 'All'

  return (
    <aside className="sticky top-0 w-[212px] shrink-0 self-start">
      {/* search */}
      <div className="relative mb-4">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-3)' }} />
        <input
          className="field pl-9"
          placeholder="Search…"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
        />
      </div>

      {/* status facet */}
      <RailLabel>Status</RailLabel>
      <div className="mb-5 flex flex-col gap-0.5">
        {STATUS_OPTIONS.map((o) => (
          <FacetButton
            key={o.key}
            on={status === o.key}
            icon={o.icon}
            tone={o.tone}
            label={o.label}
            count={statusCount(o.key)}
            onClick={() => onStatus(o.key)}
          />
        ))}
      </div>

      {/* category facet */}
      <RailLabel>Category</RailLabel>
      <div className="flex flex-col gap-0.5">
        {categories.map((c) => {
          const count = categoryCount(c)
          const on = category === c
          return (
            <FacetButton
              key={c}
              on={on}
              label={c}
              count={count}
              disabled={count === 0 && !on}
              onClick={() => onCategory(c)}
            />
          )
        })}
      </div>

      {dirty && (
        <button
          onClick={onClear}
          className="mt-5 flex items-center gap-1.5 text-[12px] font-semibold transition-colors"
          style={{ color: 'var(--text-3)' }}
        >
          <X size={13} /> Clear filters
        </button>
      )}
    </aside>
  )
}

/**
 * One filter row. Selected state is a clean filled pill with a hairline accent
 * outline (no inset side-bar). The icon and count pick up the accent when active,
 * and unselected rows get a quiet hover wash.
 */
function FacetButton({
  on,
  icon,
  tone,
  label,
  count,
  disabled = false,
  onClick,
}: {
  on: boolean
  icon?: ReactNode
  tone?: string
  label: string
  count: number
  disabled?: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[13px] transition-colors"
      style={{
        background: on ? 'var(--surface-1)' : 'transparent',
        border: on
          ? '1px solid color-mix(in srgb, var(--accent) 55%, var(--border))'
          : '1px solid transparent',
        boxShadow: on ? 'var(--shadow-sm)' : 'none',
        color: on ? 'var(--text-1)' : disabled ? 'var(--text-3)' : 'var(--text-2)',
        fontWeight: on ? 600 : 500,
        opacity: disabled ? 0.45 : 1,
        cursor: disabled ? 'default' : 'pointer',
      }}
      onMouseEnter={(e) => {
        if (!on && !disabled) e.currentTarget.style.background = 'var(--surface-3)'
      }}
      onMouseLeave={(e) => {
        if (!on && !disabled) e.currentTarget.style.background = 'transparent'
      }}
    >
      {icon && (
        <span style={{ color: on ? tone : 'var(--text-3)', display: 'flex' }}>{icon}</span>
      )}
      <span className="flex-1">{label}</span>
      <span
        className="text-[11px] font-semibold tabular-nums"
        style={{ color: on ? 'var(--accent-strong)' : 'var(--text-3)' }}
      >
        {count}
      </span>
    </button>
  )
}

function RailLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-1.5 px-2.5 text-[11px] font-bold tracking-wider" style={{ color: 'var(--text-3)' }}>
      {children}
    </div>
  )
}
