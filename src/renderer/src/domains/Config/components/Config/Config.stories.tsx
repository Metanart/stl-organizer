import { StorybookPageDecorator } from '@renderer/utils/storybook/storybook-page-decorator'
import type { Meta, StoryObj } from '@storybook/react'

import { Config } from './Config'

const meta = {
  title: 'Config/Pages',
  component: Config,
  parameters: {
    layout: 'padded'
  },
  decorators: [
    (Story) => (
      <StorybookPageDecorator>
        <Story />
      </StorybookPageDecorator>
    )
  ]
} satisfies Meta<typeof Config>

export default meta

type Story = StoryObj<typeof Config>

export const Default: Story = {
  args: {
    config: {
      id: '123',
      outputFolder: '/mock/output',
      tempFolder: '/mock/temp',
      maxThreads: 4,
      autoProcessOnScan: true,
      autoArchiveOnComplete: false,
      useMultithreading: true,
      debugMode: false
    },
    onSubmit: (updated) => {
      console.log('Updated config:', updated)
    }
  }
}
