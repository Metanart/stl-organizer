import { useState } from 'react'

import { ApiHandlerWrapped, ApiResponse } from '@shared/domains/Common/types/Api.types'

type ProcessApiRequest = <R>(apiHandlerWrapped: ApiHandlerWrapped<R>) => Promise<ApiResponse<R>>

type RequestState = () => {
  isLoading: boolean
  error?: string
  setError: (error: string | undefined) => void
  setIsLoading: (isLoading: boolean) => void
  processApiRequest: ProcessApiRequest
}

export const useRequestState: RequestState = function () {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | undefined>(undefined)

  const processApiRequest: ProcessApiRequest = async (apiHandlerWrapped) => {
    const response = await apiHandlerWrapped()

    if (response.error) {
      setError(response.error)
      setIsLoading(false)
      return response
    }

    if (!response.data) {
      setError('Empty response')
      setIsLoading(false)
      return { data: null, error: 'Empty response' }
    }

    setIsLoading(false)

    return response
  }

  return {
    isLoading,
    error,
    setError,
    setIsLoading,
    processApiRequest
  }
}
