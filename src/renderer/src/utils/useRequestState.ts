import { useState } from 'react'

import { IpcResponse } from '@shared/domains/Common/types/ipc.types'

import { IpcInvokerWrapper } from './createIpcInvoker'

type HandleRequest = <ResponseType, PayloadType = void>(
  requestFn: IpcInvokerWrapper<ResponseType, PayloadType>
) => Promise<IpcResponse<ResponseType>>

type RequestState = () => {
  isLoading: boolean
  error: string | null
  setError: (error: string | null) => void
  setIsLoading: (isLoading: boolean) => void
  handleRequest: HandleRequest
}

export const useRequestState: RequestState = function () {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleRequest: HandleRequest = async function <ResponseType, PayloadType = void>(
    requestFn: IpcInvokerWrapper<ResponseType, PayloadType>
  ): Promise<IpcResponse<ResponseType>> {
    const response = await requestFn()

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
    handleRequest
  }
}
