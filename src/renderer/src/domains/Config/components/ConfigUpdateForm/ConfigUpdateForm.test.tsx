import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import { ConfigFormDTO } from '@shared/domains/Config/Config.dtos'

import { ConfigUpdateForm } from './ConfigUpdateForm'
import { ConfigUpdateFormDataQa } from './ConfigUpdateForm.testid'

// Helper function to get element by ID with proper typing
const getElementById = (id: string): HTMLElement => {
  const element = document.getElementById(id)
  if (!element) {
    throw new Error(`Element with id "${id}" not found`)
  }
  return element
}

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
    expect(getElementById(ConfigUpdateFormDataQa.outputFolderInput)).toHaveValue('C:/output')
    expect(getElementById(ConfigUpdateFormDataQa.tempFolderInput)).toHaveValue('C:/temp')
    expect(getElementById(ConfigUpdateFormDataQa.maxThreadsInput)).toHaveValue(4)

    // Verify switch states
    expect(getElementById(ConfigUpdateFormDataQa.autoProcessOnScanSwitch)).toBeChecked()
    expect(getElementById(ConfigUpdateFormDataQa.autoArchiveOnCompleteSwitch)).not.toBeChecked()
    expect(getElementById(ConfigUpdateFormDataQa.useMultithreadingSwitch)).toBeChecked()
    expect(getElementById(ConfigUpdateFormDataQa.debugModeSwitch)).not.toBeChecked()
  })

  it('shows validation error when maxThreads value is invalid', async () => {
    const user = userEvent.setup()
    const onSave = vi.fn()

    render(<ConfigUpdateForm onSave={onSave} isDisabled={false} />)

    const maxThreadsInput = getElementById(
      ConfigUpdateFormDataQa.maxThreadsInput
    ) as HTMLInputElement
    const submitButton = getElementById(ConfigUpdateFormDataQa.submitButton)

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
      autoProcess: getElementById(ConfigUpdateFormDataQa.autoProcessOnScanSwitch),
      autoArchive: getElementById(ConfigUpdateFormDataQa.autoArchiveOnCompleteSwitch),
      multithreading: getElementById(ConfigUpdateFormDataQa.useMultithreadingSwitch),
      debug: getElementById(ConfigUpdateFormDataQa.debugModeSwitch)
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
    const submitButton = getElementById(ConfigUpdateFormDataQa.submitButton)
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
        autoProcess: getElementById(ConfigUpdateFormDataQa.autoProcessOnScanSwitch),
        autoArchive: getElementById(ConfigUpdateFormDataQa.autoArchiveOnCompleteSwitch),
        multithreading: getElementById(ConfigUpdateFormDataQa.useMultithreadingSwitch),
        debug: getElementById(ConfigUpdateFormDataQa.debugModeSwitch)
      },
      inputs: {
        maxThreads: getElementById(ConfigUpdateFormDataQa.maxThreadsInput),
        outputFolder: getElementById(ConfigUpdateFormDataQa.outputFolderInput),
        tempFolder: getElementById(ConfigUpdateFormDataQa.tempFolderInput)
      },
      buttons: {
        submit: getElementById(ConfigUpdateFormDataQa.submitButton)
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
