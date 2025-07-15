import { FC, JSX, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

import { AppStore } from '../store/AppStore'

export const AppProvidersContainer: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  return <Provider store={AppStore}>{children}</Provider>
}
