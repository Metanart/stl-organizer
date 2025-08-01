import type { Meta, StoryObj } from '@storybook/react-vite'

import { PageLoader } from './PageLoader'

const meta = {
  title: 'Common/Page/PageLoader',
  component: PageLoader,
  parameters: {
    layout: 'centered'
  },
  args: {
    message: 'Loading...'
  },
  tags: ['autodocs']
} satisfies Meta<typeof PageLoader>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Large: Story = {
  args: {
    size: 40
  }
}

export const Small: Story = {
  args: {
    size: 20
  }
}
