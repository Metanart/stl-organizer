import { FC } from 'react'
import { useI18nContext } from '@i18n/i18n-react.generated'
import { ROUTES } from '@renderer/domains/App/routes'

import { AppNavigation } from '../components/AppNavigation'
import { AppNavigationButton } from '../components/AppNavigationButton'
import { AppNavigationParams } from '../types/App.types'

type Props = {
  onToggleClick: () => void
  navigation: AppNavigationParams
}

export const AppNavigationContainer: FC<Props> = (props) => {
  const {
    onToggleClick,
    navigation: { isOpen }
  } = props

  const { LL } = useI18nContext()

  return (
    <AppNavigation onToggleClick={onToggleClick} isOpen={isOpen}>
      {ROUTES.map((item) => (
        <AppNavigationButton
          key={item.id}
          text={LL.app.navigation[item.namespace]()}
          icon={item.icon}
          to={item.path}
          isOpen={isOpen}
        />
      ))}
    </AppNavigation>
  )
}
