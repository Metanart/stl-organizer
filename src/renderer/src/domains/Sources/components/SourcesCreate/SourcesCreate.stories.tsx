import type { Meta, StoryObj } from '@storybook/react'
import { action } from 'storybook/actions'

import type { SourceCreateFormDTO } from '@shared/domains/Sources/dtos/SourceDTO'

import { SourcesCreate } from './SourcesCreate'

const meta: Meta<typeof SourcesCreate> = {
  title: 'Sources/SourcesCreate',
  component: SourcesCreate,
  args: {
    onSave: action('onSave'),
    onCancel: action('onCancel')
  }
}

export default meta
type Story = StoryObj<typeof SourcesCreate>

export const Default: Story = {
  render: (args) => <SourcesCreate {...args} />
}

export const Prefilled: Story = {
  render: (args) => (
    <SourcesCreate
      {...args}
      onSave={(data: SourceCreateFormDTO) => {
        action('onSave')(data)
      }}
    />
  )
}
