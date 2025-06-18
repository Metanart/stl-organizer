import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { useRequestState } from '@renderer/utils/useRequestState'

import {
  invokeSourcesCreate,
  invokeSourcesGetAll,
  invokeSourcesRemove,
  invokeSourcesUpdate
} from '../api/SourcesIpcInvokers'
import { SourceMapper } from '../mappers/SourceMapper'
import { Source, SourceCreate, SourceRemove, SourcesState } from '../types/Source.types'

import { SourcesContext } from './SourcesContext'

export const SourcesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [sources, setSources] = useState<SourcesState | null>(null)

  const { isLoading, error, handleRequest } = useRequestState()

  const load = async (): Promise<void> => {
    const response = await handleRequest(invokeSourcesGetAll)

    if (response.data !== null) {
      const sourcesState: SourcesState = SourceMapper.fromDTOs(response.data)
      setSources(sourcesState)
    }
  }

  const update = async (source: Source): Promise<void> => {
    const inputDTO = SourceMapper.toInputDTO(source)

    const response = await handleRequest(async () => invokeSourcesUpdate(inputDTO))

    if (response.data !== null) {
      const updatedSource = SourceMapper.fromDTO(response.data)

      setSources((prevState) => {
        return {
          ...prevState,
          [updatedSource.id]: updatedSource
        }
      })
    }
  }

  const create = async (source: SourceCreate): Promise<void> => {
    const createDTO = SourceMapper.toCreateDTO(source)

    const response = await handleRequest(async () => invokeSourcesCreate(createDTO))

    if (response.data !== null) {
      const createdSource = SourceMapper.fromDTO(response.data)

      setSources((prevState) => {
        return {
          ...prevState,
          [createdSource.id]: createdSource
        }
      })
    }
  }

  const remove = async (source: SourceRemove): Promise<void> => {
    const removeDTO = SourceMapper.toRemoveDTO(source)
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
