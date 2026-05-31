import { useState } from 'react'
import { Sparkles, ArrowRight, ChevronDown, Info } from 'lucide-react'
import type { Integration, Layer } from '../types'
import { ProgressBar, StepNumber, Tooltip } from './ui'
import { ControlPlaneBlueprint } from './Brand'

const COPILOT_HINT =
  'Setup Copilot is Act’s AI assistant. It reads your live coverage to recommend what to connect next - but only ever recommends. You approve every step.'

/** Shared Setup Copilot mark - a small lime spark badge. Keeps the assistant
 *  visually distinct from product chrome without becoming a floating chat bot. */
export function CopilotMark({ size = 26 }: { size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-lg"
      style={{
        width: size,
        height: size,
        background: 'color-mix(in srgb, var(--accent) 18%, transparent)',
        border: '1px solid color-mix(in srgb, var(--accent) 38%, transparent)',
        color: 'var(--accent-strong)',
      }}
    >
      <Sparkles size={size * 0.55} />
    </span>
  )
}

/** Small contextual assistant callout used inside the connect flow.
 *  Recommends / explains - never acts on the user's behalf. */
export function CopilotTip({
  children,
  label = 'Setup Copilot',
}: {
  children: React.ReactNode
  label?: string
}) {
  return (
    <div
      className="flex gap-2.5 rounded-xl p-3"
      style={{
        background: 'color-mix(in srgb, var(--accent) 7%, transparent)',
        border: '1px solid color-mix(in srgb, var(--accent) 22%, transparent)',
      }}
    >
      <CopilotMark size={22} />
      <div className="min-w-0">
        <div className="text-[11px] font-bold uppercase tracking-wide" style={{ color: 'var(--accent-strong)' }}>
          {label}
        </div>
        <div className="mt-0.5 text-xs leading-snug" style={{ color: 'var(--text-2)' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

/** Card-level "Why this matters" insight. Quiet by default. */
export function CopilotInsight({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-1.5 text-[11px] leading-snug" style={{ color: 'var(--text-3)' }}>
      <Sparkles size={12} style={{ color: 'var(--accent-strong)', marginTop: 1, flexShrink: 0 }} />
      <span>{text}</span>
    </div>
  )
}

const LABEL: Record<Layer, string> = {
  foundation: 'Foundation',
  context: 'Context',
  action: 'Action',
}

/** Main-page recommendation panel. Answers "what should I connect first?" -
 *  computed from real coverage, with the user always approving the next step. */
export function SetupCopilotPanel({
  items,
  onOpen,
}: {
  items: Integration[]
  onOpen: (i: Integration) => void
}) {
  const [why, setWhy] = useState(false)

  const isConnected = (i: Integration) => i.status === 'connected' || i.status === 'syncing'
  const foundation = items.filter((i) => i.layer === 'foundation')
  const fConnected = foundation.filter(isConnected).length
  const pct = Math.round((fConnected / foundation.length) * 100)

  // ordered next-best actions: finish Foundation, then open an Action route
  const nextFoundation = foundation.filter((i) => !isConnected(i) && (i.recommended || i.id === 'entra'))
  const nextAction = items.find((i) => i.layer === 'action' && i.recommended && !isConnected(i))
  const firstStep = nextFoundation[0] ?? nextAction

  const recoNames = nextFoundation.slice(0, 2).map((i) => i.name)

  return (
    <div
      className="relative mb-9 overflow-hidden rounded-2xl p-6"
      style={{
        background: 'var(--surface-1)',
        border: '1px solid color-mix(in srgb, var(--accent) 30%, var(--border))',
        boxShadow: '0 0 0 1px color-mix(in srgb, var(--accent) 8%, transparent)',
      }}
    >
      {/* delicate brand blueprint on the right - the same control-plane motif as the
          Day-0 hero, kept very quiet and softly faded so it sits behind the controls */}
      <ControlPlaneBlueprint
        className="pointer-events-none absolute top-1/2 right-[-16px] hidden h-[210%] w-[260px] -translate-y-1/2 opacity-[0.4] lg:block"
        style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 58%, black 92%, transparent 100%)' }}
      />
      <div className="relative z-10 flex items-start gap-3.5">
        <CopilotMark size={32} />
        <div className="flex-1">
          {/* header: identity + compact Foundation progress (number lifted out of prose) */}
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
            <div className="flex items-center gap-2">
              <Tooltip label={COPILOT_HINT} width={240}>
                <span
                  className="text-sm font-bold"
                  style={{ color: 'var(--text-1)', borderBottom: '1px dotted var(--text-3)' }}
                >
                  Setup Copilot
                </span>
              </Tooltip>
              <span
                className="chip"
                style={{ background: 'var(--surface-3)', color: 'var(--text-3)', border: '1px solid var(--border)' }}
              >
                guided · you approve every step
              </span>
            </div>
            <Tooltip
              side="bottom"
              align="end"
              width={252}
              label={`${fConnected} of ${foundation.length} Foundation integrations connected. Foundation (cloud + identity) is the access graph every risk detection and remediation builds on - Act recommends getting this to 100% before adding Context or Action tools.`}
            >
              <span className="flex items-center gap-2">
                <span className="text-[11px] font-medium" style={{ color: 'var(--text-3)' }}>
                  Foundation
                </span>
                <ProgressBar value={pct / 100} tone={pct < 100 ? 'warn' : 'ok'} width={64} height={6} />
                <span
                  className="text-xs font-semibold tabular-nums"
                  style={{ color: pct < 100 ? 'var(--warn)' : 'var(--ok)' }}
                >
                  {pct}%
                </span>
              </span>
            </Tooltip>
          </div>

          {/* concise recommendation: one bold line + one muted line */}
          {recoNames.length > 0 ? (
            <>
              <p className="mt-2.5 text-sm font-semibold" style={{ color: 'var(--text-1)' }}>
                Connect {recoNames.join(' and ')} first
              </p>
              <p className="mt-0.5 text-[13px] leading-snug" style={{ color: 'var(--text-2)' }}>
                Unlocks access-risk mapping - then add a ticketing tool to route hardening actions.
              </p>
            </>
          ) : (
            <p className="mt-2.5 text-[13px] leading-snug" style={{ color: 'var(--text-2)' }}>
              Foundation is in place - connect a ticketing tool next to route hardening actions.
            </p>
          )}

          {why && (
            <div
              className="mt-3 space-y-2 rounded-xl p-3 text-xs"
              style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-2)' }}
            >
              <Reason layer="Foundation" text="Cloud + identity give Act the access graph everything else reasons about. Without it, risk context and remediation have nothing to map onto." />
              <Reason layer="Context" text="SIEM & evidence sharpen which risks matter most - useful, but only after the graph exists." />
              <Reason layer="Action" text="Ticketing & remediation are where Act pushes fixes. They pay off once there are findings to route." />
            </div>
          )}

          <div className="mt-3.5 flex flex-wrap items-center gap-2.5">
            {firstStep && (
              <button onClick={() => onOpen(firstStep)} className="btn-primary btn text-xs">
                Start recommended setup
                <ArrowRight size={14} />
              </button>
            )}
            <button
              onClick={() => setWhy((v) => !v)}
              className="btn-ghost btn text-xs"
              aria-expanded={why}
            >
              <Info size={13} /> Why these first?
              <ChevronDown
                size={13}
                style={{ transform: why ? 'rotate(180deg)' : 'none', transition: 'transform 0.18s' }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Day-0 hero. Not an "empty state" - a designed get-started banner that says
 *  nothing is connected yet, leads with the AI's first recommendation, and hands
 *  the user a single clear CTA. All the integration options live below it. */
export function GetStartedHero({
  items,
  onOpen,
}: {
  items: Integration[]
  onOpen: (i: Integration) => void
}) {
  const aws = items.find((i) => i.id === 'aws')
  const firstStep =
    aws ?? items.find((i) => i.layer === 'foundation' && i.recommended) ?? items[0]

  const steps: { label: string; sub: string }[] = [
    { label: 'Foundation', sub: 'Cloud & identity' },
    { label: 'Context', sub: 'SIEM & evidence' },
    { label: 'Action', sub: 'Ticketing & remediation' },
  ]

  return (
    <div
      className="relative mb-10 overflow-hidden rounded-2xl"
      style={{
        background: 'var(--surface-1)',
        border: '1px solid color-mix(in srgb, var(--accent) 30%, var(--border))',
        boxShadow: '0 0 0 1px color-mix(in srgb, var(--accent) 8%, transparent)',
      }}
    >
      {/* brand construction-line blueprint - the control plane being assembled, in the gap behind the content */}
      <ControlPlaneBlueprint
        className="pointer-events-none absolute top-1/2 left-[52%] hidden h-[124%] w-[330px] -translate-y-1/2 opacity-[0.6] lg:block"
        style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 40%, black 70%, transparent 100%)' }}
      />
      <div className="relative z-10 flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between">
        {/* message + CTA */}
        <div className="max-w-xl">
          <div className="flex items-center gap-2.5">
            <CopilotMark size={34} />
            <span
              className="chip"
              style={{ background: 'var(--surface-3)', color: 'var(--text-3)', border: '1px solid var(--border)' }}
            >
              Setup Copilot · nothing connected yet
            </span>
          </div>

          <h2
            className="mt-5 text-xl font-bold"
            style={{ color: 'var(--text-1)', letterSpacing: '-0.01em' }}
          >
            Let’s wire Act into your stack
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
            Act builds bottom-up. Start with the{' '}
            <strong style={{ color: 'var(--text-1)' }}>Foundation</strong> - cloud + identity - and the
            access graph everything else reasons about comes to life.
          </p>

          <div
            className="mt-5 flex items-start gap-2.5 rounded-xl p-3.5"
            style={{
              background: 'color-mix(in srgb, var(--accent) 7%, transparent)',
              border: '1px solid color-mix(in srgb, var(--accent) 22%, transparent)',
            }}
          >
            <Sparkles size={15} style={{ color: 'var(--accent-strong)', marginTop: 1, flexShrink: 0 }} />
            <span className="text-[13px] leading-snug" style={{ color: 'var(--text-2)' }}>
              Recommended first step: connect{' '}
              <strong style={{ color: 'var(--text-1)' }}>{firstStep.name}</strong> - it maps IAM, network
              exposure &amp; resources that every other integration builds on.
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3.5">
            <button onClick={() => onOpen(firstStep)} className="btn-primary btn">
              Start with {firstStep.name}
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* the three-tier path Act assembles, bottom-up */}
        <div
          className="shrink-0 rounded-xl p-5"
          style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
        >
          <div className="mb-3 text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>
            The path
          </div>
          <div className="flex flex-col gap-1">
            {steps.map((s, idx) => (
              <div key={s.label}>
                <div className="flex items-center gap-3">
                  <StepNumber n={idx + 1} active={idx === 0} />
                  <div>
                    <div className="text-[13px] font-semibold" style={{ color: 'var(--text-1)' }}>
                      {s.label}
                    </div>
                    <div className="text-[11px]" style={{ color: 'var(--text-3)' }}>
                      {s.sub}
                    </div>
                  </div>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className="my-1 ml-3"
                    style={{ width: 0, height: 12, borderLeft: '1.5px dashed var(--border-strong)' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Reason({ layer, text }: { layer: string; text: string }) {
  return (
    <div className="flex gap-2">
      <span className="font-bold" style={{ color: 'var(--accent-strong)', minWidth: 78 }}>
        {layer}
      </span>
      <span>{text}</span>
    </div>
  )
}

export { LABEL as COPILOT_LAYER_LABEL }
