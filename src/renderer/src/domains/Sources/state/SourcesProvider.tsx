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
      const newState: SourcesState = SourcesMapper.fromDTOs(response.data)
      setSources(newState)
    }
  }

  const update = async (source: Source): Promise<void> => {
    const inputDTO = SourcesMapper.toInputDTO(source)

    const response = await handleRequest(async () => invokeSourcesUpdate(inputDTO))

    if (response.data !== null) {
      const updatedItem = SourcesMapper.fromDTO(response.data)

      setSources((prevState) => {
        return {
          ...prevState,
          [updatedItem.id]: updatedItem
        }
      })
    }
  }

  const create = async (source: SourceNew): Promise<void> => {
    const createDTO = SourcesMapper.toCreateDTO(source)

    const response = await handleRequest(async () => invokeSourcesCreate(createDTO))

    if (response.data !== null) {
      const createdItem = SourcesMapper.fromDTO(response.data)

      setSources((prevState) => {
        return {
          ...prevState,
          [createdItem.id]: createdItem
        }
      })
    }
  }

  const remove = async (source: SourceRemove): Promise<void> => {
    const removeDTO = SourcesMapper.toRemoveDTO(source)
    const response = await handleRequest(async () => invokeSourcesRemove(removeDTO))

    if (response.data !== null) {
      const removedItemId = response.data.id

      setSources((prevState) => {
        if (prevState?.[removedItemId]) {
          delete prevState[removedItemId]
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
