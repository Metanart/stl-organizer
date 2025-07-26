import { JSX } from 'react'

export const StorybookPageDecorator = (Story): JSX.Element => (
  <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
    <Story />
  </div>
)
