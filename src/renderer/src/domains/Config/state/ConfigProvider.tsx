import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { useRequestState } from '@renderer/utils/useRequestState'

import { invokeConfigGet, invokeConfigUpdate } from '../api/ConfigIpcInvokers'
import { Config, ConfigState } from '../types/Config.types'

import { ConfigContext } from './ConfigContext'
import { ConfigMapper } from './ConfigMapper'

export const ConfigProvider: FC<PropsWithChildren> = ({ children }) => {
  const [config, setConfig] = useState<ConfigState | null>(null)

  const { isLoading, error, handleRequest } = useRequestState()

  const load = async (): Promise<void> => {
    const response = await handleRequest(async () => invokeConfigGet())

    if (response.data !== null) {
      const configState: ConfigState = ConfigMapper.fromDTO(response.data)
      setConfig(configState)
    }
  }

  const update = async (config: Config): Promise<void> => {
    const inputDTO = ConfigMapper.toInputDTO(config)

    const response = await handleRequest(async () => invokeConfigUpdate(inputDTO))

    if (response.data !== null) {
      const updatedConfigState = ConfigMapper.fromDTO(response.data)

      setConfig((prevState) => {
        return {
          ...prevState,
          ...updatedConfigState
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
