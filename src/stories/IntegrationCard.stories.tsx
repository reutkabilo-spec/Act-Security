import type { Meta, StoryObj } from '@storybook/react-vite'
import { IntegrationCard } from '../components/IntegrationCard'
import { INTEGRATIONS } from '../data/integrations'
import type { Integration, Status } from '../types'

const base = INTEGRATIONS.find((i) => i.id === 'aws')!

const withStatus = (status: Status, extra: Partial<Integration> = {}): Integration => ({
  ...base,
  status,
  lastSync: status === 'connected' || status === 'syncing' ? '4 min ago' : undefined,
  ...extra,
})

const meta = {
  title: 'Components/IntegrationCard',
  component: IntegrationCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { onOpen: () => {} },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof IntegrationCard>

export default meta
type Story = StoryObj<typeof meta>

export const Recommended: Story = {
  args: { integration: withStatus('not_connected', { recommended: true }) },
}

export const Selected: Story = {
  args: { integration: withStatus('connected'), active: true },
}

const ALL: Status[] = [
  'not_connected',
  'connecting',
  'syncing',
  'connected',
  'degraded',
  'needs_attention',
  'error',
  'disabled',
]

export const AllStates: StoryObj = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
      {ALL.map((s) => (
        <IntegrationCard key={s} integration={withStatus(s)} onOpen={() => {}} />
      ))}
    </div>
  ),
}

export const HoverVsSelected: StoryObj = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
      <div>
        <p style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 8 }}>Default (hover me)</p>
        <IntegrationCard integration={withStatus('not_connected', { recommended: true })} onOpen={() => {}} />
      </div>
      <div>
        <p style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 8 }}>Selected (panel open)</p>
        <IntegrationCard integration={withStatus('connected')} onOpen={() => {}} active />
      </div>
    </div>
  ),
}
