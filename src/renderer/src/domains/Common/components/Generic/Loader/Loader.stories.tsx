import type { Meta, StoryObj } from '@storybook/react-vite'

import { Loader } from './Loader'

const meta = {
  title: 'Common/Generic/Loader',
  component: Loader,
  parameters: {
    layout: 'centered'
  },
  args: {
    message: 'Loading...'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Loader>

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
