import { FC, JSX, PropsWithChildren } from 'react'
import { ConfigProvider } from '@renderer/domains/Config/state/ConfigProvider'

export const AppProvidersContainer: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  return <ConfigProvider>{children}</ConfigProvider>
}
