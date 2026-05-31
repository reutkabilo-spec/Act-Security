import type { Preview } from '@storybook/react-vite'
import { useEffect } from 'react'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: { test: 'todo' },
    backgrounds: { disable: true }, // theme decorator owns the canvas background
  },

  globalTypes: {
    theme: {
      description: 'Act brand theme',
      defaultValue: 'dark',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'dark', title: 'Dark (navy)' },
          { value: 'light', title: 'Light (cream)' },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals.theme ?? 'dark'
      useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
      }, [theme])
      return (
        <div
          style={{
            background: 'var(--bg)',
            color: 'var(--text-1)',
            minHeight: '100vh',
            padding: 24,
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          <Story />
        </div>
      )
    },
  ],
}

export default preview
