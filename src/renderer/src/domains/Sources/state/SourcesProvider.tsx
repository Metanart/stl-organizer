import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { useRequestState } from '@renderer/utils/useRequestState'

import {
  invokeSourcesCreate,
  invokeSourcesGetAll,
  invokeSourcesRemove,
  invokeSourcesUpdate
} from './utils/ipc-invokers'
import { SourcesContext } from './SourcesContext'
import { SourcesMapper } from './SourcesMapper'
import { Source, SourceNew, SourceRemove, SourcesState } from './types'

export const SourcesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [sources, setSources] = useState<SourcesState | null>(null)

  const { isLoading, error, handleRequest } = useRequestState()

  const load = async (): Promise<void> => {
    const response = await handleRequest(invokeSourcesGetAll)

    if (response.data !== null) {
      const sourcesState: SourcesState = SourcesMapper.fromDTOs(response.data)
      setSources(sourcesState)
    }
  }

  const update = async (source: Source): Promise<void> => {
    const inputDTO = SourcesMapper.toInputDTO(source)

    const response = await handleRequest(async () => invokeSourcesUpdate(inputDTO))

    if (response.data !== null) {
      const updatedSource = SourcesMapper.fromDTO(response.data)

      setSources((prevState) => {
        return {
          ...prevState,
          [updatedSource.id]: updatedSource
        }
      })
    }
  }

  const create = async (source: SourceNew): Promise<void> => {
    const createDTO = SourcesMapper.toCreateDTO(source)

    const response = await handleRequest(async () => invokeSourcesCreate(createDTO))

    if (response.data !== null) {
      const createdSource = SourcesMapper.fromDTO(response.data)

      setSources((prevState) => {
        return {
          ...prevState,
          [createdSource.id]: createdSource
        }
      })
    }
  }

  const remove = async (source: SourceRemove): Promise<void> => {
    const removeDTO = SourcesMapper.toRemoveDTO(source)
    const response = await handleRequest(async () => invokeSourcesRemove(removeDTO))

    if (response.data !== null) {
      const removedSourceId = response.data.id

      setSources((prevState) => {
        if (prevState?.[removedSourceId]) {
          delete prevState[removedSourceId]
          return { ...prevState }
        }

        return prevState
      })
    }
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <SourcesContext.Provider value={{ sources: sources, isLoading, error, update, create, remove }}>
      {children}
    </SourcesContext.Provider>
  )
}
