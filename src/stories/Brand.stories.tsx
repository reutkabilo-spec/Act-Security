import type { Meta, StoryObj } from '@storybook/react-vite'
import { ActLogo, ConstructionArt, SpotIllustration } from '../components/Brand'

const meta = {
  title: 'Foundations/Brand',
  component: ActLogo,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ActLogo>

export default meta
type Story = StoryObj<typeof meta>

export const Logo: Story = {
  args: { size: 40 },
}

export const LogoOnBrandTiles: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ width: 64, height: 64, borderRadius: 16, background: 'var(--brand-red)', display: 'grid', placeItems: 'center' }}>
        <ActLogo size={22} color="#FBFCEA" />
      </div>
      <div style={{ width: 64, height: 64, borderRadius: 16, background: 'var(--accent)', display: 'grid', placeItems: 'center' }}>
        <ActLogo size={22} color="var(--accent-ink)" />
      </div>
      <div style={{ width: 64, height: 64, borderRadius: 16, background: 'var(--surface-2)', border: '1px solid var(--border)', display: 'grid', placeItems: 'center' }}>
        <ActLogo size={22} />
      </div>
    </div>
  ),
}

export const StateIllustrations: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
      <SpotIllustration variant="empty" size={132} />
      <SpotIllustration variant="success" size={132} />
      <SpotIllustration variant="error" size={132} />
    </div>
  ),
}

export const ConstructionMotif: StoryObj = {
  render: () => <ConstructionArt style={{ width: 420 }} />,
}
