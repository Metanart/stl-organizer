import { loadLocaleAsync, loadNamespaceAsync } from './i18n-util.generated.async'
import { LOCALE } from './locale'

await loadLocaleAsync(LOCALE)
await loadNamespaceAsync(LOCALE, 'app')
await loadNamespaceAsync(LOCALE, 'config')
await loadNamespaceAsync(LOCALE, 'home')
await loadNamespaceAsync(LOCALE, 'models')
await loadNamespaceAsync(LOCALE, 'common')
await loadNamespaceAsync(LOCALE, 'sources')
await loadNamespaceAsync(LOCALE, 'tasks')
