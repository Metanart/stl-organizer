import { useContext } from 'react'

import { SourcesContext } from '../SourcesContext'
import { SourcesContextType } from '../types'

export const useSourcesContext = (): SourcesContextType => {
  const context = useContext(SourcesContext)
  if (!context) throw new Error('useSourcesContext must be used within SourcesProvider')
  return context
}
