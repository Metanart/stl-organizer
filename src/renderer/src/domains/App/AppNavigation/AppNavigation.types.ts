import { JSX } from 'react'

export type AppNavigationItem = {
  text: string
  icon: JSX.Element
}

export type AppNavigationParams = {
  isOpen: boolean
  openWidth: number
  closeWidth: number
}
