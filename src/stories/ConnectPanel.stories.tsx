import type { Meta, StoryObj } from '@storybook/react-vite'
import { ConnectPanel } from '../components/ConnectPanel'
import type { Phase } from '../components/ConnectPanel'
import { INTEGRATIONS } from '../data/integrations'
import type { Integration } from '../types'

const aws = INTEGRATIONS.find((i) => i.id === 'aws')!
const okta = INTEGRATIONS.find((i) => i.id === 'okta')!
const entra = INTEGRATIONS.find((i) => i.id === 'entra')!

const noop = () => {}

const wrap = (integration: Integration, initialPhase: Phase): StoryObj => ({
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <ConnectPanel
        integration={integration}
        onClose={noop}
        onStatusChange={noop}
        onOpenIntegration={noop}
        initialPhase={initialPhase}
      />
    </div>
  ),
})

const meta = {
  title: 'Components/ConnectPanel',
  component: ConnectPanel,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ConnectPanel>

export default meta

export const Overview: StoryObj = wrap(aws, 'overview')
export const Credentials: StoryObj = wrap(aws, 'credentials')
export const Consent: StoryObj = wrap(entra, 'consent')
export const Success: StoryObj = wrap(okta, 'success')
export const Error: StoryObj = wrap(aws, 'error')
