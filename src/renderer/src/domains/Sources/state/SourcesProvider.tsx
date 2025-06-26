import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { useRequestState } from '@renderer/utils/useRequestState'

import { RemoveDTO } from '@shared/domains/Common/dtos/DTOs'
import {
  SourceCreateDTO,
  SourceCreateFormDTO,
  SourceDTO,
  SourceFormDTO,
  SOURCES_DTO_KEYS,
  SourceUpdateDTO,
  SourceUpdateFormDTO
} from '@shared/domains/Sources/dtos/SourceDTO'

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
      const sourcesArr = SourcesMapper.mapArray<SourceDTO, SourceFormDTO>(
        response.data,
        SOURCES_DTO_KEYS.SourceDTO,
        SOURCES_DTO_KEYS.SourceFormDTO
      )

      const sourcesState: SourcesState = {}

      sourcesArr.forEach((source) => {
        sourcesState.id = source
      })

      setSources(sourcesState)
    }
  }

  const update = async (source: SourceUpdateFormDTO): Promise<void> => {
    const updateDTO = SourcesMapper.map<SourceUpdateFormDTO, SourceUpdateDTO>(
      source,
      SOURCES_DTO_KEYS.SourceUpdateFormDTO,
      SOURCES_DTO_KEYS.SourceUpdateDTO
    )
    const response = await processApiRequest(async () => SourcesApi.update(updateDTO))

    if (response.data !== null) {
      const updatedSource = SourcesMapper.map<SourceDTO, SourceFormDTO>(
        response.data,
        SOURCES_DTO_KEYS.SourceDTO,
        SOURCES_DTO_KEYS.SourceFormDTO
      )

      setSources((prevState) => {
        return {
          ...prevState,
          [updatedSource.id]: updatedSource
        }
      })
    }
  }

  const create = async (source: SourceCreateFormDTO): Promise<void> => {
    const createDTO = SourcesMapper.map<SourceCreateFormDTO, SourceCreateDTO>(
      source,
      SOURCES_DTO_KEYS.SourceCreateFormDTO,
      SOURCES_DTO_KEYS.SourceCreateDTO
    )

    const response = await processApiRequest(async () => SourcesApi.create(createDTO))

    if (response.data !== null) {
      const createdSource = SourcesMapper.map<SourceDTO, SourceFormDTO>(
        response.data,
        SOURCES_DTO_KEYS.SourceDTO,
        SOURCES_DTO_KEYS.SourceFormDTO
      )

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
