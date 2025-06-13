import { FC, PropsWithChildren, useEffect, useState } from 'react'

import { ConfigState } from '../types'

import { invokeConfigGet, invokeConfigUpdate } from './utils/ipc-invokers'
import { mapFromConfigStateToDTO, mapFromDTOToConfigState } from './utils/mappers'
import { ConfigContext } from './ConfigContext'

export const ConfigProvider: FC<PropsWithChildren> = ({ children }) => {
  const [config, setConfig] = useState<ConfigState | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleResponse = async (handlerFn): Promise<void> => {
    setIsLoading(true)
    setError(null)

    const response = await handlerFn()

    if (response.error) {
      setError(response.error)
      setConfig(null)
    } else if (!response.data) {
      setError('Empty config received')
      setConfig(null)
    } else {
      setConfig(mapFromDTOToConfigState(response.data))
    }

    setIsLoading(false)
  }

  const load = async (): Promise<void> => {
    handleResponse(async () => invokeConfigGet())
  }

  const update = async (state: ConfigState): Promise<void> => {
    handleResponse(async () => invokeConfigUpdate(mapFromConfigStateToDTO(state)))
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
