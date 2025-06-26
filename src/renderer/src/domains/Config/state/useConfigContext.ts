import { useContext } from 'react'

import { ConfigContextType } from '../types/Config.types'

import { ConfigContext } from './ConfigContext'

export const useConfigContext = (): ConfigContextType => {
  console.log('called useConfigContext')

  const context = useContext(ConfigContext)
  if (!context) throw new Error('useConfigContext must be used within ConfigProvider')
  return context
}
