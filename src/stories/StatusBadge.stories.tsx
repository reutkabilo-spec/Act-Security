import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatusBadge, StatusDot } from '../components/StatusBadge'
import type { Status } from '../types'

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

const meta = {
  title: 'Status/StatusBadge',
  component: StatusBadge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ALL },
  },
} satisfies Meta<typeof StatusBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { status: 'connected' },
}

export const AllBadges: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {ALL.map((s) => (
        <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <StatusBadge status={s} />
          <code style={{ fontSize: 12, color: 'var(--text-3)' }}>{s}</code>
        </div>
      ))}
    </div>
  ),
}

export const Dots: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
      {ALL.map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <StatusDot status={s} size={12} />
          <code style={{ fontSize: 10, color: 'var(--text-3)' }}>{s}</code>
        </div>
      ))}
    </div>
  ),
}
