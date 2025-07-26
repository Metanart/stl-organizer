import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import Backend from 'i18next-electron-fs-backend'

const loadPath = `./locales/{{lng}}/{{ns}}.json`
const addPath = `./locales/{{lng}}/{{ns}}.missing.json`

i18n
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .use(Backend as any)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath,
      addPath,
      // Bugged - can't swith default key
      contextBridgeApiKey: 'api' // needs to match first parameter of contextBridge.exposeInMainWorld in preload file; defaults to "api"
    },
    lng: 'en',
    fallbackLng: 'en',
    ns: ['app', 'common', 'config', 'sources'],
    defaultNS: 'common',
    debug: true,
    saveMissing: true,
    saveMissingTo: 'current',
    interpolation: { escapeValue: false }
  })

console.log('loadPath =', i18n.options.backend)

export default i18n
