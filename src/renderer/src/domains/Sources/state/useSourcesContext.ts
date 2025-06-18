import { useContext } from 'react'

import { SourcesContextType } from '../types/Source.types'

import { SourcesContext } from './SourcesContext'

export const useSourcesContext = (): SourcesContextType => {
  const context = useContext(SourcesContext)
  if (!context) throw new Error('useSourcesContext must be used within SourcesProvider')
  return context
}
