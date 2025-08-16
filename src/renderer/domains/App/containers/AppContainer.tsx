import { JSX, PropsWithChildren, useState } from 'react'
import { loadNamespaceAsync } from '@i18n/i18n-util.generated.async'
import { BASE_LOCALE } from '@i18n/utils/i18n-constants'

import { App } from '../components/App'
import { AppContent } from '../components/AppContent'

import { AppNavigationContainer } from './AppNavigationContainer'

const NAVIGATION_OPEN_WIDTH = 240
const NAVIGATION_CLOSE_WIDTH = 64

await loadNamespaceAsync(BASE_LOCALE, 'app')

export function AppContainer({ children }: PropsWithChildren): JSX.Element {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)

  return (
    <App>
      <AppNavigationContainer
        onToggleClick={() => setIsNavigationOpen(!isNavigationOpen)}
        navigation={{
          isOpen: isNavigationOpen,
          openWidth: NAVIGATION_OPEN_WIDTH,
          closeWidth: NAVIGATION_CLOSE_WIDTH
        }}
      />
      <AppContent
        navigationWidth={isNavigationOpen ? NAVIGATION_OPEN_WIDTH : NAVIGATION_CLOSE_WIDTH}
      >
        {children}
      </AppContent>
    </App>
  )
}
