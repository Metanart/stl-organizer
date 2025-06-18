import { createContext } from 'react'

import { SourcesContextType } from '../types/Source.types'

export const SourcesContext = createContext<SourcesContextType>({} as SourcesContextType)
