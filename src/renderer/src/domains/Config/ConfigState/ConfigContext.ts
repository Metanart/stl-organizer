import { createContext } from 'react'

import { ConfigContextType } from '../Config.types'

export const ConfigContext = createContext<ConfigContextType>({} as ConfigContextType)
