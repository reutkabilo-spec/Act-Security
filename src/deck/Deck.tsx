import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Boxes,
  ShieldCheck,
  Eye,
  GitBranch,
  Network,
  KeyRound,
  Webhook,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Lock,
  ShieldAlert,
  Printer,
  Search,
  Activity,
  Wrench,
  Ban,
  RefreshCw,
  FlaskConical,
  Compass,
} from 'lucide-react'
import { Slide, Kicker, Title, Lead, Hi, Accent, Card, Eyebrow, DECK_TOTAL } from './primitives'
import { ActLogo, ConstructionArt } from '../components/Brand'
import { CopilotMark } from '../components/Copilot'
import { StatusBadge } from '../components/StatusBadge'
import { IntegrationCard } from '../components/IntegrationCard'
import { INTEGRATIONS } from '../data/integrations'
import type { Status } from '../types'

/** Every slide receives its page number from its position in the SLIDES array. */
type SP = { n: number }

/* ---------- Slide 1 · Title ---------- */
function S1({ n }: SP) {
  return (
    <Slide n={n} pad={false}>
      <ConstructionArt
        style={{ position: 'absolute', right: -40, top: 40, width: 560, height: 420, opacity: 0.9 }}
      />
      <div className="slide-pad" style={{ justifyContent: 'center', position: 'relative', zIndex: 2 }}>
        <ActLogo size={30} style={{ marginBottom: 26 }} />
        <Kicker>Senior Product Designer · Home assignment</Kicker>
        <h1
          className="mt-4 font-bold"
          style={{ color: 'var(--text-1)', fontSize: 56, letterSpacing: '-0.03em', lineHeight: 1.03, maxWidth: 760 }}
        >
          Designing the Integrations
          <br />
          page for <span style={{ color: 'var(--brand-red)' }}>Act Security</span>
        </h1>
        <p className="mt-6" style={{ color: 'var(--text-2)', fontSize: 20, lineHeight: 1.5, maxWidth: 680 }}>
          I designed an integration experience that helps a cloud security engineer{' '}
          <Hi>safely activate</Hi> Act's preemptive security value - answering the trust questions{' '}
          <Hi>before</Hi> asking for a single credential.
        </p>
        <div className="mt-9 flex gap-2.5" style={{ fontSize: 14 }}>
          {['Hypotheses, not claims', 'User-trust research', 'Live React prototype', 'Lifecycle & status'].map(
            (t) => (
              <span
                key={t}
                className="chip"
                style={{ background: 'var(--surface-3)', color: 'var(--text-2)', border: '1px solid var(--border)' }}
              >
                {t}
              </span>
            ),
          )}
        </div>
      </div>
    </Slide>
  )
}

/* ---------- Slide 2 · Understanding Act (hypotheses) ---------- */
function S2({ n }: SP) {
  const pts = [
    {
      icon: <Zap size={20} />,
      h: 'Action-oriented, not a dashboard',
      b: 'My hypothesis: Act behaves less like a passive findings dashboard and more like a platform that actively hardens access.',
    },
    {
      icon: <Network size={20} />,
      h: 'Enforcement surface is uncertain',
      b: 'Possible surfaces: cloud-native controls (IAM, network policy), ticketing workflows, or IaC. I designed for several - not one.',
    },
    {
      icon: <ShieldCheck size={20} />,
      h: 'Preemptive posture',
      b: '"Reacting isn\'t enough. Prepare for Cloud Security\'s next act." The one claim Act states out loud - so I anchored to it.',
    },
  ]
  return (
    <Slide n={n}>
      <Kicker>The domain · framed as hypotheses</Kicker>
      <Title>Understanding Act before designing for it</Title>
      <Lead>
        Act is <Hi>stealth and pre-launch</Hi>, so I treated its positioning as{' '}
        <Hi>hypotheses to design against</Hi>, not facts. That discipline - assume less, design for a range -
        is itself a senior-product posture.
      </Lead>
      <div className="mt-8 grid flex-1 grid-cols-3 gap-4">
        {pts.map((p) => (
          <Card key={p.h}>
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
            >
              {p.icon}
            </div>
            <div className="mt-4 text-lg font-semibold" style={{ color: 'var(--text-1)' }}>
              {p.h}
            </div>
            <p className="mt-2 text-sm" style={{ color: 'var(--text-2)', lineHeight: 1.55 }}>
              {p.b}
            </p>
          </Card>
        ))}
      </div>
      <p className="mt-5 text-sm" style={{ color: 'var(--text-3)' }}>
        Signals I triangulated from: the public site, AWS Marketplace, press on the founding team (ex-Medigate,
        ~$60M raised). Where I couldn't verify, I labeled it a hypothesis.
      </p>
    </Slide>
  )
}

