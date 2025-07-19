// src/components/ErrorFallback.tsx
import { FC } from 'react'

import { Message } from '../../Message'

type Props = {
  error: Error
  resetErrorBoundary: () => void
}

export const ErrorFallback: FC<Props> = ({ error }) => {
  return <Message type="error" message={`Something went wrong: ${error.message}`} />
}
