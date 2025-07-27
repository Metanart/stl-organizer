import type { Meta, StoryObj } from '@storybook/react'

import { ConfigUpdateForm } from './ConfigUpdateForm'

const meta = {
  title: 'Config/ConfigUpdateForm',
  component: ConfigUpdateForm
} satisfies Meta<typeof ConfigUpdateForm>

export default meta

type Story = StoryObj<typeof ConfigUpdateForm>

export const Default: Story = {
  args: {
    configFormDto: {
      outputFolder: '/mock/output',
      tempFolder: '/mock/temp',
      maxThreads: 4,
      autoProcessOnScan: true,
      autoArchiveOnComplete: false,
      useMultithreading: true,
      debugMode: false
    },
    onSave: (configUpdateFormDto) => {
      console.log('Updated config:', configUpdateFormDto)
    }
  }
}
