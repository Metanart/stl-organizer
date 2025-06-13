import { FC, JSX, PropsWithChildren } from 'react'
import { ConfigProvider } from '@renderer/domains/Config/state/ConfigProvider'
import { SourcesProvider } from '@renderer/domains/Sources/state/SourcesProvider'

export const AppProvidersContainer: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  return (
    <ConfigProvider>
      <SourcesProvider>{children} </SourcesProvider>
    </ConfigProvider>
  )
}
