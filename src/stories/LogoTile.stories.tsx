import type { Meta, StoryObj } from '@storybook/react-vite'
import { LogoTile } from '../components/LogoTile'

const meta = {
  title: 'Foundations/LogoTile',
  component: LogoTile,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof LogoTile>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { mono: 'AW', color: '#FF9900', size: 44 },
}

const SAMPLES: { mono: string; color: string }[] = [
  { mono: 'AW', color: '#FF9900' },
  { mono: 'OK', color: '#007DC1' },
  { mono: 'EN', color: '#0078D4' },
  { mono: 'GC', color: '#4285F4' },
  { mono: 'SP', color: '#65A637' },
  { mono: 'JI', color: '#2684FF' },
  { mono: 'SN', color: '#62D84E' },
  { mono: 'EL', color: '#FEC514' },
]

export const Gallery: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
      {SAMPLES.map((s) => (
        <LogoTile key={s.mono} mono={s.mono} color={s.color} />
      ))}
    </div>
  ),
}

export const Sizes: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
      {[28, 36, 44, 56, 72].map((sz) => (
        <LogoTile key={sz} mono="AW" color="#FF9900" size={sz} />
      ))}
    </div>
  ),
}
