import { createContext } from 'react'

import { SourcesContextType } from './types'

export const SourcesContext = createContext<SourcesContextType>({} as SourcesContextType)
