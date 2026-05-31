import { useId, useState, type ReactNode } from 'react'
import { Check, ChevronRight } from 'lucide-react'

/**
 * Drawer breadcrumb. Orients the user inside the side panel - especially when the
 * connect wizard opens on top of the manage view ("…/ Instances / New instance").
 * Non-last crumbs with an onClick are interactive (navigate back); the last is the
 * current location.
 */
export type Crumb = { label: string; onClick?: () => void }

export function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav
      className="flex items-center gap-1.5 px-5 py-2.5"
      style={{ borderBottom: '1px solid var(--border)' }}
      aria-label="Breadcrumb"
    >
      {crumbs.map((c, idx) => {
        const last = idx === crumbs.length - 1
        return (
          <span key={idx} className="flex items-center gap-1.5">
            {idx > 0 && <ChevronRight size={12} style={{ color: 'var(--text-3)' }} />}
            {c.onClick && !last ? (
              <button
                onClick={c.onClick}
                className="text-[12px] font-medium transition-colors hover:underline"
                style={{ color: 'var(--text-3)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-1)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
              >
                {c.label}
              </button>
            ) : (
              <span className="text-[12px] font-semibold" style={{ color: last ? 'var(--text-1)' : 'var(--text-3)' }}>
                {c.label}
              </span>
            )}
          </span>
        )
      })}
    </nav>
  )
}

/**
 * Shared design-system primitives. Anything that was being hand-rolled in more
 * than one place lives here once, so the lime "connected" signal, the coverage
 * bar, and the tier-step badge stay pixel-identical wherever they appear.
 */

/**
 * Lightweight hover/focus tooltip. Pure CSS positioning relative to the trigger;
 * `side` flips it above/below and `align` anchors it so edge triggers don't clip.
 * Accessible: trigger is focusable and described by the bubble.
 */
export function Tooltip({
  label,
  children,
  side = 'top',
  align = 'center',
  width = 220,
}: {
  label: ReactNode
  children: ReactNode
  side?: 'top' | 'bottom'
  align?: 'center' | 'start' | 'end'
  width?: number
}) {
  const [open, setOpen] = useState(false)
  const id = useId()

  const vert =
    side === 'top' ? { bottom: '100%', marginBottom: 8 } : { top: '100%', marginTop: 8 }
  const horiz =
    align === 'center'
      ? { left: '50%', transform: 'translateX(-50%)' }
      : align === 'start'
        ? { left: 0 }
        : { right: 0 }

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      aria-describedby={open ? id : undefined}
    >
      {children}
      {open && (
        <span
          id={id}
          role="tooltip"
          className="pointer-events-none absolute z-50 rounded-lg px-2.5 py-1.5 text-[11px] font-medium leading-snug"
          style={{
            ...vert,
            ...horiz,
            width,
            background: 'var(--surface-3)',
            color: 'var(--text-1)',
            border: '1px solid var(--border-strong)',
            boxShadow: 'var(--shadow)',
            animation: 'fade-in 0.12s ease-out',
          }}
        >
          {label}
        </span>
      )}
    </span>
  )
}

/** Quiet "Connected" status marker - reads as a state, not a button, so the
 *  primary "Manage" CTA stays the strongest element on the card. */
export function ConnectedBadge({ label = 'Connected' }: { label?: string }) {
  return (
    <span
      className="chip"
      style={{
        background: 'transparent',
        color: 'var(--text-2)',
        border: '1px solid var(--border)',
        fontWeight: 500,
      }}
      aria-label={label.toLowerCase()}
    >
      <Check size={12} strokeWidth={2.5} style={{ color: 'var(--ok)' }} />
      {label}
    </span>
  )
}

/** A live, double "lub-dub" heartbeat - the core dot pulses while an expanding
 *  ring radiates out. Signals a healthy, on-schedule connection. */
export function HeartbeatDot({ size = 8 }: { size?: number }) {
  return (
    <span
      className="relative inline-flex shrink-0"
      style={{ width: size, height: size }}
    >
      <span
        className="hb-ring absolute inset-0"
        style={{
          borderRadius: 9999,
          background: 'var(--ok)',
          opacity: 0.55,
        }}
      />
      <span
        className="hb-core relative inline-block"
        style={{
          width: size,
          height: size,
          borderRadius: 9999,
          background: 'var(--ok)',
          boxShadow:
            '0 0 6px color-mix(in srgb, var(--ok) 85%, transparent), 0 0 2px color-mix(in srgb, var(--ok) 95%, transparent)',
        }}
      />
    </span>
  )
}

/** Status chip for a healthy, fully-synced connection - shown when
 *  `connected && !updateAvailable`. Same vocabulary as the Update / Needs-
 *  attention chips, but with a live heartbeat in place of a static dot. */
export function AllSyncedBadge() {
  return (
    <Tooltip label="Live and healthy - every scope is syncing on schedule with no issues.">
      <span
        className="chip"
        style={{
          background: 'color-mix(in srgb, var(--ok) 14%, transparent)',
          color: 'var(--ok)',
          border: '1px solid color-mix(in srgb, var(--ok) 28%, transparent)',
          fontWeight: 600,
        }}
      >
        <HeartbeatDot />
        All synced
      </span>
    </Tooltip>
  )
}

/**
 * Coverage / progress bar. `tone` picks the fill colour; pass a width fraction
 * (0–1) or a percentage via `pct`.
 */
export function ProgressBar({
  value,
  tone = 'accent',
  width = '100%',
  height = 6,
}: {
  /** 0–1 fraction of the bar to fill */
  value: number
  tone?: 'accent' | 'ok' | 'warn'
  /** track width - a tailwind-free explicit size so it works inline */
  width?: number | string
  height?: number
}) {
  const fill =
    tone === 'ok' ? 'var(--ok)' : tone === 'warn' ? 'var(--warn)' : 'var(--accent)'
  return (
    <div
      className="overflow-hidden rounded-full"
      style={{ width, height, background: 'var(--surface-3)' }}
    >
      <div
        className="h-full rounded-full"
        style={{
          width: `${Math.max(0, Math.min(1, value)) * 100}%`,
          background: fill,
          transition: 'width 0.5s cubic-bezier(0.22,1,0.36,1)',
        }}
      />
    </div>
  )
}

/**
 * Numbered tier badge - lit lime when its tier is active, otherwise a quiet
 * outlined circle. Shared by the control-plane tiers and the Day-0 path.
 */
export function StepNumber({ n, active, size = 28 }: { n: number; active: boolean; size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full text-xs font-bold"
      style={{
        width: size,
        height: size,
        background: active ? 'var(--accent)' : 'transparent',
        color: active ? 'var(--accent-ink)' : 'var(--text-3)',
        border: active ? 'none' : '1.5px solid var(--border-strong)',
      }}
    >
      {n}
    </span>
  )
}
