import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import { ConfigFormDTO } from '@shared/domains/Config/Config.dtos'

import { ConfigUpdateForm } from './ConfigUpdateForm'

vi.mock('@i18n/i18n-react.generated', () => ({
  useI18nContext: () => ({
    LL: {
      config: {
        updateForm: {
          fields: {
            outputFolder: { label: () => 'Output Folder', placeholder: () => 'Output...' },
            tempFolder: { label: () => 'Temp Folder', placeholder: () => 'Temp...' },
            maxThreads: { label: () => 'Max Threads' },
            autoProcessOnScan: { label: () => 'Auto Process On Scan' },
            autoArchiveOnComplete: { label: () => 'Auto Archive On Complete' },
            useMultithreading: { label: () => 'Use Multithreading' },
            debugMode: { label: () => 'Debug Mode' }
          }
        }
      },
      common: { actions: { save: () => 'Save' } }
    }
  })
}))

vi.mock('@renderer/domains/Common/components/FolderInput', () => ({
  FolderInput: ({
    label,
    value,
    onChange
  }: {
    label: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  }) => <input aria-label={label} value={value} onChange={(e) => onChange(e)} data-testid={label} />
}))

describe('ConfigUpdateForm', () => {
  it('Initialized with values from configFormDto', async () => {
    const mockConfig: ConfigFormDTO = {
      outputFolder: 'C:/output',
      tempFolder: 'C:/temp',
      maxThreads: 4,
      autoProcessOnScan: true,
      autoArchiveOnComplete: false,
      useMultithreading: true,
      debugMode: false
    }

    render(<ConfigUpdateForm configFormDto={mockConfig} onSave={vi.fn()} isDisabled={false} />)

    expect(screen.getByLabelText('Output Folder')).toHaveValue('C:/output')
    expect(screen.getByLabelText('Temp Folder')).toHaveValue('C:/temp')
    expect(screen.getByLabelText('Max Threads')).toHaveValue(4)

    expect(screen.getByLabelText('Auto Process On Scan')).toBeChecked()
    expect(screen.getByLabelText('Auto Archive On Complete')).not.toBeChecked()
    expect(screen.getByLabelText('Use Multithreading')).toBeChecked()
    expect(screen.getByLabelText('Debug Mode')).not.toBeChecked()
  })
})
