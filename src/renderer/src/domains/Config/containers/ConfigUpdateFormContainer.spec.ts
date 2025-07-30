import { _electron as electron, expect, test } from '@playwright/test'

test('Config page - form submit flow', async () => {
  const electronApp = await electron.launch({ args: ['out/main/index.js'] })
  const window = await electronApp.firstWindow()

  await window.waitForLoadState('domcontentloaded')

  const settingsButton = window.locator('#ConfigRoute')
  await settingsButton.click()

  await expect(settingsButton).toBeEnabled()

  const outputFolderInput = window.locator('input[name="outputFolder"]')
  await expect(outputFolderInput).toBeVisible()
  await outputFolderInput.fill('C:/out')

  const tempFolderInput = window.locator('input[name="tempFolder"]')
  await expect(tempFolderInput).toBeVisible()
  await tempFolderInput.fill('C:/tmp')

  const maxThreadsInput = window.locator('input[name="maxThreads"]')
  await expect(maxThreadsInput).toBeVisible()
  await maxThreadsInput.fill('3')

  await window.locator('label:has-text("Auto Process On Scan") input[type=checkbox]').check()
  await window.locator('label:has-text("Use Multithreading") input[type=checkbox]').check()

  const saveButton = window.locator('button:has-text("Save")')
  await expect(saveButton).toBeEnabled()
  await saveButton.click()

  await expect(outputFolderInput).toHaveValue('C:/out')
  await expect(tempFolderInput).toHaveValue('C:/tmp')
  await expect(maxThreadsInput).toHaveValue('3')

  await electronApp.close()
})
