import { JSX, ReactElement } from 'react'

export type AppNavigationItem = {
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
  text: string
  icon: ReactElement
  path: AppURL
  element: ReactElement
}

export type AppBaseDomains = 'App' | 'Common'

export type AppFeatureDomains = 'Home' | 'Models' | 'Sources' | 'Config' | 'Tasks'

export type AppDomains = AppBaseDomains | AppFeatureDomains

export type AppURL = '/' | `/${AppFeatureDomains}`