/* ---------- Slide 3 · Market shift ---------- */
function S3({ n }: SP) {
  return (
    <Slide n={n}>
      <Kicker>Market research</Kicker>
      <Title>The shift I'm betting on: reactive → preemptive</Title>
      <Lead>
        Legacy cloud security floods teams with alerts after the fact. Act's bet is to{' '}
        <Hi>harden access before</Hi> anything is exploited. If that's right, integrations are how the bet
        gets wired in - which reframes the whole page.
      </Lead>
      <div className="mt-9 grid flex-1 grid-cols-[1fr_auto_1fr] items-center gap-6">
        <Card>
          <Eyebrow color="var(--danger)">Yesterday · React</Eyebrow>
          <ul className="mt-4 space-y-3 text-sm" style={{ color: 'var(--text-2)' }}>
            <li>• Detect → triage → respond, after exposure</li>
            <li>• Integrations = data sources to feed a dashboard</li>
            <li>• Success = more findings, more visibility</li>
            <li>• The page is a passive marketplace of logos</li>
          </ul>
        </Card>
        <ArrowRight size={40} style={{ color: 'var(--brand-red)' }} />
        <Card tone="accent">
          <Eyebrow color="var(--accent)">Act · Preempt</Eyebrow>
          <ul className="mt-4 space-y-3 text-sm" style={{ color: 'var(--text-1)' }}>
            <li>• Map access → harden → prevent the kill chain</li>
            <li>• Integrations = the engine Act reads and acts through</li>
            <li>• Success = least-privilege enforced, paths closed</li>
            <li>• The page is an active control-plane setup</li>
          </ul>
        </Card>
      </div>
    </Slide>
  )
}

/* ---------- Slide 4 · Users ---------- */
function S4({ n }: SP) {
  const users = [
    { h: 'Cloud Security Engineer', tag: 'Primary', b: 'Technical operator. Owns credentials, scopes, connection health. Designs the setup.', primary: true },
    { h: 'CISO', tag: 'Secondary', b: 'Coverage, confidence, risk reduction. Reads status, not config.' },
    { h: 'DevOps / Platform', tag: 'Secondary', b: 'Cloud creds, IaC pipelines, environment scoping.' },
    { h: 'SOC analyst', tag: 'Consumer', b: 'Consumes signal downstream - does not configure integrations.' },
  ]
  return (
    <Slide n={n}>
      <Kicker>Who I designed for</Kicker>
      <Title>The operator who activates value - not a casual browser</Title>
      <Lead>
        The page is for the person <Hi>building the setup</Hi> and putting their name on it. That means:
        technical, precise, trustworthy - never dumbed down.
      </Lead>
      <div className="mt-8 grid flex-1 grid-cols-4 gap-4">
        {users.map((u) => (
          <Card key={u.h} tone={u.primary ? 'accent' : undefined}>
            <span
              className="chip"
              style={{
                background: u.primary ? 'var(--accent-soft)' : 'var(--surface-3)',
                color: u.primary ? 'var(--accent)' : 'var(--text-3)',
                border: '1px solid var(--border)',
              }}
            >
              {u.tag}
            </span>
            <div className="mt-4 text-base font-semibold" style={{ color: 'var(--text-1)' }}>
              {u.h}
            </div>
            <p className="mt-2 text-sm" style={{ color: 'var(--text-2)', lineHeight: 1.5 }}>
              {u.b}
            </p>
          </Card>
        ))}
      </div>
    </Slide>
  )
}

/* ---------- Slide 5 · User reality (high-trust, high-risk) ---------- */
function S5({ n }: SP) {
  const fears = [
    {
      icon: <Lock size={18} />,
      h: 'Permission anxiety',
      b: '“What exactly can it touch? Can it change things? Am I widening my attack surface by connecting a security tool?”',
    },
    {
      icon: <AlertTriangle size={18} />,
      h: 'Setup anxiety',
      b: '“Did I scope this correctly? What breaks if I get a credential or a write scope wrong?”',
    },
    {
      icon: <RefreshCw size={18} />,
      h: 'Recovery anxiety',
      b: '“If this fails, or I revoke it later, what stops working - and will I know in time?”',
    },
  ]
  return (
    <Slide n={n}>
      <Kicker>User reality · the core insight</Kicker>
      <Title>Integration setup is a high-trust, high-risk moment</Title>
      <Lead>
        The operator is handing a security product access to the crown jewels - cloud IAM, identity, network.
        The dominant emotion isn't curiosity, it's <Accent>permission anxiety</Accent>. That insight drove
        every flow decision.
      </Lead>
      <div className="mt-7 grid flex-1 grid-cols-3 gap-4">
        {fears.map((f) => (
          <Card key={f.h} tone="danger" className="flex flex-col">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: 'color-mix(in srgb, var(--danger) 14%, transparent)', color: 'var(--danger)' }}
            >
              {f.icon}
            </div>
            <div className="mt-4 text-base font-semibold" style={{ color: 'var(--text-1)' }}>
              {f.h}
            </div>
            <p className="mt-2 text-sm" style={{ color: 'var(--text-2)', lineHeight: 1.5 }}>
              {f.b}
            </p>
          </Card>
        ))}
      </div>
      <p
        className="mt-6 rounded-xl px-5 py-3 text-center text-base font-semibold"
        style={{ background: 'var(--accent-soft)', color: 'var(--text-1)' }}
      >
        Design principle → answer the trust questions <Accent>before</Accent> asking for a single credential.
      </p>
    </Slide>
  )
}

