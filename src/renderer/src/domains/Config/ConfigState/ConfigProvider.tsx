import { FC, PropsWithChildren, useEffect, useState } from 'react'

import { logger } from '@shared/utils/logger'

import { ConfigState } from '../Config.types'

import { invokeConfigGet, invokeConfigUpdate } from './ConfigApi'
import { ConfigContext } from './ConfigContext'

const log = logger.withTag('ConfigProvider')

export const ConfigProvider: FC<PropsWithChildren> = ({ children }) => {
  const [config, setConfig] = useState<Partial<ConfigState>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>()

  const load = async (): Promise<void> => {
    setIsLoading(true)

    const response = await invokeConfigGet()

    log.log('Invoke config get', response)

    if (response.error) setError(response.error)
    if (response.data) setConfig(response.data)
    setIsLoading(false)
  }

  const update = async (payload: Partial<ConfigState>): Promise<void> => {
    setIsLoading(true)
    const response = await invokeConfigUpdate(payload)
    if (response.error) setError(response.error)
    if (response.data) setConfig(response.data)
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
