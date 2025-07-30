import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

describe('ConfigUpdateForm - maxThreads validation', () => {
  it('Shows an error when the value is incorrect', async () => {
    const user = userEvent.setup()
    const onSave = vi.fn()

    render(<ConfigUpdateForm onSave={onSave} isDisabled={false} />)

    const input = screen.getByLabelText('Max Threads')
    const submit = screen.getByRole('button', { name: /save/i })

    await user.clear(input)
    await user.type(input, '0')

    await user.click(submit)

    expect(await screen.findByText(/at least 1 and up to 6/i)).toBeInTheDocument()

    expect(onSave).not.toHaveBeenCalled()
  })
})

describe('ConfigUpdateForm - switches validation', () => {
  it('Сorrectly handles Switches and passes their values on submit', async () => {
    const user = userEvent.setup()
    const onSave = vi.fn()

    render(
      <ConfigUpdateForm
        onSave={onSave}
        isDisabled={false}
        configFormDto={{
          outputFolder: 'out',
          tempFolder: 'tmp',
          maxThreads: 1,
          autoProcessOnScan: false,
          autoArchiveOnComplete: false,
          useMultithreading: false,
          debugMode: false
        }}
      />
    )

    const switchAutoProcess = screen.getByLabelText(/auto process on scan/i)
    const switchAutoArchive = screen.getByLabelText(/auto archive on complete/i)
    const switchMultithreading = screen.getByLabelText(/use multithreading/i)
    const switchDebug = screen.getByLabelText(/debug mode/i)

    expect(switchAutoProcess).not.toBeChecked()
    expect(switchAutoArchive).not.toBeChecked()
    expect(switchMultithreading).not.toBeChecked()
    expect(switchDebug).not.toBeChecked()

    await user.click(switchAutoProcess)
    await user.click(switchAutoArchive)
    await user.click(switchMultithreading)
    await user.click(switchDebug)

    expect(switchAutoProcess).toBeChecked()
    expect(switchAutoArchive).toBeChecked()
    expect(switchMultithreading).toBeChecked()
    expect(switchDebug).toBeChecked()

    const submit = screen.getByRole('button', { name: /save/i })
    await user.click(submit)

    expect(onSave).toHaveBeenCalledTimes(1)
    const submittedData = onSave.mock.calls[0][0]
    expect(submittedData).toMatchObject({
      autoProcessOnScan: true,
      autoArchiveOnComplete: true,
      useMultithreading: true,
      debugMode: true
    })
  })
})
