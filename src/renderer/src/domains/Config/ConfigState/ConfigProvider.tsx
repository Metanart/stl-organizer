import { FC, PropsWithChildren, useEffect, useState } from 'react'

import { ConfigState } from '@shared/types/config'
import { createLog } from '@shared/utils/createLog'

import { ConfigContext } from './ConfigContext'
import { fetchConfigGet, fetchConfigUpdate } from './ConfigIpc'

const log = createLog({ channel: 'ConfigProvider' })

export const ConfigProvider: FC<PropsWithChildren> = ({ children }) => {
  const [config, setConfig] = useState<ConfigState | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = async (): Promise<void> => {
    setIsLoading(true)
    setError(null)

    const response = await fetchConfigGet()

    if (response.error) {
      setError(response.error)
      setConfig(null)
    } else if (!response.data) {
      setError('Empty config received')
      setConfig(null)
    } else {
      log.success(`Loaded config`, response.data)
      setConfig(response.data)
    }

    setIsLoading(false)
  }

  const update = async (payload: ConfigState): Promise<void> => {
    setIsLoading(true)
    setError(null)

    log.info(`Called update with payload`, payload)

    const response = await fetchConfigUpdate(payload)

    if (response.error) {
      setError(response.error)
      setConfig(null)
    } else if (!response.data) {
      setError('Empty config received')
      setConfig(null)
    } else {
      log.success(`Updated config`, response.data)
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
