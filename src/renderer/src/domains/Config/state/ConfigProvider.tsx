import { FC, PropsWithChildren, useEffect, useState } from 'react'

import { ConfigState } from '../types'

import { invokeConfigGet, invokeConfigUpdate } from './utils/ipc-invokers'
import { ConfigContext } from './ConfigContext'

export const ConfigProvider: FC<PropsWithChildren> = ({ children }) => {
  const [config, setConfig] = useState<ConfigState | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = async (): Promise<void> => {
    setIsLoading(true)
    setError(null)

    const response = await invokeConfigGet()

    if (response.error) {
      setError(response.error)
      setConfig(null)
    } else if (!response.data) {
      setError('Empty config received')
      setConfig(null)
    } else {
      setConfig(response.data)
    }

    setIsLoading(false)
  }

  const update = async (payload: ConfigState): Promise<void> => {
    setIsLoading(true)
    setError(null)

    const response = await invokeConfigUpdate(payload)

    if (response.error) {
      setError(response.error)
      setConfig(null)
    } else if (!response.data) {
      setError('Empty config received')
      setConfig(null)
    } else {
      setConfig(response.data)
    }

    setIsLoading(false)
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
