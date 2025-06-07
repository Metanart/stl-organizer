import { FC, PropsWithChildren, useState } from 'react'

import { ConfigState } from '../Config.types'

import { ConfigContext } from './ConfigContext'

export const ConfigProvider: FC<PropsWithChildren> = ({ children }) => {
  const [config, setConfig] = useState<Partial<ConfigState>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>()

  return (
    <ConfigContext.Provider value={{ config, isLoading, error }}>{children}</ConfigContext.Provider>
  )
}
