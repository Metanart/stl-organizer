import { createContext } from 'react'

import { ConfigContextType } from '../types/Config.types'

export const ConfigContext = createContext<ConfigContextType>({} as ConfigContextType)
