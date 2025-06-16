import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { useRequestState } from '@renderer/utils/useRequestState'

import {
  invokeSourcesCreate,
  invokeSourcesGetAll,
  invokeSourcesRemove,
  invokeSourcesUpdate
} from './utils/ipc-invokers'
import {
  mapFromDTOsToSourcesState,
  mapFromDTOToSourcesItem,
  mapFromSourcesItemToDTO,
  mapNewItemToCreateDTO
} from './utils/mappers'
import { SourcesContext } from './SourcesContext'
import { SourceItem, SourceItemNew, SourcesState } from './types'

export const SourcesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [sources, setSources] = useState<SourcesState | null>(null)

  const { isLoading, error, handleRequest } = useRequestState()

  const load = async (): Promise<void> => {
    const response = await handleRequest(invokeSourcesGetAll)

    if (response.data !== null) {
      const newState = mapFromDTOsToSourcesState(response.data)
      setSources(newState)
    }
  }

  const update = async (updatedItem: SourceItem): Promise<void> => {
    const updateDTO = mapFromSourcesItemToDTO(updatedItem)

    const response = await handleRequest(async () => invokeSourcesUpdate(updateDTO))

    if (response.data !== null) {
      const updatedItem = mapFromDTOToSourcesItem(response.data)

      setSources((prevState) => {
        return {
          ...prevState,
          [updatedItem.id]: updatedItem
        }
      })
    }
  }

  const create = async (newItem: SourceItemNew): Promise<void> => {
    const createDTO = mapNewItemToCreateDTO(newItem)

    const response = await handleRequest(async () => invokeSourcesCreate(createDTO))

    if (response.data !== null) {
      const createdItem = mapFromDTOToSourcesItem(response.data)

      setSources((prevState) => {
        return {
          ...prevState,
          [createdItem.id]: createdItem
        }
      })
    }
  }

  const remove = async ({ id }: { id: number }): Promise<void> => {
    const response = await handleRequest(async () => invokeSourcesRemove({ id }))

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
