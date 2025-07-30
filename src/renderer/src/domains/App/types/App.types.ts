import { JSX, ReactElement } from 'react'
import { Namespaces } from '@i18n/i18n-types.generated'

export type AppNavigationItem = {
  id: string
  text: string
  icon: JSX.Element
}

export type AppNavigationParams = {
  isOpen: boolean
  openWidth: number
  closeWidth: number
}

export type AppRoute = {
  id: `${AppDomains}Route`
  icon: ReactElement
  path: AppURL
  element: ReactElement
  namespace: Namespaces
}

export type AppBaseDomains = 'App' | 'Common'

export type AppFeatureDomains = 'Home' | 'Models' | 'Sources' | 'Config' | 'Tasks'

export type AppDomains = AppBaseDomains | AppFeatureDomains

export type AppURL = '/' | `/${AppFeatureDomains}`
