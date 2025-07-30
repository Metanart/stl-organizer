import { _electron as electron, expect, test } from '@playwright/test'

test('launch app and check settings button', async () => {
  const electronApp = await electron.launch({ args: ['out/main/index.js'] })

  // Получаем главное окно
  const window = await electronApp.firstWindow()

  // Ждём загрузки DOM
  await window.waitForLoadState('domcontentloaded')

  // Дожидаемся элемента (например, кнопка настроек)
  const settingsButton = window.locator('#settings-button')
  await expect(settingsButton).toBeVisible()

  // Дополнительно проверим текст или атрибут
  await expect(settingsButton).toHaveText(/Settings/i)

  await electronApp.close()
})
