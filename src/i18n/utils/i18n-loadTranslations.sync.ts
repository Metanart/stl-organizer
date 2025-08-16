import { loadLocale } from '@i18n/i18n-util.generated.sync'

import { BASE_LOCALE } from './i18n-constants'

let isLoaded = false

if (!isLoaded) {
  loadLocale(BASE_LOCALE)
  isLoaded = true
}
