import { loadLocaleAsync, loadNamespaceAsync } from '../i18n-util.generated.async'

import { BASE_LOCALE } from './i18n-constants'

let isLoaded = false

if (!isLoaded) {
  await loadLocaleAsync(BASE_LOCALE)
  await loadNamespaceAsync(BASE_LOCALE, 'app')
  await loadNamespaceAsync(BASE_LOCALE, 'config')
  await loadNamespaceAsync(BASE_LOCALE, 'home')
  await loadNamespaceAsync(BASE_LOCALE, 'models')
  await loadNamespaceAsync(BASE_LOCALE, 'sources')
  await loadNamespaceAsync(BASE_LOCALE, 'tasks')
  isLoaded = true
}
