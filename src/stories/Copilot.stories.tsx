import type { Meta, StoryObj } from '@storybook/react-vite'
import { CopilotMark, CopilotTip, CopilotInsight, SetupCopilotPanel } from '../components/Copilot'
import { INTEGRATIONS } from '../data/integrations'

const meta = {
  title: 'Components/Setup Copilot',
  component: CopilotTip,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof CopilotTip>

export default meta
type Story = StoryObj<typeof meta>

export const Mark: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <CopilotMark size={22} />
      <CopilotMark size={26} />
      <CopilotMark size={32} />
    </div>
  ),
}

export const Tip: Story = {
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
  args: {
    children: 'Connect AWS first - it gives Act the access graph everything else maps onto.',
  },
}

export const Insight: StoryObj = {
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <CopilotInsight text="Pairs with Okta to map cloud access back to real identities." />
    </div>
  ),
}

export const RecommendationPanel: StoryObj = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <SetupCopilotPanel items={INTEGRATIONS} onOpen={() => {}} />
    </div>
  ),
}
