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
  path: string
  element: ReactElement
}

export type AppDomains = 'App' | 'Common' | 'Home' | 'Models' | 'Sources' | 'Config'
