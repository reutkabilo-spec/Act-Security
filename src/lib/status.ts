import type { Status } from '../types'

export interface StatusMeta {
  label: string
  /** css var name for the colour */
  color: string
  /** does the dot pulse / spin? */
  motion?: 'pulse' | 'spin'
  /** plain-language explanation + what the user should do - surfaced in tooltips */
  hint: string
}

export const STATUS_META: Record<Status, StatusMeta> = {
  not_connected: {
    label: 'Not connected',
    color: 'var(--text-3)',
    hint: 'Not set up yet. Connect it to start feeding data into Act.',
  },
  connecting: {
    label: 'Connecting…',
    color: 'var(--info)',
    motion: 'spin',
    hint: 'Validating credentials and establishing the connection.',
  },
  syncing: {
    label: 'Syncing',
    color: 'var(--info)',
    motion: 'pulse',
    hint: 'Connected - Act is running its first data pull. Results appear shortly.',
  },
  connected: {
    label: 'Connected',
    color: 'var(--ok)',
    hint: 'Live and healthy. Act is receiving data on schedule.',
  },
  degraded: {
    label: 'Degraded',
    color: 'var(--degraded)',
    motion: 'pulse',
    hint: 'Connected, but only partial data is flowing - usually a scope or region limit. Open it to fix.',
  },
  needs_attention: {
    label: 'Needs attention',
    color: 'var(--warn)',
    hint: 'A token expired or a setting changed. Reconnect to restore the data feed.',
  },
  error: {
    label: 'Failed',
    color: 'var(--danger)',
    hint: 'The last connection attempt failed. Open it to see the cause and retry.',
  },
  disabled: {
    label: 'Disabled',
    color: 'var(--text-3)',
    hint: 'Turned off. No data flows until you re-enable it.',
  },
}
