import type { Meta, StoryObj } from '@storybook/react'
import { action } from 'storybook/internal/actions' // новый импорт для SB 7+

import { SourcesCreateForm } from './SourcesCreateForm'

const meta: Meta<typeof SourcesCreateForm> = {
  title: 'Sources/SourcesCreateForm',
  component: SourcesCreateForm,
  args: {
    onSave: action('onSave'),
    onCancel: action('onCancel')
  }
}

export default meta
type Story = StoryObj<typeof SourcesCreateForm>

export const Default: Story = {
  render: (args) => <SourcesCreateForm {...args} />
}