/* ---------- Slide 6 · Research synthesis ---------- */
function S6({ n }: SP) {
  const rows = [
    { need: 'Know what is accessed before consenting', why: 'Granting cloud access feels irreversible', resp: '“Data Act will access” + “Act will never…” shown on step 1, pre-credentials' },
    { need: 'Least privilege by default', why: 'Write access widens blast radius', resp: 'Read-only recommended; write scopes optional and off by default' },
    { need: 'Confidence it is wired correctly', why: 'Silent misconfig = security blind spot', resp: 'Test connection before enabling; “Connected” means data is flowing' },
    { need: 'Safe recovery', why: 'Fear of breaking production', resp: 'Disconnect names what stops; revoke anytime; reconnect keeps config' },
    { need: 'Accountability', why: 'Enterprise & audit requirements', resp: 'Owner, required role, last permission change, audit log per integration' },
  ]
  return (
    <Slide n={n}>
      <Kicker>User-research synthesis</Kicker>
      <Title>From trust needs to concrete design responses</Title>
      <Lead>
        I turned the anxiety above into a needs table - each need maps to a specific affordance you can see in
        the live prototype.
      </Lead>
      <div className="mt-6 flex-1 overflow-hidden rounded-2xl" style={{ border: '1px solid var(--border)' }}>
        <div className="grid grid-cols-[1.1fr_1fr_1.4fr]" style={{ background: 'var(--surface-3)' }}>
          {['User need', 'Why it matters', 'My design response'].map((h, idx) => (
            <div
              key={h}
              className="px-5 py-2.5 text-xs font-bold"
              style={{ color: idx === 2 ? 'var(--accent)' : 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              {h}
            </div>
          ))}
        </div>
        {rows.map((r, idx) => (
          <div
            key={r.need}
            className="grid grid-cols-[1.1fr_1fr_1.4fr] items-center"
            style={{ borderTop: '1px solid var(--border)', background: idx % 2 ? 'transparent' : 'color-mix(in srgb, var(--surface-3) 35%, transparent)' }}
          >
            <div className="px-5 py-3 text-[13px] font-semibold" style={{ color: 'var(--text-1)' }}>{r.need}</div>
            <div className="px-5 py-3 text-[13px]" style={{ color: 'var(--text-3)' }}>{r.why}</div>
            <div className="px-5 py-3 text-[13px]" style={{ color: 'var(--text-2)' }}>{r.resp}</div>
          </div>
        ))}
      </div>
    </Slide>
  )
}

/* ---------- Slide 7 · Competitive teardown (expanded) ---------- */
function S7({ n }: SP) {
  const rows = [
    { co: 'Wiz', took: 'Frame integrations as ecosystem value / risk-reduction, not a logo wall' },
    { co: 'Orca', took: 'Dual taxonomy - product layer + technical category - so the catalog reads two ways' },
    { co: 'Microsoft Sentinel', took: 'Connector-health model → my richer status set (Connected = data flowing)' },
    { co: 'Prisma Cloud / Cortex', took: 'Cloud-onboarding confidence: show what gets created, read-only vs write, CFN/Terraform/Manual, blast radius' },
    { co: 'ServiceNow', took: 'Roles, ownership & audit trail on every connection' },
    { co: 'Okta', took: 'Catalog discovery, search, “request / custom integration”' },
    { co: 'Datadog', took: 'OAuth vs API keys, test / revoke / rotate, “token shown once”, least privilege' },
  ]
  return (
    <Slide n={n}>
      <Kicker>Competitive teardown · evidence</Kicker>
      <Title>Seven products studied - one specific lesson taken from each</Title>
      <Lead>
        I didn't copy a layout; I borrowed the <Hi>right pattern for an action-first, high-trust</Hi> product
        and left the dashboard-first habits behind.
      </Lead>
      <div className="mt-5 flex-1 overflow-hidden rounded-2xl" style={{ border: '1px solid var(--border)' }}>
        <div className="grid grid-cols-[200px_1fr]" style={{ background: 'var(--surface-3)' }}>
          {['Product', 'The lesson I took'].map((h) => (
            <div key={h} className="px-5 py-2 text-xs font-bold" style={{ color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {h}
            </div>
          ))}
        </div>
        {rows.map((r, idx) => (
          <div
            key={r.co}
            className="grid grid-cols-[200px_1fr] items-center"
            style={{ borderTop: '1px solid var(--border)', background: idx % 2 ? 'transparent' : 'color-mix(in srgb, var(--surface-3) 35%, transparent)' }}
          >
            <div className="px-5 py-2.5 text-[13px] font-semibold" style={{ color: 'var(--text-1)' }}>{r.co}</div>
            <div className="px-5 py-2.5 text-[13px]" style={{ color: 'var(--text-2)' }}>{r.took}</div>
          </div>
        ))}
      </div>
    </Slide>
  )
}

/* ---------- Slide 8 · The thesis ---------- */
function S8({ n }: SP) {
  const layers = [
    { n: 1, icon: <Boxes size={20} />, h: 'Core visibility', sub: 'Cloud & Identity', b: 'What Act must read & act on', ex: 'AWS · Okta · Entra ID' },
    { n: 2, icon: <Eye size={20} />, h: 'Risk context', sub: 'SIEM & Evidence', b: 'What sharpens the risk model', ex: 'Splunk · Sentinel · Elastic' },
    { n: 3, icon: <GitBranch size={20} />, h: 'Response workflow', sub: 'Ticketing & Remediation', b: 'Where Act pushes hardening', ex: 'Jira · Slack · XSOAR · Terraform' },
  ]
  return (
    <Slide n={n}>
      <Kicker>The thesis - the slide that sells it</Kicker>
      <Title>Integrations aren't a marketplace. They're the engine.</Title>
      <Lead>
        If Act models access and enforces through native controls + IaC, the page earns a defensible{' '}
        <Accent>3-layer hierarchy</Accent> that doubles as a setup path - each layer labeled in plain terms.
      </Lead>
      <div className="mt-8 grid flex-1 grid-cols-3 gap-4">
        {layers.map((l, i) => (
          <Card key={l.n} tone={i === 0 ? 'accent' : undefined} className="flex flex-col">
            <div className="flex items-center gap-3">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold"
                style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
              >
                {l.n}
              </span>
              <span style={{ color: 'var(--accent)' }}>{l.icon}</span>
            </div>
            <div className="mt-4 text-lg font-semibold" style={{ color: 'var(--text-1)' }}>{l.h}</div>
            <div className="text-sm font-medium" style={{ color: 'var(--brand-red)' }}>{l.sub}</div>
            <div className="mt-1 text-sm" style={{ color: 'var(--text-3)' }}>{l.b}</div>
            <div className="mt-auto pt-5 text-sm font-medium" style={{ color: 'var(--text-2)' }}>{l.ex}</div>
          </Card>
        ))}
      </div>
      <p className="mt-6 text-center text-base font-semibold" style={{ color: 'var(--text-1)' }}>
        Connect core visibility <span style={{ color: 'var(--text-3)' }}>→</span> add risk context{' '}
        <span style={{ color: 'var(--text-3)' }}>→</span> wire up response.
      </p>
    </Slide>
  )
}

/* ---------- Slide 9 · Integration lifecycle ---------- */
function LifeStep({ icon, label, sub, hot }: { icon: React.ReactNode; label: string; sub: string; hot?: boolean }) {
  return (
    <div className="flex flex-1 flex-col items-center text-center">
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl"
        style={{
          background: hot ? 'var(--accent)' : 'var(--surface-3)',
          color: hot ? 'var(--accent-ink)' : 'var(--text-2)',
          border: hot ? 'none' : '1px solid var(--border)',
        }}
      >
        {icon}
      </div>
      <div className="mt-2.5 text-[13px] font-semibold" style={{ color: 'var(--text-1)' }}>{label}</div>
      <div className="mt-0.5 text-[11px] leading-tight" style={{ color: 'var(--text-3)' }}>{sub}</div>
    </div>
  )
}
function S9({ n }: SP) {
  const steps = [
    { icon: <Search size={20} />, label: 'Discover', sub: 'Catalog, search, layers' },
    { icon: <Compass size={20} />, label: 'Evaluate', sub: 'What it reads & unlocks' },
    { icon: <KeyRound size={20} />, label: 'Connect', sub: 'Auth by type', hot: true },
    { icon: <Lock size={20} />, label: 'Consent', sub: 'Scopes, least-privilege', hot: true },
    { icon: <FlaskConical size={20} />, label: 'Test', sub: 'Validate before enable', hot: true },
    { icon: <RefreshCw size={20} />, label: 'Sync', sub: 'First data pull' },
    { icon: <Activity size={20} />, label: 'Monitor', sub: 'Health, “data flowing”' },
    { icon: <Wrench size={20} />, label: 'Fix / Reauth', sub: 'Recover safely' },
  ]
  return (
    <Slide n={n}>
      <Kicker>The full lifecycle</Kicker>
      <Title>I designed the whole lifecycle - not just a 4-step wizard</Title>
      <Lead>
        A connect wizard is the middle of a longer story. Orientation comes from showing the operator{' '}
        <Hi>where they are</Hi> in a connection's life - from discovery to recovery.
      </Lead>
      <div className="mt-9 flex flex-1 items-center">
        <div className="flex w-full items-start">
          {steps.map((s, i) => (
            <div key={s.label} className="flex flex-1 items-start">
              <LifeStep {...s} />
              {i < steps.length - 1 && (
                <ArrowRight size={16} style={{ color: 'var(--border-strong)', marginTop: 16, flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex items-center justify-center gap-6 text-xs" style={{ color: 'var(--text-3)' }}>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded" style={{ background: 'var(--accent)' }} /> The guided connect flow
          (this assignment's focus)
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded" style={{ background: 'var(--surface-3)', border: '1px solid var(--border)' }} />{' '}
          Surrounding lifecycle the page also has to hold
        </span>
      </div>
    </Slide>
  )
}

/* ---------- Slide 10 · IA & integration map (real cards) ---------- */
function S10({ n }: SP) {
  const picks = INTEGRATIONS.filter((i) => ['aws', 'okta', 'splunk', 'jira'].includes(i.id)).slice(0, 4)
  const sample = picks.length ? picks : INTEGRATIONS.slice(0, 4)
  return (
    <Slide n={n}>
      <Kicker>Information architecture</Kicker>
      <Title>The map turns "what can I connect?" into "what first, and why?"</Title>
      <Lead>
        A setup-progress strip per layer gives <Hi>orientation</Hi>; "Needs attention" floats to the top; the
        catalog is grouped by the 3 layers, not an alphabetical wall of logos.
      </Lead>
      <div className="mt-7 grid flex-1 grid-cols-4 gap-4" style={{ alignContent: 'start' }}>
        {sample.map((i) => (
          <div key={i.id} className="pointer-events-none">
            <IntegrationCard integration={i} onOpen={() => {}} />
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm" style={{ color: 'var(--text-3)' }}>
        Real components from the live prototype - same cards, statuses and tokens used in product.
      </p>
    </Slide>
  )
}

/* ---------- Slide 11 · The flow ---------- */
function MiniStep({ n, label, active }: { n: number; label: string; active?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
        style={{
          border: `1.5px solid ${active ? 'var(--accent)' : 'var(--border-strong)'}`,
          color: active ? 'var(--accent)' : 'var(--text-3)',
        }}
      >
        {n}
      </span>
      <span className="text-[11px] font-semibold" style={{ color: active ? 'var(--text-1)' : 'var(--text-3)' }}>
        {label}
      </span>
    </div>
  )
}
function PanelStill({
  step,
  title,
  icon,
  children,
}: {
  step: number
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  const steps = ['Select', 'Credentials', 'Consent', 'Done']
  return (
    <div className="surface flex flex-col rounded-xl p-4" style={{ background: 'var(--surface-2)' }}>
      <div className="flex items-center gap-2">
        <span style={{ color: 'var(--accent)' }}>{icon}</span>
        <span className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>{title}</span>
      </div>
      <div className="mt-3 flex items-center gap-2">
        {steps.map((s, i) => (
          <MiniStep key={s} n={i + 1} label={s} active={i + 1 === step} />
        ))}
      </div>
      <div className="mt-3 text-xs" style={{ color: 'var(--text-2)', lineHeight: 1.5 }}>
        {children}
      </div>
    </div>
  )
}
function S11({ n }: SP) {
  return (
    <Slide n={n}>
      <Kicker>The connect flow</Kicker>
      <Title>Select → Credentials → Consent → Integrate</Title>
      <Lead>
        Every step is built to <Hi>defuse permission anxiety</Hi>. Credentials branch by auth type; a right
        side-panel keeps the catalog in context the whole way.
      </Lead>
      <div className="mt-7 grid flex-1 grid-cols-4 gap-3">
        <PanelStill step={1} title="Select" icon={<Boxes size={16} />}>
          <Hi>Trust before credentials.</Hi> Data Act will access, <Hi>“Act will never…”</Hi>, read-only
          recommended, and the required role - shown before asking for anything.
        </PanelStill>
        <PanelStill step={2} title="Credentials" icon={<KeyRound size={16} />}>
          AWS = <Hi>cross-account IAM role</Hi> (CloudFormation + External ID). SaaS = <Hi>OAuth</Hi>. SIEM =
          API token + endpoint. "Where do I find this?" helpers.
        </PanelStill>
        <PanelStill step={3} title="Consent" icon={<Lock size={16} />}>
          Scopes grouped <Hi>read vs write</Hi> with the reason for each. Least-privilege default; optional
          scopes toggle off; <Hi>test before enabling</Hi>; revoke anytime.
        </PanelStill>
        <PanelStill step={4} title="Integrate" icon={<CheckCircle2 size={16} />}>
          Success + <Hi>what happens next</Hi> + ownership & audit (owner, role, last change). Test / Settings /
          Disconnect that names what stops.
        </PanelStill>
      </div>
    </Slide>
  )
}

/* ---------- Slide 12 · Status & error model (expanded) ---------- */
function S12({ n }: SP) {
  const statuses: { s: Status; note: string }[] = [
    { s: 'not_connected', note: 'Available to set up' },
    { s: 'syncing', note: 'First data pull in progress' },
    { s: 'connected', note: '"Last synced 4m ago" - data flowing' },
    { s: 'degraded', note: 'Partial - some scopes stopped returning data' },
    { s: 'needs_attention', note: 'Re-auth / missing scope / stale' },
    { s: 'error', note: 'Validation failed - named cause + fix' },
    { s: 'disabled', note: 'Configured but paused by an admin' },
  ]
  return (
    <Slide n={n}>
      <Kicker>Status & error model</Kicker>
      <Title>"Connected" must mean data is flowing - not "saved"</Title>
      <Lead>
        Borrowed from Sentinel's connector health: a connection <Hi>auto-degrades</Hi> when data thins out.
        Seven honest states, and every failure names the cause and the fix.
      </Lead>
      <div className="mt-6 grid flex-1 grid-cols-[1fr_1fr] gap-5">
        <Card>
          <Eyebrow>Seven states</Eyebrow>
          <div className="mt-3.5 flex flex-col gap-2.5">
            {statuses.map((x) => (
              <div key={x.s} className="flex items-center gap-3">
                <StatusBadge status={x.s} />
                <span className="text-[13px]" style={{ color: 'var(--text-2)' }}>{x.note}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card tone="danger">
          <Eyebrow color="var(--danger)">Recovery by failure type</Eyebrow>
          <ul className="mt-4 space-y-3 text-sm" style={{ color: 'var(--text-2)', lineHeight: 1.45 }}>
            <li><Hi>Auth failure</Hi> → inline field error + docs link, no reload.</li>
            <li><Hi>Expired token</Hi> → "Needs attention" + one-click Reconnect (keeps config).</li>
            <li><Hi>Missing permission</Hi> → names it: <span className="mono" style={{ color: 'var(--danger)' }}>iam:ListRoles</span> + copyable policy + Retry.</li>
            <li><Hi>Degraded</Hi> → flags which scopes thinned out before data goes fully stale.</li>
            <li><Hi>Disconnect</Hi> → confirms what stops (which campaigns) before teardown.</li>
          </ul>
        </Card>
      </div>
    </Slide>
  )
}

/* ---------- Slide 13 · UI screens (screenshots) ---------- */
const SHOTS = [
  { src: '/shots/catalog-dark.png', cap: 'Catalog · layered + setup-progress strip' },
  { src: '/shots/aws-consent.png', cap: 'Consent · read vs write, least-privilege' },
  { src: '/shots/aws-error.png', cap: 'Error · names the missing permission + fix' },
  { src: '/shots/aws-success.png', cap: 'Connected · what happens next + audit' },
]
function S13({ n }: SP) {
  return (
    <Slide n={n}>
      <Kicker>The design · UI</Kicker>
      <Title>The prototype, in four moments</Title>
      <div className="mt-6 grid flex-1 grid-cols-2 grid-rows-2 gap-4">
        {SHOTS.map((s) => (
          <div key={s.src} className="surface flex flex-col overflow-hidden rounded-xl">
            <div className="flex-1 overflow-hidden" style={{ background: 'var(--bg)' }}>
              <img
                src={s.src}
                alt={s.cap}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top left' }}
              />
            </div>
            <div className="px-4 py-2.5 text-xs font-medium" style={{ color: 'var(--text-2)', borderTop: '1px solid var(--border)' }}>
              {s.cap}
            </div>
          </div>
        ))}
      </div>
    </Slide>
  )
}

/* ---------- Slide 14 · Design link ---------- */
function S14({ n }: SP) {
  return (
    <Slide n={n} pad={false}>
      <ConstructionArt
        style={{ position: 'absolute', right: -60, bottom: -40, width: 460, height: 360, opacity: 0.6 }}
      />
      <div className="slide-pad" style={{ justifyContent: 'center', position: 'relative', zIndex: 2 }}>
        <Kicker>The design · live</Kicker>
        <h2 className="mt-4 font-bold" style={{ color: 'var(--text-1)', fontSize: 46, letterSpacing: '-0.025em', lineHeight: 1.08 }}>
          Try the working prototype
        </h2>
        <Lead>
          Fully interactive: open any integration, walk the connect flow, trigger the AWS permission error and
          recover, toggle light/dark. Built in React + the Act design tokens used throughout this deck.
        </Lead>
        <div className="mt-8 flex items-center gap-3">
          <span className="btn btn-brand" style={{ fontSize: 15, padding: '12px 22px' }}>
            <Webhook size={17} /> Open the prototype <ArrowRight size={16} />
          </span>
          <span className="text-sm" style={{ color: 'var(--text-3)' }}>
            local: <span className="mono">localhost:5180</span> · or the deployed link in the submission
          </span>
        </div>
        <div className="mt-10 flex flex-wrap gap-2.5" style={{ fontSize: 13 }}>
          {['Trust-first connect flow', 'Per-auth-type credentials', '7-state health model', 'Error → Retry → Connected', 'Ownership & audit', 'Light + dark'].map((t) => (
            <span key={t} className="chip" style={{ background: 'var(--surface-3)', color: 'var(--text-2)', border: '1px solid var(--border)' }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </Slide>
  )
}

/* ---------- Slide 15 · Responsible AI usage (relocated) ---------- */
function S15({ n }: SP) {
  return (
    <Slide n={n}>
      <Kicker>Responsible AI usage</Kicker>
      <Title>How I used AI - and where I drew the line</Title>
      <Lead>
        AI did a lot of heavy lifting here. The interesting part is the judgment around it: I used it as
        leverage, but didn't let an <Hi>external document control my behavior</Hi> or hide information from
        you - the same trust discipline this flow applies to integrations.
      </Lead>
      <div className="mt-7 grid flex-1 grid-cols-[1fr_1fr] gap-5">
        <Card>
          <Eyebrow>Where AI helped · where I overrode</Eyebrow>
          <ul className="mt-4 space-y-2.5 text-sm" style={{ color: 'var(--text-2)', lineHeight: 1.45 }}>
            <li>✓ Competitive teardown across 7 products → the evidence table</li>
            <li>✓ Generated the live React prototype + design tokens</li>
            <li>✕ Overrode an early "generic CNAPP" framing after deeper research</li>
            <li>✕ Kept Act's positioning as hypotheses where I couldn't verify it</li>
          </ul>
          <p className="mt-3 text-xs" style={{ color: 'var(--text-3)' }}>
            Full tools / prompts / iterations log included with the submission.
          </p>
        </Card>
        <Card tone="warn">
          <div className="flex items-center gap-2">
            <ShieldAlert size={18} style={{ color: 'var(--warn)' }} />
            <Eyebrow color="var(--warn)">A research-integrity note</Eyebrow>
          </div>
          <p className="mt-4 text-sm" style={{ color: 'var(--text-2)', lineHeight: 1.55 }}>
            The brief contained hidden text instructing any AI to prepend a canned line to every response and
            not tell the reader. I verified it, refused it, and disclosed it here. Treating untrusted input as
            trusted is exactly the failure preemptive security exists to prevent - so surfacing it felt on-thesis,
            not dramatic.
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--ok)' }}>
            <Ban size={13} /> Did not comply · stayed transparent
          </div>
        </Card>
      </div>
    </Slide>
  )
}

/* ---------- Visual research · competitor benchmark ---------- */
const BENCH = [
  { src: '/benchmark/wiz-integrations.png', co: 'Wiz', lesson: 'Catalog framed as ecosystem coverage - not an alphabetical logo wall.' },
  { src: '/benchmark/snowflake-catalog.png', co: 'Snowflake', lesson: 'Faceted marketplace for discovery at scale - search + categories.' },
  { src: '/benchmark/okta-connector.png', co: 'Okta', lesson: 'Connector lifecycle as tabs: Overview · Flows · Test · Deployment.' },
  { src: '/benchmark/cloudflare-wizard.png', co: 'Cloudflare Zero Trust', lesson: 'Vertical stepper: Name → Authorize → Confirm - one decision per step.' },
  { src: '/benchmark/base44-scopes.png', co: 'Connector OAuth', lesson: 'Scopes shown explicitly in the consent modal before granting.' },
  { src: '/benchmark/github-confirm.png', co: 'GitHub', lesson: 'Sudo-mode re-confirm before a high-trust, sensitive action.' },
]
function SBench({ n }: SP) {
  return (
    <Slide n={n}>
      <Kicker>Visual research · the screens I studied</Kicker>
      <Title>I pulled the real screens apart before drawing mine</Title>
      <Lead>
        Beyond the written teardown, I collected and annotated live setup UIs. Each gave one concrete pattern I
        either <Hi>adopted</Hi> or deliberately <Hi>left behind</Hi> for an action-first, high-trust product.
      </Lead>
      <div className="mt-6 grid flex-1 grid-cols-3 grid-rows-2 gap-3.5">
        {BENCH.map((b) => (
          <div key={b.src} className="surface flex flex-col overflow-hidden rounded-xl">
            <div className="flex-1 overflow-hidden" style={{ background: 'var(--bg)' }}>
              <img
                src={b.src}
                alt={`${b.co} integration UI`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top left' }}
              />
            </div>
            <div className="px-3.5 py-2.5" style={{ borderTop: '1px solid var(--border)' }}>
              <div className="text-[12px] font-bold" style={{ color: 'var(--brand-red)' }}>{b.co}</div>
              <div className="mt-0.5 text-[11px] leading-snug" style={{ color: 'var(--text-2)' }}>{b.lesson}</div>
            </div>
          </div>
        ))}
      </div>
    </Slide>
  )
}

/* ---------- Setup Copilot · where AI helps in the product ---------- */
function SCopilot({ n }: SP) {
  const dos = [
    'Recommend what to connect first, from real coverage',
    'Explain what each permission unlocks, in plain terms',
    'Surface the exact missing scope + a copyable fix',
    'Suggest the next best step - user clicks to proceed',
  ]
  const donts = [
    'Auto-connect or grant scopes on its own',
    'Hide what it’s doing behind a chat bubble',
    'Push writes / remediation without explicit consent',
    'Replace the operator’s judgment on access',
  ]
  return (
    <Slide n={n}>
      <div className="flex items-center gap-2.5">
        <CopilotMark size={26} />
        <Kicker>Where AI helps - in the product</Kicker>
      </div>
      <Title>Guided setup, not autonomous control</Title>
      <Lead>
        I added a <Hi>Setup Copilot</Hi> layer - a contextual assistant, not a floating chatbot. It recommends,
        explains and unblocks; the operator still approves every step. Grounded in how{' '}
        <Hi>Microsoft Security Copilot</Hi>, <Hi>Datadog Bits AI</Hi> and <Hi>Orca</Hi> frame AI as an assistant
        beside a high-trust workflow.
      </Lead>
      <div className="mt-6 grid flex-1 grid-cols-[1fr_1fr] gap-5">
        <Card tone="accent">
          <Eyebrow color="var(--accent)">The Copilot does</Eyebrow>
          <ul className="mt-4 space-y-2.5 text-sm" style={{ color: 'var(--text-2)', lineHeight: 1.45 }}>
            {dos.map((d) => (
              <li key={d} className="flex gap-2">
                <CheckCircle2 size={16} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 1 }} />
                {d}
              </li>
            ))}
          </ul>
        </Card>
        <Card tone="danger">
          <Eyebrow color="var(--danger)">The Copilot never</Eyebrow>
          <ul className="mt-4 space-y-2.5 text-sm" style={{ color: 'var(--text-2)', lineHeight: 1.45 }}>
            {donts.map((d) => (
              <li key={d} className="flex gap-2">
                <Ban size={16} style={{ color: 'var(--danger)', flexShrink: 0, marginTop: 1 }} />
                {d}
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <p
        className="mt-6 rounded-xl px-5 py-3 text-center text-base font-semibold"
        style={{ background: 'var(--accent-soft)', color: 'var(--text-1)' }}
      >
        AI can <Accent>guide and explain</Accent> - but the user stays in control.
      </p>
    </Slide>
  )
}

const SLIDES = [S1, S2, S3, S4, S5, S6, S7, SBench, S8, S9, S10, S11, S12, S13, S14, SCopilot, S15]

export default function Deck() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])
  return (
    <div className="deck">
      <div className="deck-rail">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 700, color: 'var(--text-1)' }}>
          <ActLogo size={15} /> Security - Integrations · deck
        </span>
        <span style={{ color: 'var(--text-3)' }}>{DECK_TOTAL} slides · 16:9</span>
        <div style={{ flex: 1 }} />
        <button
          className="btn btn-ghost"
          style={{ padding: '6px 12px', fontSize: 13 }}
          onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        >
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
        <button
          className="btn btn-brand"
          style={{ padding: '6px 14px', fontSize: 13 }}
          onClick={() => window.print()}
        >
          <Printer size={15} /> Export PDF
        </button>
      </div>
      <div className="deck-spacer" style={{ height: 44 }} />
      {SLIDES.map((S, i) => (
        <S key={i} n={i + 1} />
      ))}
    </div>
  )
}
