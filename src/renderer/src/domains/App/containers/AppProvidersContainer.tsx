import { FC, JSX, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { Notification } from '@renderer/domains/Common/components/Notification/Notification'
import { SnackbarProvider } from 'notistack'

import { AppStore } from '../store/AppStore'

export const AppProvidersContainer: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  return (
    <Provider store={AppStore}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={2000}
        Components={{
          success: (props) => <Notification {...props} severity="success" />,
          error: (props) => <Notification {...props} severity="error" />,
          warning: (props) => <Notification {...props} severity="warning" />,
          info: (props) => <Notification {...props} severity="info" />
        }}
      >
        {children}
      </SnackbarProvider>
    </Provider>
  )
}
