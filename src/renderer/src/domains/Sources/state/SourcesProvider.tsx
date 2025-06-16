import { FC, PropsWithChildren, useEffect, useState } from 'react'

import { invokeSourcesCreate, invokeSourcesGetAll, invokeSourcesUpdate } from './utils/ipc-invokers'
import { mapFromDTOsToSourcesState, mapFromSourcesItemToDTO } from './utils/mappers'
import { SourcesContext } from './SourcesContext'
import { SourceItem, SourcesState } from './types'

export const SourcesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [sources, setSources] = useState<SourcesState | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleResponse = async (handlerFn): Promise<void> => {
    setIsLoading(true)
    setError(null)

    const response = await handlerFn()

    if (response.error) {
      setError(response.error)
      setSources(null)
    } else if (!response.data) {
      setError('Empty sources received')
      setSources(null)
    } else {
      console.log('sources', response.data)
      setSources(mapFromDTOsToSourcesState(response.data))
    }

    setIsLoading(false)
  }

  const load = async (): Promise<void> => {
    handleResponse(async () => invokeSourcesGetAll())
  }

  const update = async (item: SourceItem): Promise<void> => {
    handleResponse(async () => invokeSourcesUpdate(mapFromSourcesItemToDTO(item)))
  }

  const create = async (newSource: SourceItem): Promise<void> => {
    handleResponse(async () => invokeSourcesCreate(mapFromSourcesItemToDTO(newSource)))
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <SourcesContext.Provider value={{ sources: sources, isLoading, error, update, create }}>
      {children}
    </SourcesContext.Provider>
  )
}
