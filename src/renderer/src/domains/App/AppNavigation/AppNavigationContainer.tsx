import { FC } from 'react'
import { ROUTES } from '@renderer/routes'

import { AppNavigation } from './AppNavigation'
import { AppNavigationParams } from './AppNavigation.types'
import { AppNavigationButton } from './AppNavigationButton'

type Props = {
  onToggleClick: () => void
  navigation: AppNavigationParams
}

export const AppNavigationContainer: FC<Props> = (props) => {
  const {
    onToggleClick,
    navigation: { isOpen }
  } = props

  return (
    <AppNavigation onToggleClick={onToggleClick} isOpen={isOpen}>
      {ROUTES.map((item) => (
        <AppNavigationButton
          key={item.text}
          text={item.text}
          icon={item.icon}
          to={item.path}
          isOpen={isOpen}
        />
      ))}
    </AppNavigation>
  )
}
