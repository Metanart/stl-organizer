import { i18n } from '../i18n-util.generated'

import { BASE_LOCALE } from './i18n-constants'

import '@i18n/utils/i18n-loadTranslations.sync'

const LL = i18n()[BASE_LOCALE]

export { LL }
