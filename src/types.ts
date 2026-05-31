export type Layer = 'foundation' | 'context' | 'action'

export type Category =
  | 'Cloud'
  | 'Identity'
  | 'SIEM'
  | 'Ticketing'
  | 'SOAR'
  | 'Comms'
  | 'IaC / CI-CD'

export type AuthType = 'aws-role' | 'oauth' | 'api-token'

export type Status =
  | 'not_connected'
  | 'connecting'
  | 'syncing'
  | 'connected'
  | 'degraded'
  | 'needs_attention'
  | 'error'
  | 'disabled'

export interface Scope {
  id: string
  label: string
  access: 'read' | 'write'
  required: boolean
  description: string
}

/** A product capability the integration unlocks, mapped to the permissions it needs
 *  and whether those permissions are actually satisfied - the honest, granular status. */
export interface Capability {
  name: string
  /** specific permissions / scopes this capability relies on */
  permissions: string[]
  status: 'enabled' | 'partial' | 'pending'
  /** plain-language reason for the current status */
  why: string
}

export type SetupMethod = 'CloudFormation' | 'Terraform'

export interface Integration {
  id: string
  name: string
  category: Category
  layer: Layer
  authType: AuthType
  /** one-line value prop */
  blurb: string
  /** what data Act reads from it */
  reads: string
  /** what this connection powers inside Act */
  enables: string
  scopes: Scope[]
  status: Status
  recommended?: boolean
  lastSync?: string
  connectedBy?: string
  /** least-privilege framing for the trust layer */
  requiredRole?: string
  /** explicit boundaries shown before consent ("Act will never…") */
  neverDoes?: string[]
  /** Setup Copilot's one-line "why this matters / connect-order" insight on the card */
  copilotWhy?: string
  /** Setup Copilot's recommended next integration after this one connects (success step) */
  copilotNextId?: string
  copilotNextName?: string
  /** real-world setup paths (e.g. AWS: CloudFormation / Terraform) */
  setupMethods?: SetupMethod[]
  /** connector version + lifecycle metadata (manage view) */
  version?: string
  updateAvailable?: boolean
  installedAt?: string
  lastModified?: string
  /** capability × permission × status × why matrix (manage view) */
  capabilities?: Capability[]
  /** monogram + brand color for the logo tile */
  mono: string
  color: string
  /** demo: force a permission error on first validation attempt */
  demoError?: boolean
}

export const LAYERS: Record<
  Layer,
  { title: string; kicker: string; plain: string; pair: string; order: number }
> = {
  foundation: {
    title: 'Foundation · Control plane',
    kicker: 'Cloud & identity Act reads and acts on',
    plain: 'Core visibility',
    pair: 'Cloud & Identity',
    order: 1,
  },
  context: {
    title: 'Context · Enrichment',
    kicker: 'SIEM & evidence that sharpen the risk model',
    plain: 'Risk context',
    pair: 'SIEM & Evidence',
    order: 2,
  },
  action: {
    title: 'Action · Workflow',
    kicker: 'Ticketing & remediation Act pushes hardening to',
    plain: 'Response workflow',
    pair: 'Ticketing & Remediation',
    order: 3,
  },
}
