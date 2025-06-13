import { FC, PropsWithChildren } from 'react'

import { SourcesContext } from './SourcesContext'

export const SourcesProvider: FC<PropsWithChildren> = ({ children }) => {
  return <SourcesContext.Provider value={{ sources: [] }}>{children}</SourcesContext.Provider>
}
