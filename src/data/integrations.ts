import type { Integration } from '../types'

/**
 * The prototype tells a story in two acts, switchable from the top bar:
 *
 *  • 'fresh' (Day 0)  - nothing connected yet. Drives the get-started hero.
 *  • 'live'  (Day N)  - Act is wired in: AWS connected, Okta needs an update,
 *                       and the rest spread across the real status spectrum so
 *                       the "Needs attention" triage and every state light up.
 *
 * INTEGRATIONS below is the canonical catalog (rich metadata). buildPreset()
 * derives each act by patching only the status fields - one source of truth.
 */
export type DemoState = 'live' | 'fresh'

export const INTEGRATIONS: Integration[] = [
  /* ---------------- FOUNDATION · control plane ---------------- */
  {
    id: 'aws',
    name: 'Amazon Web Services',
    category: 'Cloud',
    layer: 'foundation',
    authType: 'aws-role',
    blurb: 'Read IAM, network & resource config to map and harden access.',
    reads: 'IAM policies & roles, Security Groups, nACLs, SCPs, VPC config, resource inventory.',
    enables: 'The core access graph. Required before Act can run hardening campaigns.',
    recommended: true,
    status: 'not_connected',
    mono: 'aws',
    color: '#ff9900',
    demoError: true,
    requiredRole: 'AWS account administrator',
    neverDoes: [
      'Read object/data contents inside S3, RDS or other stores',
      'Make changes unless you explicitly enable write hardening',
      'Access accounts outside the role you scope with the External ID',
    ],
    copilotWhy:
      'Foundation integration - connect first. It maps IAM roles, network exposure & cloud resources that every other integration builds on.',
    copilotNextId: 'entra',
    copilotNextName: 'Entra ID',
    setupMethods: ['CloudFormation', 'Terraform'],
    version: '1.33.3',
    updateAvailable: true,
    installedAt: 'Jun 27, 2025',
    lastModified: 'Jun 27, 2025',
    capabilities: [
      {
        name: 'Access & identity mapping',
        permissions: ['iam:ListRoles', 'iam:GetPolicy', 'iam:ListUsers'],
        status: 'enabled',
        why: 'Full visibility into who can reach what across the account.',
      },
      {
        name: 'Network exposure analysis',
        permissions: ['ec2:DescribeSecurityGroups', 'ec2:DescribeVpcs'],
        status: 'enabled',
        why: 'Reachable paths between workloads are modelled.',
      },
      {
        name: 'Activity & threat context',
        permissions: ['cloudtrail:LookupEvents'],
        status: 'partial',
        why: 'CloudTrail is read in one region only - enable org-trail for full coverage.',
      },
      {
        name: 'Access hardening (write)',
        permissions: ['iam:PutRolePolicy'],
        status: 'pending',
        why: 'Disabled by default. Turn on write hardening to let Act enforce least-privilege.',
      },
    ],
    scopes: [
      { id: 'iam-read', label: 'Read IAM roles, policies & users', access: 'read', required: true, description: 'Build the identity access graph.' },
      { id: 'net-read', label: 'Read network config (SG, nACL, VPC)', access: 'read', required: true, description: 'Map reachable paths between workloads.' },
      { id: 'inv-read', label: 'Read resource inventory', access: 'read', required: true, description: 'Discover accounts, workloads & data stores.' },
      { id: 'harden-write', label: 'Apply hardening changes via native controls', access: 'write', required: false, description: 'Let Act enforce least-privilege automatically. Off = recommendations only.' },
    ],
  },
  {
    id: 'okta',
    name: 'Okta',
    category: 'Identity',
    layer: 'foundation',
    authType: 'oauth',
    blurb: 'Enrich the access graph with user, group & entitlement context.',
    reads: 'Users, groups, app assignments, MFA factors, sign-in policies.',
    enables: 'Maps human identities to cloud roles for identity-risk detection.',
    status: 'connected',
    lastSync: '2 min ago',
    connectedBy: 'maya.cohen@act.security',
    mono: 'OK',
    color: '#2196f3',
    copilotWhy:
      'Pairs with your cloud accounts to resolve which humans sit behind each role - the other half of the Foundation layer.',
    version: '2.1.0',
    updateAvailable: true,
    installedAt: 'Jun 23, 2025',
    lastModified: 'Jun 23, 2025',
    capabilities: [
      { name: 'Identity resolution', permissions: ['okta.users.read', 'okta.groups.read'], status: 'enabled', why: 'Cloud roles are mapped to real people & groups.' },
      { name: 'Entitlement scope', permissions: ['okta.apps.read'], status: 'enabled', why: 'App assignments are factored into access risk.' },
      { name: 'Sign-in anomaly correlation', permissions: ['okta.logs.read'], status: 'pending', why: 'Optional system-log scope is off - turn on to correlate sign-ins.' },
    ],
    scopes: [
      { id: 'okta-users', label: 'Read users & groups', access: 'read', required: true, description: 'Resolve identities behind cloud access.' },
      { id: 'okta-apps', label: 'Read app assignments', access: 'read', required: true, description: 'Understand entitlement scope.' },
      { id: 'okta-logs', label: 'Read system log', access: 'read', required: false, description: 'Correlate sign-in anomalies.' },
    ],
  },
  {
    id: 'entra',
    name: 'Microsoft Entra ID',
    category: 'Identity',
    layer: 'foundation',
    authType: 'oauth',
    blurb: 'Identity & access context from Azure AD.',
    reads: 'Directory users, groups, conditional access, role assignments.',
    enables: 'Identity-risk mapping across Microsoft estates.',
    status: 'not_connected',
    mono: 'En',
    color: '#0078d4',
    copilotWhy:
      'Recommended next to complete the Foundation layer - it brings Azure AD identities into the access graph.',
    scopes: [
      { id: 'entra-dir', label: 'Read directory data', access: 'read', required: true, description: 'Users, groups & roles.' },
      { id: 'entra-ca', label: 'Read conditional access policies', access: 'read', required: false, description: 'Evaluate access posture.' },
    ],
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    category: 'Cloud',
    layer: 'foundation',
    authType: 'api-token',
    blurb: 'Cloud resource & network visibility for Azure subscriptions.',
    reads: 'Subscriptions, RBAC, NSGs, resource graph.',
    enables: 'Extends the access graph to Azure workloads.',
    status: 'not_connected',
    mono: 'Az',
    color: '#0089d6',
    scopes: [
      { id: 'az-read', label: 'Read resource graph & RBAC', access: 'read', required: true, description: 'Map Azure access.' },
    ],
  },
  {
    id: 'gcp',
    name: 'Google Cloud',
    category: 'Cloud',
    layer: 'foundation',
    authType: 'oauth',
    blurb: 'IAM & network visibility for GCP projects.',
    reads: 'IAM bindings, VPC, org policy, asset inventory.',
    enables: 'Extends the access graph to GCP.',
    status: 'not_connected',
    mono: 'GC',
    color: '#34a853',
    scopes: [
      { id: 'gcp-iam', label: 'Read IAM & asset inventory', access: 'read', required: true, description: 'Map GCP access.' },
    ],
  },

  /* ---------------- CONTEXT · enrichment ---------------- */
  {
    id: 'splunk',
    name: 'Splunk',
    category: 'SIEM',
    layer: 'context',
    authType: 'api-token',
    blurb: 'Correlate detections & events with the access graph.',
    reads: 'Search results, notable events, index metadata (read-only).',
    enables: 'Adds real-time threat signal to prioritize hardening.',
    status: 'degraded',
    lastSync: '3 hours ago',
    connectedBy: 'ops@act.security',
    mono: 'Sp',
    color: '#65a637',
    copilotWhy:
      'Some saved searches stopped returning data ~3h ago, so risk context is partial. Re-authenticate to restore full signal.',
    scopes: [
      { id: 'splunk-search', label: 'Run saved searches', access: 'read', required: true, description: 'Pull notable events.' },
      { id: 'splunk-meta', label: 'Read index metadata', access: 'read', required: false, description: 'Understand log coverage.' },
    ],
  },
  {
    id: 'sentinel',
    name: 'Microsoft Sentinel',
    category: 'SIEM',
    layer: 'context',
    authType: 'api-token',
    blurb: 'Cloud-native SIEM signal & incident context.',
    reads: 'Incidents, analytics rules, log analytics queries.',
    enables: 'Threat context for Microsoft-centric estates.',
    status: 'needs_attention',
    lastSync: '6 days ago',
    connectedBy: 'ops@act.security',
    mono: 'MS',
    color: '#0078d4',
    copilotWhy:
      'The API token expired 6 days ago and data flow is paused. Enter a new token to resume incident context.',
    scopes: [
      { id: 'sent-read', label: 'Read incidents & analytics', access: 'read', required: true, description: 'Pull incident context.' },
    ],
  },
  {
    id: 'qradar',
    name: 'IBM QRadar',
    category: 'SIEM',
    layer: 'context',
    authType: 'api-token',
    blurb: 'Offense & flow data for correlation.',
    reads: 'Offenses, asset model, flow data.',
    enables: 'Enriches risk scoring with QRadar offenses.',
    status: 'not_connected',
    mono: 'QR',
    color: '#1f70c1',
    scopes: [{ id: 'qr-read', label: 'Read offenses & assets', access: 'read', required: true, description: 'Pull offense context.' }],
  },
  {
    id: 'elastic',
    name: 'Elastic Security',
    category: 'SIEM',
    layer: 'context',
    authType: 'api-token',
    blurb: 'Detections & alerts from the Elastic Stack.',
    reads: 'Detection alerts, indices, rules.',
    enables: 'Adds Elastic detections to the risk model.',
    status: 'not_connected',
    mono: 'El',
    color: '#fec514',
    scopes: [{ id: 'el-read', label: 'Read detection alerts', access: 'read', required: true, description: 'Pull alert context.' }],
  },

  /* ---------------- ACTION · workflow ---------------- */
  {
    id: 'jira',
    name: 'Jira',
    category: 'Ticketing',
    layer: 'action',
    authType: 'oauth',
    blurb: 'Turn hardening tasks into tracked, owned tickets.',
    reads: 'Projects & issue metadata.',
    enables: 'Auto-create remediation tickets with owner & SLA.',
    recommended: true,
    status: 'not_connected',
    mono: 'Ji',
    color: '#2684ff',
    copilotWhy:
      'Connect after your Foundation is in place - it routes the hardening actions Act finds into owned, tracked tickets.',
    scopes: [
      { id: 'jira-proj', label: 'Read projects & issue types', access: 'read', required: true, description: 'Route tickets to the right board.' },
      { id: 'jira-write', label: 'Create & update issues', access: 'write', required: true, description: 'Open remediation tickets.' },
      { id: 'jira-comment', label: 'Add comments & transitions', access: 'write', required: false, description: 'Post status updates back.' },
    ],
  },
  {
    id: 'servicenow',
    name: 'ServiceNow',
    category: 'Ticketing',
    layer: 'action',
    authType: 'api-token',
    blurb: 'Enterprise change & incident workflow.',
    reads: 'CMDB, incident & change tables.',
    enables: 'File hardening changes through ITSM with approvals.',
    status: 'not_connected',
    mono: 'SN',
    color: '#62d84e',
    scopes: [
      { id: 'snow-read', label: 'Read CMDB & tables', access: 'read', required: true, description: 'Map assets to records.' },
      { id: 'snow-write', label: 'Create change requests', access: 'write', required: true, description: 'Open change tickets.' },
    ],
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'Comms',
    layer: 'action',
    authType: 'oauth',
    blurb: 'Alert the right channel when risk needs a human.',
    reads: 'Channel list & workspace metadata.',
    enables: 'Route campaign approvals & alerts to Slack.',
    recommended: true,
    status: 'not_connected',
    mono: 'Sl',
    color: '#611f69',
    copilotWhy:
      'Optional but high-value - it puts campaign approvals and alerts where your team already works.',
    scopes: [
      { id: 'slack-chan', label: 'View channels', access: 'read', required: true, description: 'Pick where alerts land.' },
      { id: 'slack-post', label: 'Post messages', access: 'write', required: true, description: 'Send alerts & approval prompts.' },
      { id: 'slack-dm', label: 'Send direct messages', access: 'write', required: false, description: 'Notify owners privately.' },
    ],
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    category: 'Comms',
    layer: 'action',
    authType: 'oauth',
    blurb: 'Notifications & approvals inside Teams.',
    reads: 'Teams & channels metadata.',
    enables: 'Route alerts & approvals to Teams.',
    status: 'disabled',
    connectedBy: 'maya.cohen@act.security',
    mono: 'Te',
    color: '#5059c9',
    scopes: [
      { id: 'teams-post', label: 'Post to channels', access: 'write', required: true, description: 'Send alerts.' },
    ],
  },
  {
    id: 'xsoar',
    name: 'Cortex XSOAR',
    category: 'SOAR',
    layer: 'action',
    authType: 'api-token',
    blurb: 'Trigger automated response playbooks.',
    reads: 'Playbook & incident metadata.',
    enables: 'Hand off hardening actions to SOAR playbooks.',
    status: 'not_connected',
    mono: 'XS',
    color: '#00cc66',
    scopes: [
      { id: 'xsoar-run', label: 'Trigger playbooks', access: 'write', required: true, description: 'Launch response automation.' },
    ],
  },
  {
    id: 'tines',
    name: 'Tines',
    category: 'SOAR',
    layer: 'action',
    authType: 'api-token',
    blurb: 'No-code automation for response workflows.',
    reads: 'Story (workflow) metadata.',
    enables: 'Fire Tines stories from Act campaigns.',
    status: 'not_connected',
    mono: 'Ti',
    color: '#4636f7',
    scopes: [{ id: 'tines-run', label: 'Trigger stories', access: 'write', required: true, description: 'Launch automations.' }],
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'IaC / CI-CD',
    layer: 'action',
    authType: 'oauth',
    blurb: 'Enforce hardening as code via pull requests.',
    reads: 'Repos, IaC files (Terraform/CloudFormation).',
    enables: 'Open PRs that fix misconfigurations at the source.',
    status: 'not_connected',
    mono: 'GH',
    color: '#6e7681',
    scopes: [
      { id: 'gh-read', label: 'Read repositories', access: 'read', required: true, description: 'Find IaC definitions.' },
      { id: 'gh-pr', label: 'Open pull requests', access: 'write', required: true, description: 'Propose hardening changes.' },
    ],
  },
  {
    id: 'terraform',
    name: 'Terraform Cloud',
    category: 'IaC / CI-CD',
    layer: 'action',
    authType: 'api-token',
    blurb: 'Drift detection & policy on infrastructure state.',
    reads: 'Workspaces, state metadata, runs.',
    enables: 'Detect drift between desired & enforced posture.',
    status: 'not_connected',
    mono: 'Tf',
    color: '#7b42bc',
    scopes: [{ id: 'tf-read', label: 'Read workspaces & state', access: 'read', required: true, description: 'Compare desired vs actual.' }],
  },
]

