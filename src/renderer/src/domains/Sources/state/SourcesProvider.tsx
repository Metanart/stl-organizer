import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { useRequestState } from '@renderer/utils/useRequestState'

import { RemoveDTO } from '@shared/domains/Common/dtos/DTOs'
import {
  SourceCreateDTO,
  SourceCreateFormDTO,
  SourceDTO,
  SourceFormDTO,
  SourceUpdateDTO,
  SourceUpdateFormDTO
} from '@shared/domains/Sources/dto/SourceDTO'

import { SourcesApi } from '../api/SourcesApi'
import { SourcesMapper } from '../mappers/SourcesMapper'
import { SourcesState } from '../types/Source.types'

import { SourcesContext } from './SourcesContext'

export const SourcesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [sources, setSources] = useState<SourcesState | undefined>(undefined)

  const { isLoading, error, processApiRequest } = useRequestState()

  const load = async (): Promise<void> => {
    const response = await processApiRequest(SourcesApi.getAll)

    if (response.data !== null && response.data.length > 0) {
      const sourcesArr = SourcesMapper.mapArray(response.data, SourceDTO, SourceFormDTO)

      const sourcesState: SourcesState = {}

      sourcesArr.forEach((source) => {
        sourcesState.id = source
      })

      setSources(sourcesState)
    }
  }

  const update = async (source: SourceUpdateFormDTO): Promise<void> => {
    const inputDTO = SourcesMapper.map(source, SourceUpdateFormDTO, SourceUpdateDTO)
    const response = await processApiRequest(async () => SourcesApi.update(inputDTO))

    if (response.data !== null) {
      const updatedSource = SourcesMapper.map(response.data, SourceDTO, SourceFormDTO)

      setSources((prevState) => {
        return {
          ...prevState,
          [updatedSource.id]: updatedSource
        }
      })
    }
  }

  const create = async (source: SourceCreateFormDTO): Promise<void> => {
    const inputDTO = SourcesMapper.map(source, SourceCreateFormDTO, SourceCreateDTO)

    const response = await processApiRequest(async () => SourcesApi.create(inputDTO))

    if (response.data !== null) {
      const createdSource = SourcesMapper.map(response.data, SourceDTO, SourceFormDTO)

      setSources((prevState) => {
        return {
          ...prevState,
          [createdSource.id]: createdSource
        }
      })
    }
  }

  const remove = async (source: RemoveDTO): Promise<void> => {
    const response = await processApiRequest(async () => SourcesApi.remove(source))

    if (response.data === true) {
      setSources((prevState) => {
        if (prevState?.[source.id]) {
          delete prevState[source.id]
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
