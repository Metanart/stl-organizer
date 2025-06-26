import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { useRequestState } from '@renderer/utils/useRequestState'

import {
  ConfigDTO,
  ConfigFormDTO,
  ConfigUpdateDTO,
  ConfigUpdateFormDTO
} from '@shared/domains/Config/dto/ConfigDTO'

import { ConfigApi } from '../api/ConfigApi'
import { ConfigMapper } from '../mappers/ConfigMapper'
import { ConfigState } from '../types/Config.types'

import { ConfigContext } from './ConfigContext'

export const ConfigProvider: FC<PropsWithChildren> = ({ children }) => {
  const [config, setConfig] = useState<ConfigState | null>(null)

  const { isLoading, error, processApiRequest } = useRequestState()

  const load = async (): Promise<void> => {
    const response = await processApiRequest(ConfigApi.get)

    console.log('load', response)

    if (response.data !== null) {
      const configState: ConfigState = ConfigMapper.map(response.data, ConfigDTO, ConfigFormDTO)
      setConfig(configState)
    }
  }

  const update = async (config: ConfigUpdateFormDTO): Promise<void> => {
    const inputDTO = ConfigMapper.map(config, ConfigUpdateFormDTO, ConfigUpdateDTO)
    const response = await processApiRequest(() => ConfigApi.update(inputDTO))

    if (response.data !== null) {
      const updatedConfig = ConfigMapper.map(response.data, ConfigDTO, ConfigFormDTO)

      setConfig((prevState) => {
        return {
          ...prevState,
          ...updatedConfig
        }
      })
    }
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <ConfigContext.Provider value={{ config, isLoading, error, update }}>
      {children}
    </ConfigContext.Provider>
  )
}
