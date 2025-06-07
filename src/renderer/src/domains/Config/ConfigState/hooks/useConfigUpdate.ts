import { useEffect, useState } from 'react'

import { ConfigState } from '../../Config.types'

export const useConfigUpdate = (): {
  config: Partial<ConfigState>
  isLoading: boolean
  error?: string
} => {
  const [config, setConfig] = useState<Partial<ConfigState>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | undefined>(undefined)

  useEffect(() => {
    const load = async (): Promise<void> => {
      try {
        const response = await window.api.config.update()

        if (!response.success) {
          throw new Error(response.error || 'Unknown error')
        }

        setConfig(response.data || [])
      } catch (error) {
        console.error('[useSourceFoldersGetAll]', error)
        setError((error as Error).message)
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [])

  return { config, isLoading, error }
}