/** Day-N status overrides, keyed by id. Anything not listed falls back to
 *  'not_connected' (available). These touch status only - never the catalog. */
type StatusPatch = Partial<
  Pick<Integration, 'status' | 'lastSync' | 'connectedBy' | 'updateAvailable' | 'copilotWhy'>
>

const LIVE_PATCH: Record<string, StatusPatch> = {
  // AWS: the headline - connected cleanly, no pending update.
  aws: { status: 'connected', lastSync: 'just now', connectedBy: 'you@act.security', updateAvailable: false },
  // Okta: connected but a connector update is waiting → "needs update".
  okta: { status: 'connected', lastSync: '2 min ago', updateAvailable: true },
  // Azure: a hard failure - credentials rejected mid-connect.
  azure: {
    status: 'error',
    copilotWhy:
      'Connection failed - the access key was rejected. Re-enter credentials to finish mapping Azure into the graph.',
  },
  // Splunk: degraded - some saved searches stopped returning data.
  splunk: { status: 'degraded' },
  // Sentinel: token expired, data flow paused.
  sentinel: { status: 'needs_attention' },
  // Teams: connected once, then switched off.
  teams: { status: 'disabled' },
}

/** Derive a demo act from the canonical catalog. Day-0 wipes every status to
 *  'not_connected'; Day-N applies the status-only LIVE_PATCH overrides. */
export function buildPreset(state: DemoState): Integration[] {
  return INTEGRATIONS.map((it) => {
    if (state === 'fresh') {
      return { ...it, status: 'not_connected', lastSync: undefined, connectedBy: undefined, updateAvailable: false }
    }
    const patch = LIVE_PATCH[it.id]
    return patch
      ? { ...it, ...patch }
      : { ...it, status: 'not_connected', lastSync: undefined, connectedBy: undefined, updateAvailable: false }
  })
}
