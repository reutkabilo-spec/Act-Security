import { useEffect, useMemo, useState } from 'react'
import {
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  ShieldCheck,
  AlertTriangle,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  Database,
  Zap,
  KeyRound,
  Cloud,
  RefreshCw,
  Plug,
  Settings2,
  Trash2,
  Activity,
  Ban,
  Lock,
  Wrench,
  ChevronRight,
  ChevronDown,
  Play,
  History,
} from 'lucide-react'
import type { Capability, Integration, Status } from '../types'
import { LogoTile } from './LogoTile'
import { CopilotTip } from './Copilot'
import { SpotIllustration } from './Brand'
import { AllSyncedBadge, Breadcrumb, type Crumb } from './ui'

export type Phase = 'overview' | 'credentials' | 'consent' | 'connecting' | 'success' | 'error'

const STEPS = ['Select', 'Credentials', 'Consent', 'Done']

const AUTH_LABEL: Record<Integration['authType'], string> = {
  'aws-role': 'Cross-account IAM role',
  oauth: 'OAuth 2.0',
  'api-token': 'API token',
}

const AWS_REGIONS = ['us-east-1', 'us-west-2', 'eu-west-1', 'eu-central-1', 'ap-southeast-1']

interface Props {
  integration: Integration
  onClose: () => void
  onStatusChange: (id: string, status: Status) => void
  /** deep-link / deck: open the panel at a specific phase */
  initialPhase?: Phase
  /** Setup Copilot "next best action" - close this panel and open another integration */
  onOpenIntegration?: (id: string) => void
  /** "+ Add instance" - run the full connect flow even though the integration is installed */
  forceConnect?: boolean
  /** drawer breadcrumb trail (optional orientation aid) */
  crumbs?: Crumb[]
}

