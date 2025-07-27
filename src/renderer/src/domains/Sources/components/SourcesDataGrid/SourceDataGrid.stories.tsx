import type { Meta, StoryObj } from '@storybook/react'
import { action } from 'storybook/actions'

import type { SourceFormDTO } from '@shared/domains/Sources/dtos/SourceDTO'

import { SourcesDataGrid } from './SourcesDataGrid'
import { SourcesDataGridMockup } from './SourcesDataGrid.mockup'

const meta: Meta<typeof SourcesDataGrid> = {
  title: 'Domains/Sources/SourcesDataGrid',
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

const mockSources: SourceFormDTO[] = SourcesDataGridMockup.ROWS as SourceFormDTO[]

export const Default: Story = {
  args: {
    sources: mockSources
  }
}

export const Disabled: Story = {
  args: {
    sources: mockSources.map((source) => ({ ...source, isEnabled: false }))
  }
}

export const Empty: Story = {
  args: {
    sources: []
  }
}
