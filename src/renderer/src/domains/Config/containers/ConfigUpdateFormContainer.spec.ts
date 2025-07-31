import { _electron as electron, expect, Page, test } from '@playwright/test'

import { ConfigUpdateFormDataQa } from '../components/ConfigUpdateForm/ConfigUpdateForm.testid'

test('Config page - form submit flow', async () => {
  const electronApp = await electron.launch({ args: ['out/main/index.js'] })
  const page: Page = await electronApp.firstWindow()

  await page.waitForLoadState('domcontentloaded')

  const settingsButton = page.locator('#ConfigRoute')
  await settingsButton.click()

  await expect(settingsButton).toBeEnabled()

  const outputFolderInput = page.getByTestId(ConfigUpdateFormDataQa.outputFolderInput)
  await expect(outputFolderInput).toBeVisible({ timeout: 5000 })
  await outputFolderInput.fill('C:/out')

  const tempFolderInput = page.getByTestId(ConfigUpdateFormDataQa.tempFolderInput)
  await expect(tempFolderInput).toBeVisible()
  await tempFolderInput.fill('C:/tmp')

  const maxThreadsInput = page.getByTestId(ConfigUpdateFormDataQa.maxThreadsInput)
  await expect(maxThreadsInput).toBeVisible()
  await maxThreadsInput.fill('3')

  const autoProcessSwitch = page.getByTestId(ConfigUpdateFormDataQa.autoProcessOnScanSwitch)
  await expect(autoProcessSwitch).toBeVisible()
  await autoProcessSwitch.check()

  const useMultithreadingSwitch = page.getByTestId(ConfigUpdateFormDataQa.useMultithreadingSwitch)
  await expect(useMultithreadingSwitch).toBeVisible()
  await useMultithreadingSwitch.check()

  const autoArchiveOnCompleteSwitch = page.getByTestId(
    ConfigUpdateFormDataQa.autoArchiveOnCompleteSwitch
  )
  await expect(autoArchiveOnCompleteSwitch).toBeVisible()
  await autoArchiveOnCompleteSwitch.check()

  const debugModeSwitch = page.getByTestId(ConfigUpdateFormDataQa.debugModeSwitch)
  await expect(debugModeSwitch).toBeVisible()
  await debugModeSwitch.check()

  const saveButton = page.getByTestId(ConfigUpdateFormDataQa.submitButton)
  await expect(saveButton).toBeVisible()
  await expect(saveButton).toBeEnabled()
  await saveButton.click()

  await expect(outputFolderInput).toHaveValue('C:/out')
  await expect(tempFolderInput).toHaveValue('C:/tmp')
  await expect(maxThreadsInput).toHaveValue('3')
  await expect(autoProcessSwitch).toBeChecked()
  await expect(useMultithreadingSwitch).toBeChecked()
  await expect(autoArchiveOnCompleteSwitch).toBeChecked()
  await expect(debugModeSwitch).toBeChecked()

  await electronApp.close()
})