export function ConnectPanel({ integration: i, onClose, onStatusChange, initialPhase, onOpenIntegration, forceConnect, crumbs }: Props) {
  const isManage = !forceConnect && (i.status === 'connected' || i.status === 'syncing')
  const isReconnect =
    i.status === 'needs_attention' || i.status === 'error' || i.status === 'degraded'

  const [phase, setPhase] = useState<Phase>(
    initialPhase ?? (isManage ? 'success' : isReconnect ? 'credentials' : 'overview'),
  )
  const [oauthAuthorized, setOauthAuthorized] = useState(false)
  const [oauthBusy, setOauthBusy] = useState(false)
  const [showToken, setShowToken] = useState(false)
  const [token, setToken] = useState('')
  const [endpoint, setEndpoint] = useState(i.id === 'sentinel' ? 'https://act.ods.opinsights.azure.com' : '')
  const [roleArn, setRoleArn] = useState('')
  const [region, setRegion] = useState(AWS_REGIONS[0])
  const [method, setMethod] = useState<'CloudFormation' | 'Terraform'>('CloudFormation')
  const [connName, setConnName] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [justConnected, setJustConnected] = useState(false)
  const [optional, setOptional] = useState<Set<string>>(
    // Least privilege: optional reads default on, optional writes default off
    () => new Set(i.scopes.filter((s) => !s.required && s.access !== 'write').map((s) => s.id)),
  )
  const [copied, setCopied] = useState('')

  // reset when integration changes
  useEffect(() => {
    setPhase(initialPhase ?? (isManage ? 'success' : isReconnect ? 'credentials' : 'overview'))
    setOauthAuthorized(false)
    setToken('')
    setRoleArn('')
    setAttempts(0)
    setJustConnected(false)
    setOptional(new Set(i.scopes.filter((s) => !s.required && s.access !== 'write').map((s) => s.id)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i.id])

  // lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const stepIndex = useMemo(() => {
    switch (phase) {
      case 'overview':
        return 0
      case 'credentials':
        return 1
      case 'consent':
        return 2
      default:
        return 3
    }
  }, [phase])

  const copy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(''), 1500)
  }

  const credentialsValid = () => {
    if (i.authType === 'oauth') return oauthAuthorized
    if (i.authType === 'aws-role') return roleArn.trim().length > 0
    return endpoint.trim().length > 0 && token.trim().length > 0
  }

  const runConnect = () => {
    setPhase('connecting')
    setOauthBusy(false)
    window.setTimeout(() => {
      // AWS demo: first attempt fails on a missing permission, retry succeeds
      if (i.demoError && attempts === 0) {
        setAttempts(1)
        setPhase('error')
        return
      }
      onStatusChange(i.id, 'syncing')
      setJustConnected(true)
      setPhase('success')
    }, 1400)
  }

  const startOAuth = () => {
    setOauthBusy(true)
    window.setTimeout(() => {
      setOauthBusy(false)
      setOauthAuthorized(true)
    }, 1100)
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        onClick={onClose}
        className="absolute inset-0"
        style={{ background: 'rgba(3,6,10,0.6)', animation: 'overlay-in 0.2s ease' }}
      />
      <aside
        className="relative flex h-full w-full max-w-[640px] flex-col"
        style={{
          background: 'var(--surface-1)',
          borderLeft: '1px solid var(--border)',
          boxShadow: 'var(--shadow)',
          animation: 'panel-in 0.28s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        {/* header */}
        <div className="flex items-start gap-3 border-b p-5" style={{ borderColor: 'var(--border)' }}>
          <LogoTile id={i.id} mono={i.mono} color={i.color} size={40} />
          <div className="flex-1">
            <h2 className="text-base font-semibold" style={{ color: 'var(--text-1)' }}>
              {isManage ? 'Manage ' : 'Connect '}
              {i.name}
            </h2>
            <div className="mt-1 flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-3)' }}>
              <span>{i.category}</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <KeyRound size={11} /> {AUTH_LABEL[i.authType]}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 transition-colors hover:bg-[var(--surface-3)]" aria-label="Close">
            <X size={18} style={{ color: 'var(--text-2)' }} />
          </button>
        </div>

        {/* breadcrumb (e.g. adding a new instance) */}
        {crumbs && crumbs.length > 0 && <Breadcrumb crumbs={crumbs} />}

        {/* stepper */}
        {!isManage && (
          <div className="flex items-center gap-1 px-5 py-3.5" style={{ borderBottom: '1px solid var(--border)' }}>
            {STEPS.map((label, idx) => {
              const done = idx < stepIndex
              const active = idx === stepIndex
              return (
                <div key={label} className="flex flex-1 items-center gap-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold transition-all"
                      style={{
                        background: done
                          ? 'var(--accent)'
                          : active
                            ? 'transparent'
                            : 'var(--surface-3)',
                        color: done ? 'var(--accent-ink)' : active ? 'var(--accent-strong)' : 'var(--text-3)',
                        border: active ? '1.5px solid var(--accent-strong)' : '1.5px solid transparent',
                      }}
                    >
                      {done ? <Check size={12} /> : idx + 1}
                    </span>
                    <span
                      className="text-[11px] font-semibold"
                      style={{ color: active ? 'var(--text-1)' : 'var(--text-3)' }}
                    >
                      {label}
                    </span>
                  </div>
                  {idx < STEPS.length - 1 && (
                    <span className="h-px flex-1" style={{ background: done ? 'var(--accent-strong)' : 'var(--border)' }} />
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* body */}
        <div className="flex-1 overflow-y-auto p-5" style={{ animation: 'fade-in 0.25s ease' }} key={phase}>
          {isReconnect && phase === 'credentials' && (() => {
            const tip = installedBrief(i, i.capabilities ?? [])
            return (
              <div className="mb-4">
                <CopilotTip>
                  <span className="font-semibold" style={{ color: 'var(--text-1)' }}>
                    {tip.lead}.
                  </span>{' '}
                  {tip.body}
                </CopilotTip>
              </div>
            )
          })()}

          {phase === 'overview' && <Overview i={i} />}

          {phase === 'credentials' && (
            <Credentials
              i={i}
              region={region}
              setRegion={setRegion}
              roleArn={roleArn}
              setRoleArn={setRoleArn}
              endpoint={endpoint}
              setEndpoint={setEndpoint}
              token={token}
              setToken={setToken}
              showToken={showToken}
              setShowToken={setShowToken}
              oauthAuthorized={oauthAuthorized}
              oauthBusy={oauthBusy}
              startOAuth={startOAuth}
              copied={copied}
              copy={copy}
              method={method}
              setMethod={setMethod}
              connName={connName}
              setConnName={setConnName}
              reconnect={isReconnect}
            />
          )}

          {phase === 'consent' && (
            <Consent i={i} optional={optional} setOptional={setOptional} region={region} />
          )}

          {phase === 'connecting' && <Connecting i={i} />}

          {phase === 'error' && (
            <ErrorState copied={copied} copy={copy} onBack={() => setPhase('credentials')} />
          )}

          {phase === 'success' && (
            <Success
              i={i}
              isManage={isManage}
              justConnected={justConnected}
              optionalCount={optional.size}
              region={region}
              onOpenIntegration={onOpenIntegration}
              onDisconnect={() => {
                onStatusChange(i.id, 'not_connected')
                onClose()
              }}
            />
          )}
        </div>

        {/* footer */}
        <div className="flex items-center justify-between gap-3 border-t p-4" style={{ borderColor: 'var(--border)' }}>
          <Footer
            i={i}
            phase={phase}
            isManage={isManage}
            credentialsValid={credentialsValid()}
            onBack={() => {
              if (phase === 'credentials') setPhase('overview')
              else if (phase === 'consent') setPhase('credentials')
            }}
            onNext={() => {
              if (phase === 'overview') setPhase('credentials')
              else if (phase === 'credentials') setPhase('consent')
              else if (phase === 'consent') runConnect()
            }}
            onRetry={runConnect}
            onClose={onClose}
            onDisconnect={() => {
              onStatusChange(i.id, 'not_connected')
              onClose()
            }}
          />
        </div>
      </aside>
    </div>
  )
}

/* ----------------------------- step bodies ----------------------------- */

/** Plain-English, AI-voiced explanation of what connecting this integration does -
 *  shown in the Overview so a first-time user gets the value before any credentials. */
function plainExplain(i: Integration): string {
  if (i.copilotWhy) return i.copilotWhy
  const reads = i.reads.replace(/\.$/, '').toLowerCase()
  if (i.layer === 'foundation')
    return `Connecting ${i.name} lets Act read ${reads} - the core picture it needs before it can spot or fix risky access.`
  if (i.layer === 'context')
    return `${i.name} gives Act extra signal - ${reads} - so it can tell which risks actually matter and surface those first.`
  return `Once ${i.name} is connected, Act can push its hardening fixes straight into it - so risky access gets fixed, not just flagged.`
}

function Overview({ i }: { i: Integration }) {
  const hasWrite = i.scopes.some((s) => s.access === 'write')
  const role = i.requiredRole ?? (i.authType === 'aws-role' ? 'AWS account admin' : 'Workspace / org admin')
  const never =
    i.neverDoes ??
    [
      'Read message, file or record contents',
      'Make changes without an action you approve',
      'Share your data outside your Act tenant',
    ]
  return (
    <div className="space-y-4">
      {/* Setup Copilot - plain-English "what this does" before any technical detail */}
      <CopilotTip>
        <span className="font-semibold" style={{ color: 'var(--text-1)' }}>
          What connecting {i.name} does.
        </span>{' '}
        {plainExplain(i)}
      </CopilotTip>

      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
        {i.blurb}
      </p>

      {/* trust posture up front - before any credential is asked for */}
      <div className="flex flex-wrap gap-2">
        <span
          className="chip"
          style={{
            background: 'color-mix(in srgb, var(--ok) 14%, transparent)',
            color: 'var(--ok)',
            border: '1px solid color-mix(in srgb, var(--ok) 28%, transparent)',
          }}
        >
          <Eye size={12} /> {hasWrite ? 'Read-only recommended' : 'Read-only'}
        </span>
        <span
          className="chip"
          style={{ background: 'var(--surface-3)', color: 'var(--text-2)', border: '1px solid var(--border)' }}
        >
          <RefreshCw size={12} /> Revoke anytime
        </span>
        <span
          className="chip"
          style={{ background: 'var(--surface-3)', color: 'var(--text-2)', border: '1px solid var(--border)' }}
        >
          <Lock size={12} /> Requires {role}
        </span>
      </div>

      <InfoRow icon={<Database size={16} />} title="Data Act will access">
        {i.reads}
      </InfoRow>
      <InfoRow icon={<Zap size={16} />} title="What this unlocks">
        {i.enables}
      </InfoRow>

      <div
        className="rounded-xl p-3.5"
        style={{
          background: 'color-mix(in srgb, var(--danger) 7%, transparent)',
          border: '1px solid color-mix(in srgb, var(--danger) 22%, transparent)',
        }}
      >
        <div className="flex items-center gap-2 text-[13px] font-semibold" style={{ color: 'var(--text-1)' }}>
          <Ban size={15} style={{ color: 'var(--danger)' }} /> Act will never
        </div>
        <ul className="mt-2 space-y-1.5 text-xs" style={{ color: 'var(--text-2)' }}>
          {never.map((n) => (
            <li key={n} className="flex gap-2">
              <span style={{ color: 'var(--danger)' }}>·</span>
              {n}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-3)' }}>
        <ShieldCheck size={14} style={{ color: 'var(--ok)', marginTop: 1 }} />
        You'll review and can toggle every permission on the Consent step, then test the connection before
        it goes live.
      </div>
    </div>
  )
}

function Credentials(props: {
  i: Integration
  region: string
  setRegion: (v: string) => void
  roleArn: string
  setRoleArn: (v: string) => void
  endpoint: string
  setEndpoint: (v: string) => void
  token: string
  setToken: (v: string) => void
  showToken: boolean
  setShowToken: (v: boolean) => void
  oauthAuthorized: boolean
  oauthBusy: boolean
  startOAuth: () => void
  copied: string
  copy: (t: string, k: string) => void
  method: 'CloudFormation' | 'Terraform'
  setMethod: (m: 'CloudFormation' | 'Terraform') => void
  connName: string
  setConnName: (v: string) => void
  /** reconnecting a broken connection - the status brief above already plays the
   *  Copilot role, so suppress this step's generic leading tip to avoid two in a row */
  reconnect?: boolean
}) {
  const { i, reconnect } = props
  const externalId = 'act-7f3a9c21-e0b4'

  if (i.authType === 'oauth') {
    return (
      <div className="space-y-4">
        {!reconnect && (
          <CopilotTip>
            Sign in with an admin account so Act can request the read scopes it needs. You'll review and can
            toggle every permission on the next step.
          </CopilotTip>
        )}
        <p className="text-sm" style={{ color: 'var(--text-2)' }}>
          You'll be redirected to {i.name} to authorize Act. We never see or store your password.
        </p>
        {props.oauthAuthorized ? (
          <div
            className="flex items-center gap-3 rounded-xl p-4"
            style={{ background: 'color-mix(in srgb, var(--ok) 12%, transparent)', border: '1px solid color-mix(in srgb, var(--ok) 30%, transparent)' }}
          >
            <Check size={18} style={{ color: 'var(--ok)' }} />
            <div className="text-sm">
              <div className="font-semibold" style={{ color: 'var(--text-1)' }}>
                Authorized
              </div>
              <div className="text-xs" style={{ color: 'var(--text-3)' }}>
                Connected to workspace “Act Security”
              </div>
            </div>
          </div>
        ) : (
          <button onClick={props.startOAuth} disabled={props.oauthBusy} className="btn w-full" style={{ background: i.color, color: '#fff' }}>
            {props.oauthBusy ? (
              <>
                <Spinner color="#fff" /> Redirecting to {i.name}…
              </>
            ) : (
              <>
                <ExternalLink size={15} /> Authorize with {i.name}
              </>
            )}
          </button>
        )}
        <p className="text-xs" style={{ color: 'var(--text-3)' }}>
          Tip: sign in with an admin account so Act can request the scopes it needs on the next step.
        </p>
      </div>
    )
  }

  if (i.authType === 'aws-role') {
    const methods = i.setupMethods ?? ['CloudFormation', 'Terraform']
    const terraform = props.method === 'Terraform'
    return (
      <div className="space-y-4">
        {!reconnect && (
          <CopilotTip>
            Recommended: create a <strong style={{ color: 'var(--text-1)' }}>dedicated read-only role</strong> for the
            initial sync. Remediation permissions can be added later, after you've reviewed the access graph.
          </CopilotTip>
        )}

        {/* setup method - matches how AWS connectors are really deployed */}
        <div className="flex gap-1 rounded-xl p-1" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
          {methods.map((m) => {
            const on = props.method === m
            const soon = m === 'Terraform'
            return (
              <button
                key={m}
                onClick={() => !soon && props.setMethod(m)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold transition-colors"
                style={{
                  background: on ? 'var(--surface-1)' : 'transparent',
                  color: on ? 'var(--text-1)' : 'var(--text-3)',
                  border: on ? '1px solid var(--border)' : '1px solid transparent',
                  cursor: soon ? 'not-allowed' : 'pointer',
                }}
              >
                {m}
                {soon && (
                  <span className="chip" style={{ background: 'var(--surface-3)', color: 'var(--text-3)', padding: '0 6px' }}>
                    Soon
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <VideoHelp method={props.method} />

        <div>
          <label className="label">Connection name <span style={{ color: 'var(--text-3)', fontWeight: 400 }}>(for your reference)</span></label>
          <input
            className="field"
            placeholder="e.g. AWS - Production"
            value={props.connName}
            onChange={(e) => props.setConnName(e.target.value)}
          />
        </div>

        <div>
          <label className="label">Region</label>
          <select className="field" value={props.region} onChange={(e) => props.setRegion(e.target.value)}>
            {AWS_REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div
          className="rounded-xl p-3.5"
          style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-2 text-[13px] font-semibold" style={{ color: 'var(--text-1)' }}>
            <Cloud size={15} style={{ color: i.color }} /> Deploy with {props.method}
            <span className="chip ml-auto" style={{ background: 'var(--accent-soft)', color: 'var(--accent-strong)' }}>
              Read-only
            </span>
          </div>
          <p className="mt-1.5 text-xs" style={{ color: 'var(--text-2)' }}>
            We'll provide all the necessary values. We don't recommend changing them, but you can if needed.
          </p>

          {/* guided steps - concrete, with "show me" deep links into AWS */}
          <ol className="mt-3 space-y-2.5">
            <Step n={1}>
              Copy the <strong style={{ color: 'var(--text-1)' }}>External ID</strong> below - it scopes the trust to your
              tenant only.
            </Step>
            <div className="flex items-center justify-between rounded-lg px-3 py-2" style={{ background: 'var(--surface-3)', border: '1px solid var(--border)' }}>
              <div>
                <div className="text-[10px] uppercase tracking-wide" style={{ color: 'var(--text-3)' }}>
                  External ID
                </div>
                <div className="mono text-xs" style={{ color: 'var(--text-1)' }}>
                  {externalId}
                </div>
              </div>
              <button onClick={() => props.copy(externalId, 'ext')} className="btn-ghost btn px-2 py-1.5 text-xs">
                {props.copied === 'ext' ? <Check size={13} /> : <Copy size={13} />}
                {props.copied === 'ext' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <Step n={2}>
              {terraform ? 'Run the Terraform module' : 'Launch the CloudFormation stack'} and, in your AWS
              account, click <strong style={{ color: 'var(--text-1)' }}>Create stack</strong>. <ShowMe />
            </Step>
            <Step n={3}>
              The <strong style={{ color: 'var(--text-1)' }}>Role ARN</strong> appears in the Outputs tab within ~60s.
              Copy it once it shows. <ShowMe />
            </Step>
          </ol>

          <button className="btn-primary btn mt-3 w-full">
            <ExternalLink size={14} /> {terraform ? 'Open Terraform module' : 'Launch CloudFormation stack'}
          </button>
        </div>

        <div>
          <label className="label">Role ARN</label>
          <input
            className="field mono"
            placeholder="arn:aws:iam::123456789012:role/ActSecurityRole"
            value={props.roleArn}
            onChange={(e) => props.setRoleArn(e.target.value)}
          />
          <a className="mt-1.5 inline-flex items-center gap-1 text-xs" style={{ color: 'var(--info)' }} href="#" onClick={(e) => e.preventDefault()}>
            <ExternalLink size={11} /> Where do I find the Role ARN?
          </a>
        </div>
      </div>
    )
  }

  // api-token
  return (
    <div className="space-y-4">
      {!reconnect && (
        <CopilotTip>
          Use a token scoped to read-only access for the first sync. Act stores it encrypted and never writes
          back unless you enable it.
        </CopilotTip>
      )}
      <div>
        <label className="label">Endpoint URL</label>
        <input
          className="field mono"
          placeholder="https://your-instance.splunkcloud.com:8089"
          value={props.endpoint}
          onChange={(e) => props.setEndpoint(e.target.value)}
        />
      </div>
      <div>
        <label className="label">API token</label>
        <div className="relative">
          <input
            className="field mono pr-10"
            type={props.showToken ? 'text' : 'password'}
            placeholder="••••••••••••••••••••"
            value={props.token}
            onChange={(e) => props.setToken(e.target.value)}
          />
          <button
            onClick={() => props.setShowToken(!props.showToken)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1"
            style={{ color: 'var(--text-3)' }}
            aria-label="Toggle token visibility"
          >
            {props.showToken ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        <p className="mt-1.5 text-xs" style={{ color: 'var(--text-3)' }}>
          Stored encrypted. Tokens are shown only once by {i.name} - paste it here now.
        </p>
      </div>
    </div>
  )
}

function Consent({
  i,
  optional,
  setOptional,
  region,
}: {
  i: Integration
  optional: Set<string>
  setOptional: (s: Set<string>) => void
  region: string
}) {
  const reads = i.scopes.filter((s) => s.access === 'read')
  const writes = i.scopes.filter((s) => s.access === 'write')

  const toggle = (id: string) => {
    const next = new Set(optional)
    next.has(id) ? next.delete(id) : next.add(id)
    setOptional(next)
  }

  const Group = ({ title, items, tone }: { title: string; items: typeof i.scopes; tone: string }) =>
    items.length === 0 ? null : (
      <div>
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide" style={{ color: tone }}>
          {title === 'Read' ? <Eye size={13} /> : <Settings2 size={13} />}
          {title} access
        </div>
        <div className="space-y-2">
          {items.map((s) => {
            const checked = s.required || optional.has(s.id)
            return (
              <label
                key={s.id}
                className="flex cursor-pointer items-start gap-3 rounded-xl p-3 transition-colors"
                style={{
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  opacity: s.required || checked ? 1 : 0.6,
                  cursor: s.required ? 'default' : 'pointer',
                }}
              >
                <span
                  className="mt-0.5 flex h-4.5 w-4.5 items-center justify-center rounded"
                  style={{
                    width: 18,
                    height: 18,
                    background: checked ? 'var(--accent)' : 'transparent',
                    border: checked ? 'none' : '1.5px solid var(--border-strong)',
                  }}
                  onClick={() => !s.required && toggle(s.id)}
                >
                  {checked && <Check size={12} style={{ color: 'var(--accent-ink)' }} />}
                </span>
                <span className="flex-1">
                  <span className="flex items-center gap-2 text-[13px] font-semibold" style={{ color: 'var(--text-1)' }}>
                    {s.label}
                    {s.required ? (
                      <span className="text-[10px] font-medium" style={{ color: 'var(--text-3)' }}>
                        Required
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium" style={{ color: 'var(--info)' }}>
                        Optional
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block text-xs" style={{ color: 'var(--text-3)' }}>
                    {s.description}
                  </span>
                </span>
              </label>
            )
          })}
        </div>
      </div>
    )

  const writeLabels = writes.map((s) => s.label.toLowerCase()).join(', ')
  return (
    <div className="space-y-5">
      <CopilotTip>
        {i.authType === 'aws-role' ? (
          <>
            Act will read IAM roles, policies, VPC configuration and security groups. Act will{' '}
            <strong style={{ color: 'var(--text-1)' }}>not modify resources</strong> unless you enable
            remediation permissions below.
          </>
        ) : writes.length > 0 ? (
          <>
            Everything required here is read-only. The write items ({writeLabels}) are optional - leave them
            off and Act will recommend instead of act.
          </>
        ) : (
          <>This integration is read-only - Act can pull context but cannot make any changes.</>
        )}
      </CopilotTip>
      <p className="text-sm" style={{ color: 'var(--text-2)' }}>
        Review what Act can do with {i.name}. You can turn off anything optional.
      </p>
      <Group title="Read" items={reads} tone="var(--ok)" />
      <Group title="Write" items={writes} tone="var(--warn)" />
      <div
        className="flex items-start gap-2 rounded-xl p-3 text-xs"
        style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-2)' }}
      >
        <RefreshCw size={14} style={{ color: 'var(--info)', marginTop: 1 }} />
        <span>
          <span className="font-semibold" style={{ color: 'var(--text-1)' }}>
            Test connection before enabling.
          </span>{' '}
          On Integrate, Act runs a read-only validation first - nothing is written until the test passes.
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-3)' }}>
        <ShieldCheck size={13} style={{ color: 'var(--ok)' }} />
        Data processed in <span className="mono">{i.authType === 'aws-role' ? region : 'EU (Frankfurt)'}</span>. Revoke anytime from this panel.
      </div>
    </div>
  )
}

function Connecting({ i }: { i: Integration }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="relative mb-5">
        <LogoTile id={i.id} mono={i.mono} color={i.color} size={56} />
        <span
          className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full"
          style={{ background: 'var(--surface-1)' }}
        >
          <Spinner size={18} />
        </span>
      </div>
      <div className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>
        Establishing connection…
      </div>
      <div className="mt-1 text-xs" style={{ color: 'var(--text-3)' }}>
        Validating credentials · starting first sync
      </div>
    </div>
  )
}

function ErrorState({
  copied,
  copy,
  onBack,
}: {
  copied: string
  copy: (t: string, k: string) => void
  onBack: () => void
}) {
  const policy = `{
  "Effect": "Allow",
  "Action": "iam:ListRoles",
  "Resource": "*"
}`
  return (
    <div className="space-y-4">
      <div className="flex justify-center py-1">
        <SpotIllustration variant="error" size={108} />
      </div>
      <Banner tone="danger" icon={<AlertTriangle size={16} />} title="Couldn’t validate connection">
        The role was reached, but a required permission is missing.
      </Banner>
      <CopilotTip>
        One permission is missing: <code className="mono" style={{ color: 'var(--danger)' }}>iam:ListRoles</code>. Add it to
        the role policy (or use the recommended template), then retry - nothing else needs to change.
      </CopilotTip>
      <div className="rounded-xl p-3.5" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
        <div className="text-xs font-semibold" style={{ color: 'var(--text-1)' }}>
          Missing permission
        </div>
        <div className="mono mt-1 text-[13px]" style={{ color: 'var(--danger)' }}>
          iam:ListRoles
        </div>
        <p className="mt-2 text-xs" style={{ color: 'var(--text-2)' }}>
          Add this statement to the role policy, then retry. Nothing else needs to change.
        </p>
        <div className="relative mt-2.5">
          <pre
            className="mono overflow-x-auto rounded-lg p-3 text-[11px] leading-relaxed"
            style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-2)' }}
          >
            {policy}
          </pre>
          <button onClick={() => copy(policy, 'pol')} className="btn-ghost btn absolute right-2 top-2 px-2 py-1 text-[11px]">
            {copied === 'pol' ? <Check size={12} /> : <Copy size={12} />}
            {copied === 'pol' ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: 'var(--text-2)' }}>
          <ArrowLeft size={13} /> Back to credentials
        </button>
        <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: 'var(--info)' }}>
          <ExternalLink size={12} /> Open setup guide
        </a>
      </div>
    </div>
  )
}

type AuditEntry = { text: string; when: string; who: string }

function enabledWhy(c: Capability) {
  if (/activity|threat/i.test(c.name) || c.permissions.some((p) => /cloudtrail/i.test(p)))
    return 'Org-trail enabled - CloudTrail is now read across all regions.'
  if (/write|harden/i.test(c.name))
    return 'Act can now apply least-privilege hardening through native controls.'
  return 'Verified - the granted permissions now fully satisfy this capability.'
}

/** Setup Copilot's plain-English brief on an installed connection - reads its live
 *  status, timing and capability state to say what's going on and what to do next.
 *  Recommends, never acts. Used by both the manage view and the reconnect view. */
function installedBrief(i: Integration, caps: Capability[]): { lead: string; body: React.ReactNode } {
  // --- broken / attention states (these open the reconnect flow) ---
  if (i.status === 'error')
    return {
      lead: 'Connection failed',
      body: (
        <>
          The last credentials were rejected, so {i.name} isn’t mapping into the graph right now. Re-enter them below to
          restore it - your scope configuration is preserved.
        </>
      ),
    }
  if (i.status === 'degraded')
    return {
      lead: 'Running degraded',
      body: (
        <>
          Some scopes stopped returning data about 3 hours ago, so risk context from {i.name} is only partial.
          Re-authenticate below to restore full coverage.
        </>
      ),
    }
  if (i.status === 'needs_attention')
    return {
      lead: 'Data flow paused',
      body:
        i.id === 'sentinel' ? (
          <>The API token expired 6 days ago and sync stopped. Enter a new token below to resume - nothing else changes.</>
        ) : (
          <>This connection stopped syncing and needs re-authentication. Reconnect below; your configuration is kept.</>
        ),
    }
  // --- healthy / connected states (manage view) ---
  if (i.updateAvailable)
    return {
      lead: 'Update available',
      body: (
        <>
          A newer connector is ready{i.version ? ` (you’re on v${i.version})` : ''} and last sync was {i.lastSync ?? 'recent'}.
          Updating keeps detections current - review and apply it below.
        </>
      ),
    }
  const partial = caps.find((c) => c.status === 'partial')
  if (partial)
    return {
      lead: `${partial.name} is partial`,
      body: <>{partial.why} Use “Fix this” below to close the gap - Act re-tests and flips it to Enabled.</>,
    }
  const pending = caps.filter((c) => c.status === 'pending').length
  if (pending)
    return {
      lead: 'Scans warming up',
      body: (
        <>
          {pending} capabilit{pending > 1 ? 'ies are' : 'y is'} configured but hasn’t run yet - no action needed, results
          land after the next cycle.
        </>
      ),
    }
  return {
    lead: 'Healthy',
    body: (
      <>
        Last synced {i.lastSync ?? 'recently'} and every enabled scan is running on schedule. Nothing on this connection
        needs your attention.
      </>
    ),
  }
}

function Success({
  i,
  isManage,
  justConnected,
  optionalCount,
  region,
  onOpenIntegration,
  onDisconnect,
}: {
  i: Integration
  isManage: boolean
  justConnected: boolean
  optionalCount: number
  region: string
  onOpenIntegration?: (id: string) => void
  onDisconnect?: () => void
}) {
  const nextStep = i.copilotNextId && i.copilotNextName

  // Live capability state so the Partial → Fix → Test loop can resolve in-session.
  const [caps, setCaps] = useState<Capability[]>(i.capabilities ?? [])
  const [view, setView] = useState<'main' | 'settings'>('main')
  const [testing, setTesting] = useState(false)
  const [lastTested, setLastTested] = useState<string | null>(null)
  const [audit, setAudit] = useState<AuditEntry[]>(() => [
    { text: 'Permissions granted', when: '2 days ago', who: 'maya.cohen@act.security' },
    {
      text: 'Connector installed',
      when: i.installedAt ?? '2 days ago',
      who: i.connectedBy ?? 'you@act.security',
    },
  ])

  // The panel instance is reused across integrations - resync when it changes.
  useEffect(() => {
    setCaps(i.capabilities ?? [])
    setView('main')
    setTesting(false)
    setLastTested(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i.id])

  const pushAudit = (text: string) =>
    setAudit((a) => [{ text, when: 'just now', who: i.connectedBy ?? 'you@act.security' }, ...a])

  const resolveCap = (name: string) => {
    setCaps((cs) => cs.map((c) => (c.name === name ? { ...c, status: 'enabled', why: enabledWhy(c) } : c)))
    pushAudit(`Capability “${name}” enabled`)
  }

  const setWriteHardening = (on: boolean) => {
    const cap = caps.find((c) => /write|harden/i.test(c.name))
    if (!cap) return
    setCaps((cs) =>
      cs.map((c) =>
        c.name === cap.name
          ? {
              ...c,
              status: on ? 'enabled' : 'pending',
              why: on
                ? enabledWhy(c)
                : 'Disabled by default. Turn on write hardening to let Act enforce least-privilege.',
            }
          : c,
      ),
    )
    pushAudit(on ? 'Write hardening enabled' : 'Write hardening disabled')
  }

  const runTest = () => {
    setTesting(true)
    window.setTimeout(() => {
      setTesting(false)
      setLastTested('just now')
    }, 1100)
  }

  const partialCount = caps.filter((c) => c.status === 'partial').length
  const granted = i.scopes.filter((s) => s.required).length + (isManage ? 1 : optionalCount)
  const writeCap = caps.find((c) => /write|harden/i.test(c.name))

  // ---- Settings sub-screen ----
  if (view === 'settings') {
    return (
      <SettingsView
        i={i}
        region={region}
        writeOn={writeCap?.status === 'enabled'}
        hasWrite={!!writeCap}
        onWriteChange={setWriteHardening}
        onBack={() => setView('main')}
        onDisconnect={onDisconnect}
      />
    )
  }

  return (
    <div className="space-y-5">
      {/* CELEBRATION (just connected) vs MANAGE (returning) header */}
      {justConnected ? (
        <div className="flex flex-col items-center py-2 text-center">
          <SpotIllustration variant="success" size={116} />
          <div className="mt-2 text-base font-semibold" style={{ color: 'var(--text-1)' }}>
            {i.name} connected
          </div>
          <div className="mt-1 text-xs" style={{ color: 'var(--text-3)' }}>
            First sync in progress - data appears in ~5 minutes.
          </div>
        </div>
      ) : (
        <div
          className="flex items-center gap-2.5 rounded-xl p-3"
          style={{
            background: 'color-mix(in srgb, var(--ok) 9%, transparent)',
            border: '1px solid color-mix(in srgb, var(--ok) 24%, transparent)',
          }}
        >
          <ShieldCheck size={18} style={{ color: 'var(--ok)', flexShrink: 0 }} />
          <div className="text-[13px]" style={{ color: 'var(--text-2)' }}>
            <strong style={{ color: 'var(--text-1)' }}>Connected &amp; healthy.</strong>{' '}
            {i.lastSync ? `Last synced ${i.lastSync}.` : 'Syncing on schedule.'}
          </div>
          {i.status === 'connected' && !i.updateAvailable && (
            <div className="ml-auto shrink-0">
              <AllSyncedBadge />
            </div>
          )}
        </div>
      )}

      {/* Setup Copilot - manage view: contextual insight for this installed connection */}
      {!justConnected && (() => {
        const tip = installedBrief(i, caps)
        return (
          <CopilotTip>
            <span className="font-semibold" style={{ color: 'var(--text-1)' }}>
              {tip.lead}.
            </span>{' '}
            {tip.body}
          </CopilotTip>
        )
      })()}

      {/* Setup Copilot - only on the celebration, guiding the next foundation step */}
      {justConnected && nextStep && (
        <CopilotTip>
          {i.name} is connected and syncing. To complete the{' '}
          <strong style={{ color: 'var(--text-1)' }}>Foundation</strong> layer, connect{' '}
          <strong style={{ color: 'var(--text-1)' }}>{i.copilotNextName}</strong> next.
          <div className="mt-2.5 flex flex-wrap gap-2">
            <button
              onClick={() => i.copilotNextId && onOpenIntegration?.(i.copilotNextId)}
              className="btn-primary btn px-3 py-1.5 text-xs"
            >
              Connect {i.copilotNextName}
              <ArrowRight size={13} />
            </button>
            <button className="btn-ghost btn px-3 py-1.5 text-xs">
              <Activity size={13} /> View sync details
            </button>
          </div>
        </CopilotTip>
      )}

      {caps.length > 0 && (
        <CapabilityTable
          caps={caps}
          onResolve={resolveCap}
          testing={testing}
          lastTested={lastTested}
          partialCount={partialCount}
        />
      )}

      {/* Connector lifecycle - manage view only */}
      {!justConnected && i.version && (
        <div className="rounded-xl p-4" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
          <div className="mb-2.5 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-3)' }}>
            Connector lifecycle
          </div>
          <dl className="space-y-2 text-[13px]">
            <OwnRow label="Version" value={`v${i.version}`} />
            {i.installedAt && <OwnRow label="Installed" value={i.installedAt} />}
            {i.lastModified && <OwnRow label="Last modified" value={i.lastModified} />}
          </dl>
          {i.updateAvailable && (
            <div
              className="mt-3 flex items-center gap-2.5 rounded-lg p-2.5"
              style={{
                background: 'color-mix(in srgb, var(--info) 10%, transparent)',
                border: '1px solid color-mix(in srgb, var(--info) 28%, transparent)',
              }}
            >
              <RefreshCw size={14} style={{ color: 'var(--info)', flexShrink: 0 }} />
              <span className="flex-1 text-xs" style={{ color: 'var(--text-2)' }}>
                <strong style={{ color: 'var(--text-1)' }}>Update available.</strong> Connector{' '}
                <span className="mono">v{i.version}</span> → <span className="mono">v{bumpVersion(i.version!)}</span> adds
                permissions for richer context.
              </span>
              <button className="btn-ghost btn px-2.5 py-1 text-[11px]">
                <RefreshCw size={11} /> Update
              </button>
            </div>
          )}
        </div>
      )}

      <div className="rounded-xl p-4" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
        <div className="mb-2.5 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-3)' }}>
          What happens next
        </div>
        <ul className="space-y-2 text-[13px]" style={{ color: 'var(--text-2)' }}>
          <li className="flex gap-2">
            <Zap size={15} style={{ color: 'var(--accent-strong)', marginTop: 1 }} />
            {i.enables}
          </li>
          <li className="flex gap-2">
            <Activity size={15} style={{ color: 'var(--info)', marginTop: 1 }} />
            Connection health is monitored - Act flags it if data stops flowing.
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <Meta label="Status" value={isManage ? 'Connected' : 'Syncing'} tone={isManage ? 'var(--ok)' : 'var(--info)'} />
        <Meta label="Permissions" value={`${granted} granted`} />
        <Meta label="Connected by" value={i.connectedBy ?? 'you@act.security'} />
        <Meta label="Region" value={i.authType === 'aws-role' ? region : 'EU (Frankfurt)'} />
      </div>

      {/* Ownership & audit - manage view only, with a live activity trail */}
      {!justConnected && <OwnershipAudit i={i} audit={audit} />}

      {/* Primary management actions */}
      <div className="flex flex-wrap gap-2">
        <button onClick={runTest} disabled={testing} className="btn-ghost btn px-3 py-2 text-xs">
          {testing ? <Spinner color="var(--text-2)" /> : <RefreshCw size={13} />}
          {testing ? 'Testing…' : 'Test connection'}
        </button>
        <button onClick={() => setView('settings')} className="btn-ghost btn px-3 py-2 text-xs">
          <Settings2 size={13} /> Settings
        </button>
      </div>
    </div>
  )
}

function OwnershipAudit({ i, audit }: { i: Integration; audit: AuditEntry[] }) {
  return (
    <div className="rounded-xl p-4" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
      <div className="mb-2.5 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-3)' }}>
        Ownership &amp; audit
      </div>
      <dl className="space-y-2 text-[13px]">
        <OwnRow label="Owner" value={i.connectedBy ?? 'you@act.security'} />
        <OwnRow
          label="Required role"
          value={i.requiredRole ?? (i.authType === 'aws-role' ? 'AWS account admin' : 'Workspace / org admin')}
        />
        <OwnRow label="Can edit / revoke" value="Security admins" />
      </dl>

      {/* audit trail - the strongest enterprise trust signal: who changed what, when */}
      <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
        <div
          className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide"
          style={{ color: 'var(--text-3)' }}
        >
          <History size={12} /> Recent activity
        </div>
        <ul className="space-y-2">
          {audit.slice(0, 4).map((e, idx) => (
            <li key={`${e.text}-${idx}`} className="flex gap-2.5 text-[12px]">
              <span
                style={{
                  marginTop: 5,
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: idx === 0 ? 'var(--accent)' : 'var(--text-3)',
                  flexShrink: 0,
                }}
              />
              <div className="min-w-0">
                <div style={{ color: 'var(--text-1)' }}>{e.text}</div>
                <div style={{ color: 'var(--text-3)' }}>
                  {e.when} · {e.who}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function SettingsView({
  i,
  region,
  writeOn,
  hasWrite,
  onWriteChange,
  onBack,
  onDisconnect,
}: {
  i: Integration
  region: string
  writeOn: boolean
  hasWrite: boolean
  onWriteChange: (on: boolean) => void
  onBack: () => void
  onDisconnect?: () => void
}) {
  const isAws = i.authType === 'aws-role'
  const [reg, setReg] = useState(region)
  const [freq, setFreq] = useState('Every 5 minutes')
  const [confirmRevoke, setConfirmRevoke] = useState(false)

  return (
    <div className="space-y-5">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold"
        style={{ color: 'var(--text-2)' }}
      >
        <ArrowLeft size={13} /> Back to overview
      </button>

      <div>
        <h3 className="text-base font-semibold" style={{ color: 'var(--text-1)' }}>
          Connection settings
        </h3>
        <p className="mt-0.5 text-xs" style={{ color: 'var(--text-3)' }}>
          Tune how Act reads from {i.name}.
        </p>
      </div>

      {isAws && (
        <SettingField label="Region" hint="Where Act processes data from this connection.">
          <select className="field" value={reg} onChange={(e) => setReg(e.target.value)}>
            {AWS_REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </SettingField>
      )}

      <SettingField label="Sync frequency" hint="How often Act refreshes data from this source.">
        <select className="field" value={freq} onChange={(e) => setFreq(e.target.value)}>
          {['Every 5 minutes', 'Every 15 minutes', 'Hourly', 'Every 6 hours'].map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </SettingField>

      {hasWrite && (
        <ToggleRow
          title="Write hardening"
          desc="Let Act apply least-privilege fixes through native controls. Off = recommendations only."
          on={writeOn}
          onChange={onWriteChange}
        />
      )}

      {/* Danger zone - the canonical home for revoke */}
      <div
        className="rounded-xl p-4"
        style={{
          background: 'color-mix(in srgb, var(--danger) 6%, transparent)',
          border: '1px solid color-mix(in srgb, var(--danger) 35%, var(--border))',
        }}
      >
        <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--danger)' }}>
          Danger zone
        </div>
        <p className="mt-1.5 text-[13px] leading-snug" style={{ color: 'var(--text-2)' }}>
          Disconnecting revokes Act&apos;s access and stops all syncs. Findings already produced are kept.
        </p>
        {!confirmRevoke ? (
          <button onClick={() => setConfirmRevoke(true)} className="btn-danger btn mt-3 text-xs">
            <Ban size={13} /> Disconnect {i.name}
          </button>
        ) : (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs" style={{ color: 'var(--text-2)' }}>
              Are you sure?
            </span>
            <button onClick={onDisconnect} className="btn-danger btn text-xs">
              <Trash2 size={13} /> Yes, disconnect
            </button>
            <button onClick={() => setConfirmRevoke(false)} className="btn-ghost btn text-xs">
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function SettingField({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
      {hint && (
        <p className="mt-1 text-[11px]" style={{ color: 'var(--text-3)' }}>
          {hint}
        </p>
      )}
    </div>
  )
}

function ToggleRow({
  title,
  desc,
  on,
  onChange,
}: {
  title: string
  desc: string
  on: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div
      className="flex items-start justify-between gap-3 rounded-xl p-3.5"
      style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
    >
      <div className="min-w-0">
        <div className="text-[13px] font-semibold" style={{ color: 'var(--text-1)' }}>
          {title}
        </div>
        <div className="mt-0.5 text-[11px] leading-snug" style={{ color: 'var(--text-3)' }}>
          {desc}
        </div>
      </div>
      <button
        role="switch"
        aria-checked={on}
        aria-label={title}
        onClick={() => onChange(!on)}
        className="relative shrink-0 rounded-full transition-colors"
        style={{
          width: 38,
          height: 22,
          background: on ? 'var(--accent)' : 'var(--surface-3)',
          border: '1px solid var(--border)',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 2,
            left: on ? 18 : 2,
            width: 16,
            height: 16,
            borderRadius: 999,
            background: on ? 'var(--accent-ink)' : 'var(--text-3)',
            transition: 'left 0.18s',
          }}
        />
      </button>
    </div>
  )
}

/* ----------------------------- footer ----------------------------- */

function Footer({
  i,
  phase,
  isManage,
  credentialsValid,
  onBack,
  onNext,
  onRetry,
  onClose,
  onDisconnect,
}: {
  i: Integration
  phase: Phase
  isManage: boolean
  credentialsValid: boolean
  onBack: () => void
  onNext: () => void
  onRetry: () => void
  onClose: () => void
  onDisconnect: () => void
}) {
  if (phase === 'success') {
    return (
      <>
        <button onClick={onDisconnect} className="btn-danger btn text-xs">
          <Trash2 size={13} /> Disconnect
        </button>
        <button onClick={onClose} className="btn-primary btn">
          {isManage ? 'Done' : 'Finish'}
        </button>
      </>
    )
  }
  if (phase === 'connecting') {
    return (
      <button disabled className="btn-primary btn ml-auto">
        <Spinner color="var(--accent-ink)" /> Connecting…
      </button>
    )
  }
  if (phase === 'error') {
    return (
      <>
        <span className="text-xs" style={{ color: 'var(--text-3)' }}>
          Fix the permission, then
        </span>
        <button onClick={onRetry} className="btn-primary btn ml-auto">
          <RefreshCw size={14} /> Retry
        </button>
      </>
    )
  }

  const canAdvance = phase === 'overview' || (phase === 'credentials' ? credentialsValid : true)
  const nextLabel =
    phase === 'overview' ? 'Continue' : phase === 'credentials' ? 'Continue' : `Integrate ${i.name}`

  return (
    <>
      {phase !== 'overview' ? (
        <button onClick={onBack} className="btn-ghost btn">
          <ArrowLeft size={15} /> Back
        </button>
      ) : (
        <button onClick={onClose} className="btn-ghost btn">
          Cancel
        </button>
      )}
      <button onClick={onNext} disabled={!canAdvance} className="btn-primary btn ml-auto">
        {phase === 'consent' ? <Plug size={15} /> : null}
        {nextLabel}
        {phase !== 'consent' && <ArrowRight size={15} />}
      </button>
    </>
  )
}

/* ----------------------------- bits ----------------------------- */

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5 text-xs" style={{ color: 'var(--text-2)' }}>
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
        style={{ background: 'var(--surface-3)', color: 'var(--text-2)', border: '1px solid var(--border)' }}
      >
        {n}
      </span>
      <span className="leading-snug">{children}</span>
    </li>
  )
}

function ShowMe() {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="inline-flex items-center gap-1 font-semibold"
      style={{ color: 'var(--info)' }}
    >
      <ExternalLink size={10} /> Show me in AWS
    </a>
  )
}

/** Inline video help. Collapsed: a slim single-line bar (play dot · title ·
 *  duration · chevron). Expanded: the full 16:9 video placeholder. */
function VideoHelp({ method }: { method: 'CloudFormation' | 'Terraform' }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="overflow-hidden rounded-xl"
      style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-2.5 px-3 py-2 text-left transition-colors"
      >
        <span
          className="flex shrink-0 items-center justify-center rounded-full"
          style={{ width: 20, height: 20, background: 'var(--accent)', color: 'var(--accent-ink)' }}
        >
          <Play size={10} fill="currentColor" strokeWidth={0} style={{ marginLeft: 1 }} />
        </span>
        <span className="text-[13px] font-semibold" style={{ color: 'var(--text-1)' }}>
          Watch: deploy with {method}
        </span>
        <span className="chip" style={{ background: 'var(--surface-3)', color: 'var(--text-3)' }}>
          1:48
        </span>
        <ChevronDown
          size={16}
          className="ml-auto shrink-0"
          style={{
            color: 'var(--text-3)',
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.18s',
          }}
        />
      </button>
      {open && (
        <div className="px-3 pb-3">
          <div
            className="relative flex items-center justify-center overflow-hidden rounded-lg"
            style={{ aspectRatio: '16 / 9', background: 'var(--surface-3)', border: '1px solid var(--border)' }}
          >
            <span
              className="flex items-center justify-center rounded-full"
              style={{ width: 48, height: 48, background: 'var(--accent)', color: 'var(--accent-ink)' }}
            >
              <Play size={20} fill="currentColor" strokeWidth={0} style={{ marginLeft: 2 }} />
            </span>
            <span
              className="absolute bottom-2 right-2 text-[10px] font-medium"
              style={{ color: 'var(--text-3)' }}
            >
              Video walkthrough · 1:48
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

function fixSteps(cap: Capability): string[] {
  if (/activity|threat/i.test(cap.name) || cap.permissions.some((p) => /cloudtrail/i.test(p)))
    return [
      'In AWS, open CloudTrail → Trails and create an organization trail.',
      'Apply it to all regions so events are no longer limited to one region.',
      'Re-test below - Act re-reads coverage and flips this to Enabled.',
    ]
  return [
    'Add the missing permission to the role policy in AWS IAM.',
    'Re-test below to verify the capability is now satisfied.',
  ]
}

export function CapabilityTable({
  caps,
  onResolve,
  testing,
  lastTested,
  partialCount,
}: {
  caps: Capability[]
  onResolve: (name: string) => void
  testing: boolean
  lastTested: string | null
  partialCount: number
}) {
  const tone: Record<Capability['status'], { c: string; label: string }> = {
    enabled: { c: 'var(--ok)', label: 'Enabled' },
    partial: { c: 'var(--degraded)', label: 'Partial' },
    pending: { c: 'var(--text-3)', label: 'Pending' },
  }
  const [fixing, setFixing] = useState<string | null>(null)
  const [busy, setBusy] = useState<string | null>(null)

  const confirmFix = (name: string) => {
    setBusy(name)
    window.setTimeout(() => {
      onResolve(name)
      setBusy(null)
      setFixing(null)
    }, 900)
  }

  return (
    <div className="rounded-xl p-4" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
      <div className="mb-1 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-3)' }}>
        Enabled capabilities
      </div>
      <p className="mb-3 text-[11px]" style={{ color: 'var(--text-3)' }}>
        What each capability needs, and whether the granted permissions satisfy it.
      </p>
      <div className="space-y-2.5">
        {caps.map((cap) => {
          const t = tone[cap.status]
          const isPartial = cap.status === 'partial'
          const open = fixing === cap.name
          return (
            <div key={cap.name} className="rounded-lg p-2.5" style={{ background: 'var(--surface-1)', border: '1px solid var(--border)' }}>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[13px] font-semibold" style={{ color: 'var(--text-1)' }}>
                  {cap.name}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: t.c }}>
                  <span style={{ width: 6, height: 6, borderRadius: 999, background: t.c, display: 'inline-block' }} />
                  {t.label}
                </span>
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {cap.permissions.map((p) => (
                  <span key={p} className="mono text-[10px]" style={{ color: 'var(--text-3)', background: 'var(--surface-3)', borderRadius: 5, padding: '1px 6px' }}>
                    {p}
                  </span>
                ))}
              </div>
              <div className="mt-1.5 text-[11px] leading-snug" style={{ color: 'var(--text-2)' }}>
                {cap.why}
              </div>

              {isPartial && !open && (
                <button
                  onClick={() => setFixing(cap.name)}
                  className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold"
                  style={{ color: 'var(--degraded)' }}
                >
                  <Wrench size={12} /> Fix this <ChevronRight size={12} />
                </button>
              )}

              {isPartial && open && (
                <div
                  className="mt-2.5 rounded-lg p-2.5"
                  style={{
                    background: 'color-mix(in srgb, var(--degraded) 9%, transparent)',
                    border: '1px solid color-mix(in srgb, var(--degraded) 30%, transparent)',
                  }}
                >
                  <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--degraded)' }}>
                    How to fix
                  </div>
                  <ol className="space-y-1.5 text-[12px]" style={{ color: 'var(--text-2)' }}>
                    {fixSteps(cap).map((s, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span
                          className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold"
                          style={{ background: 'var(--surface-3)', color: 'var(--text-2)' }}
                        >
                          {idx + 1}
                        </span>
                        <span className="leading-snug">{s}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    <button
                      onClick={() => confirmFix(cap.name)}
                      disabled={busy === cap.name}
                      className="btn-primary btn px-3 py-1.5 text-xs"
                    >
                      {busy === cap.name ? <Spinner color="var(--accent-ink)" /> : <Check size={13} />}
                      {busy === cap.name ? 'Re-testing…' : 'I’ve enabled it - re-test'}
                    </button>
                    <button onClick={() => setFixing(null)} className="btn-ghost btn px-3 py-1.5 text-xs">
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div
        className="mt-3 flex items-center gap-1.5 text-[11px] font-medium"
        style={{ color: partialCount > 0 ? 'var(--degraded)' : 'var(--ok)' }}
      >
        {testing ? (
          <>
            <Spinner color="var(--text-3)" /> <span style={{ color: 'var(--text-3)' }}>Testing connection…</span>
          </>
        ) : partialCount > 0 ? (
          <>
            <AlertTriangle size={12} /> {partialCount} capability needs attention
          </>
        ) : (
          <>
            <Check size={12} /> All capabilities healthy{lastTested ? ` · tested ${lastTested}` : ''}
          </>
        )}
      </div>
    </div>
  )
}

function InfoRow({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <span style={{ color: 'var(--text-3)', marginTop: 2 }}>{icon}</span>
      <div>
        <div className="text-[13px] font-semibold" style={{ color: 'var(--text-1)' }}>
          {title}
        </div>
        <div className="mt-0.5 text-[13px] leading-snug" style={{ color: 'var(--text-2)' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export function Meta({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-lg p-2.5" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
      <div className="text-[10px] uppercase tracking-wide" style={{ color: 'var(--text-3)' }}>
        {label}
      </div>
      <div className="mt-0.5 truncate text-xs font-semibold" style={{ color: tone ?? 'var(--text-1)' }}>
        {value}
      </div>
    </div>
  )
}

function OwnRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt style={{ color: 'var(--text-3)' }}>{label}</dt>
      <dd className="truncate text-right font-medium" style={{ color: 'var(--text-1)' }}>
        {value}
      </dd>
    </div>
  )
}

function Banner({
  tone,
  icon,
  title,
  children,
}: {
  tone: 'warn' | 'danger'
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  const color = tone === 'warn' ? 'var(--warn)' : 'var(--danger)'
  return (
    <div
      className="mb-4 flex gap-3 rounded-xl p-3.5"
      style={{ background: `color-mix(in srgb, ${color} 12%, transparent)`, border: `1px solid color-mix(in srgb, ${color} 30%, transparent)` }}
    >
      <span style={{ color, marginTop: 1 }}>{icon}</span>
      <div>
        <div className="text-[13px] font-semibold" style={{ color: 'var(--text-1)' }}>
          {title}
        </div>
        <div className="mt-0.5 text-xs" style={{ color: 'var(--text-2)' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

/** Suggest the next minor version for the "update available" hint (e.g. 2.1.0 → 2.2.0). */
function bumpVersion(v: string) {
  const parts = v.split('.').map((n) => parseInt(n, 10))
  if (parts.length < 2 || parts.some(Number.isNaN)) return v
  parts[1] += 1
  if (parts.length > 2) parts[2] = 0
  return parts.join('.')
}

export function Spinner({ size = 15, color = 'var(--info)' }: { size?: number; color?: string }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        border: `2px solid color-mix(in srgb, ${color} 30%, transparent)`,
        borderTopColor: color,
        display: 'inline-block',
        animation: 'spin 0.7s linear infinite',
      }}
    />
  )
}
