import { ArrowRight, Sparkles, ArrowUpCircle } from 'lucide-react'
import type { Integration } from '../types'
import { LogoTile } from './LogoTile'
import { StatusBadge } from './StatusBadge'
import { CopilotInsight } from './Copilot'
import { AllSyncedBadge, ConnectedBadge, Tooltip } from './ui'

interface Props {
  integration: Integration
  onOpen: (i: Integration) => void
  /** the integration whose panel is currently open - gets a persistent brand ring */
  active?: boolean
}

const ACTIVE_BORDER = 'color-mix(in srgb, var(--accent) 60%, var(--border))'
const HOVER_BORDER = 'color-mix(in srgb, var(--accent) 45%, var(--border))'
const CONNECTED_BORDER = 'color-mix(in srgb, var(--accent) 40%, var(--border))'
const CONNECTED_BG = 'color-mix(in srgb, var(--accent) 5%, var(--surface-1))'

export function IntegrationCard({ integration, onOpen, active = false }: Props) {
  const i = integration
  const isConnected = i.status === 'connected' || i.status === 'syncing'
  const needsAttention =
    i.status === 'needs_attention' || i.status === 'error' || i.status === 'degraded'

  const cta =
    i.status === 'degraded'
      ? 'Fix'
      : i.status === 'needs_attention' || i.status === 'error'
        ? 'Reconnect'
        : i.status === 'disabled'
          ? 'Enable'
          : isConnected
            ? 'Manage'
            : 'Connect'

  const restingBorder = active ? ACTIVE_BORDER : isConnected ? CONNECTED_BORDER : 'var(--border)'
  const restingShadow = active ? '0 0 0 3px var(--ring)' : 'none'

  return (
    <button
      onClick={() => onOpen(i)}
      className="group surface flex flex-col gap-4 rounded-2xl p-5 text-left transition-all duration-150 hover:-translate-y-0.5"
      style={{
        borderColor: restingBorder,
        boxShadow: restingShadow,
        background: isConnected ? CONNECTED_BG : 'var(--surface-1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = HOVER_BORDER
        e.currentTarget.style.boxShadow = '0 0 0 3px var(--ring), var(--shadow)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = restingBorder
        e.currentTarget.style.boxShadow = restingShadow
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <LogoTile id={i.id} mono={i.mono} color={i.color} />
        {i.status === 'connected' ? (
          <ConnectedBadge />
        ) : i.recommended && i.status === 'not_connected' ? (
          <Tooltip
            side="bottom"
            align="end"
            width={224}
            label="Setup Copilot recommends connecting this early - it unlocks the most downstream value for the rest of your stack."
          >
            <span
              className="chip"
              style={{
                background: 'transparent',
                color: 'var(--text-3)',
                border: '1px solid var(--border)',
                fontWeight: 500,
              }}
            >
              <Sparkles size={12} style={{ color: 'var(--accent-strong)' }} /> Recommended
            </span>
          </Tooltip>
        ) : null}
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-[15px] font-semibold" style={{ color: 'var(--text-1)' }}>
            {i.name}
          </h3>
        </div>
        <span className="text-xs font-medium" style={{ color: 'var(--text-3)' }}>
          {i.category}
        </span>
        <p className="mt-2 text-[13px] leading-relaxed" style={{ color: 'var(--text-2)' }}>
          {i.blurb}
        </p>
        {i.copilotWhy && (
          <div className="mt-3">
            <CopilotInsight text={i.copilotWhy} />
          </div>
        )}
      </div>

      <div className="border-t pt-3" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            {i.status === 'connected' ? (
              i.updateAvailable ? (
                <Tooltip
                  width={224}
                  label="A newer version of this connector is available - new scopes or fixes. Open it to review and apply the update."
                >
                  <span
                    className="chip"
                    style={{
                      background: 'color-mix(in srgb, var(--warn) 16%, transparent)',
                      color: 'var(--warn)',
                      border: '1px solid color-mix(in srgb, var(--warn) 32%, transparent)',
                    }}
                  >
                    <ArrowUpCircle size={11} /> Update
                  </span>
                </Tooltip>
              ) : (
                <>
                  <AllSyncedBadge />
                  {i.lastSync && (
                    <span className="text-[11px]" style={{ color: 'var(--text-3)' }}>
                      {i.lastSync}
                    </span>
                  )}
                </>
              )
            ) : (
              <>
                <StatusBadge status={i.status} />
                {isConnected && i.updateAvailable && (
                  <Tooltip
                    width={224}
                    label="A newer version of this connector is available - new scopes or fixes. Open it to review and apply the update."
                  >
                    <span
                      className="chip"
                      style={{
                        background: 'color-mix(in srgb, var(--warn) 16%, transparent)',
                        color: 'var(--warn)',
                        border: '1px solid color-mix(in srgb, var(--warn) 32%, transparent)',
                      }}
                    >
                      <ArrowUpCircle size={11} /> Update
                    </span>
                  </Tooltip>
                )}
              </>
            )}
          </div>
          <span
            className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold transition-colors"
            style={{ color: needsAttention ? 'var(--warn)' : 'var(--text-2)' }}
          >
            {cta}
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </button>
  )
}
