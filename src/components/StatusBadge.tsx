import type { Status } from '../types'
import { STATUS_META } from '../lib/status'
import { ConnectedBadge, Tooltip } from './ui'

export function StatusDot({ status, size = 8 }: { status: Status; size?: number }) {
  const meta = STATUS_META[status]
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        background: meta.color,
        display: 'inline-block',
        boxShadow: `0 0 0 3px color-mix(in srgb, ${meta.color} 18%, transparent)`,
        animation:
          meta.motion === 'pulse' ? 'pulse-dot 1.4s ease-in-out infinite' : undefined,
      }}
    />
  )
}

export function StatusBadge({ status }: { status: Status }) {
  const meta = STATUS_META[status]

  // Connected renders the quiet status marker (transparent chip + green check),
  // so the primary CTA stays the strongest element wherever a card surfaces it.
  if (status === 'connected') {
    return (
      <Tooltip label={meta.hint}>
        <ConnectedBadge label={meta.label} />
      </Tooltip>
    )
  }

  return (
    <Tooltip label={meta.hint}>
      <span
        className="chip"
        style={{
          background: `color-mix(in srgb, ${meta.color} 14%, transparent)`,
          color: meta.color,
          border: `1px solid color-mix(in srgb, ${meta.color} 28%, transparent)`,
        }}
      >
        {meta.motion === 'spin' ? (
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              border: `2px solid color-mix(in srgb, ${meta.color} 35%, transparent)`,
              borderTopColor: meta.color,
              display: 'inline-block',
              animation: 'spin 0.7s linear infinite',
            }}
          />
        ) : (
          <StatusDot status={status} />
        )}
        {meta.label}
      </span>
    </Tooltip>
  )
}
