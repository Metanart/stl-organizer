import { createContext } from 'react'

import { ConfigContextType } from '../types'

export const ConfigContext = createContext<ConfigContextType>({} as ConfigContextType)
