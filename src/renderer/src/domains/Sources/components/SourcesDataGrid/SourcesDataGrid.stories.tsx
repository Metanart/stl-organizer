import type { Meta, StoryObj } from '@storybook/react'
import { action } from 'storybook/actions'

import type { SourceFormDTO } from '@shared/domains/Sources/dtos/SourceDTO'

import { SourcesDataGrid } from './SourcesDataGrid'
import { SourcesDataGridMockup } from './SourcesDataGridMockup'

const meta: Meta<typeof SourcesDataGrid> = {
  title: 'Domains/Sources/SourcesTable',
  component: SourcesDataGrid,
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    onEdit: { action: 'onEdit' },
    onDelete: { action: 'onDelete' },
    onToggleEnabled: { action: 'onToggleEnabled' }
  },
  args: {
    onEdit: action('onEdit'),
    onDelete: action('onDelete'),
    onToggleEnabled: action('onToggleEnabled')
  }
}

export default meta
type Story = StoryObj<typeof SourcesDataGrid>

const mockSources: SourceFormDTO[] = SourcesDataGridMockup.ROWS

export const Default: Story = {
  args: {
    sources: mockSources
  }
}

export const Empty: Story = {
  args: {
    sources: []
  }
}

export const DisabledSources: Story = {
  args: {
    sources: mockSources.map((source) => ({ ...source, isEnabled: false }))
  }
}
