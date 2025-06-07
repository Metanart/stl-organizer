import { useContext } from 'react'

import { ConfigContextType } from '../../Config.types'
import { ConfigContext } from '../ConfigContext'

export const useConfigContext = (): ConfigContextType => {
  const context = useContext(ConfigContext)
  if (!context) throw new Error('useConfig must be used within ConfigProvider')
  return context
}
