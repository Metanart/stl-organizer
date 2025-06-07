import { FC, PropsWithChildren, useEffect, useState } from 'react'

import { ConfigState } from '../Config.types'

import { invokeConfigGet, invokeConfigUpdate } from './ConfigApi'
import { ConfigContext } from './ConfigContext'

export const ConfigProvider: FC<PropsWithChildren> = ({ children }) => {
  const [config, setConfig] = useState<Partial<ConfigState>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>()

  const load = async (): Promise<void> => {
    setIsLoading(true)
    const response = await invokeConfigGet()
    if (response.error) setError(response.error)
    if (response.data) setConfig(response.data)
    setIsLoading(false)
  }

  const update = async (payload: Partial<ConfigState>): Promise<void> => {
    const response = await invokeConfigUpdate(payload)
    if (response.error) setError(response.error)
    if (response.data) setConfig(response.data)
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
