import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import { ConfigFormDTO } from '@shared/domains/Config/Config.dtos'

import { ConfigUpdateForm } from './ConfigUpdateForm'
import { ConfigUpdateFormDataQa } from './ConfigUpdateForm.testid'

// Helper function to create mock config data
const createMockConfig = (overrides: Partial<ConfigFormDTO> = {}): ConfigFormDTO => ({
  outputFolder: 'C:/output',
  tempFolder: 'C:/temp',
  maxThreads: 4,
  autoProcessOnScan: true,
  autoArchiveOnComplete: false,
  useMultithreading: true,
  debugMode: false,
  ...overrides
})

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

describe('ConfigUpdateForm', () => {
  it('initializes with values from configFormDto', () => {
    const mockConfig = createMockConfig()
    const onSave = vi.fn()

    render(<ConfigUpdateForm configFormDto={mockConfig} onSave={onSave} isDisabled={false} />)

    // Verify input values
    expect(screen.getByTestId(ConfigUpdateFormDataQa.outputFolderInput)).toHaveValue('C:/output')
    expect(screen.getByTestId(ConfigUpdateFormDataQa.tempFolderInput)).toHaveValue('C:/temp')
    expect(screen.getByTestId(ConfigUpdateFormDataQa.maxThreadsInput)).toHaveValue(4)

    // Verify switch states
    expect(screen.getByTestId(ConfigUpdateFormDataQa.autoProcessOnScanSwitch)).toBeChecked()
    expect(screen.getByTestId(ConfigUpdateFormDataQa.autoArchiveOnCompleteSwitch)).not.toBeChecked()
    expect(screen.getByTestId(ConfigUpdateFormDataQa.useMultithreadingSwitch)).toBeChecked()
    expect(screen.getByTestId(ConfigUpdateFormDataQa.debugModeSwitch)).not.toBeChecked()
  })

  it('shows validation error when maxThreads value is invalid', async () => {
    const user = userEvent.setup()
    const onSave = vi.fn()

    render(<ConfigUpdateForm onSave={onSave} isDisabled={false} />)

    const maxThreadsInput = screen.getByTestId(
      ConfigUpdateFormDataQa.maxThreadsInput
    ) as HTMLInputElement
    const submitButton = screen.getByTestId(ConfigUpdateFormDataQa.submitButton)

    await user.clear(maxThreadsInput)
    await user.type(maxThreadsInput, '0')
    await user.click(submitButton)

    expect(await screen.findByText(/at least 1 and up to 6/i)).toBeInTheDocument()
    expect(onSave).not.toHaveBeenCalled()
  })

  it('correctly handles switches and submits data', async () => {
    const user = userEvent.setup()
    const onSave = vi.fn()
    const mockConfig = createMockConfig({
      outputFolder: 'out',
      tempFolder: 'tmp',
      maxThreads: 1,
      autoProcessOnScan: false,
      autoArchiveOnComplete: false,
      useMultithreading: false,
      debugMode: false
    })

    render(<ConfigUpdateForm onSave={onSave} isDisabled={false} configFormDto={mockConfig} />)

    // Get switch elements
    const switches = {
      autoProcess: screen.getByTestId(ConfigUpdateFormDataQa.autoProcessOnScanSwitch),
      autoArchive: screen.getByTestId(ConfigUpdateFormDataQa.autoArchiveOnCompleteSwitch),
      multithreading: screen.getByTestId(ConfigUpdateFormDataQa.useMultithreadingSwitch),
      debug: screen.getByTestId(ConfigUpdateFormDataQa.debugModeSwitch)
    }

    // Verify initial states (all switches should be unchecked)
    Object.values(switches).forEach((switchElement) => {
      expect(switchElement).not.toBeChecked()
    })

    // Toggle all switches
    await Promise.all(Object.values(switches).map((switchElement) => user.click(switchElement)))

    // Verify all switches are now checked
    Object.values(switches).forEach((switchElement) => {
      expect(switchElement).toBeChecked()
    })

    // Submit form
    const submitButton = screen.getByTestId(ConfigUpdateFormDataQa.submitButton)
    await user.click(submitButton)

    // Verify onSave was called with correct data
    expect(onSave).toHaveBeenCalledTimes(1)
    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({
        autoProcessOnScan: true,
        autoArchiveOnComplete: true,
        useMultithreading: true,
        debugMode: true
      })
    )
  })

  it('disables all form elements when isDisabled is true', () => {
    const onSave = vi.fn()
    const mockConfig = createMockConfig({
      outputFolder: 'out',
      tempFolder: 'tmp',
      maxThreads: 2,
      autoProcessOnScan: true,
      autoArchiveOnComplete: false,
      useMultithreading: false,
      debugMode: true
    })

    render(<ConfigUpdateForm onSave={onSave} isDisabled={true} configFormDto={mockConfig} />)

    // Get all form elements
    const formElements = {
      switches: {
        autoProcess: screen.getByTestId(ConfigUpdateFormDataQa.autoProcessOnScanSwitch),
        autoArchive: screen.getByTestId(ConfigUpdateFormDataQa.autoArchiveOnCompleteSwitch),
        multithreading: screen.getByTestId(ConfigUpdateFormDataQa.useMultithreadingSwitch),
        debug: screen.getByTestId(ConfigUpdateFormDataQa.debugModeSwitch)
      },
      inputs: {
        maxThreads: screen.getByTestId(ConfigUpdateFormDataQa.maxThreadsInput),
        outputFolder: screen.getByTestId(ConfigUpdateFormDataQa.outputFolderInput),
        tempFolder: screen.getByTestId(ConfigUpdateFormDataQa.tempFolderInput)
      },
      buttons: {
        submit: screen.getByTestId(ConfigUpdateFormDataQa.submitButton)
      }
    }

    // Verify all switches are disabled
    Object.values(formElements.switches).forEach((switchElement) => {
      expect(switchElement).toBeDisabled()
    })

    // Verify all inputs are disabled
    Object.values(formElements.inputs).forEach((inputElement) => {
      expect(inputElement).toBeDisabled()
    })

    // Verify submit button is disabled
    expect(formElements.buttons.submit).toBeDisabled()
  })
})
