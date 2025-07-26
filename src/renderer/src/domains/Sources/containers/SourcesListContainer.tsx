import { FC } from 'react'
import { Message } from '@renderer/domains/Common/components/Message'
import { PageLoader } from '@renderer/domains/Common/components/Page/PageLoader/PageLoader'

import { SourceForm } from '../types/Source.types'

export const SourcesListContainer: FC = () => {
  const isLoading = true
  const sources: SourceForm[] = []
  const error = 'Error'

  console.log('SourcesListContainer')

  console.log('[DEBUG]: ', sources, isLoading, error)

  if (isLoading) {
    console.log('[DEBUG]: ', 'SourcesListContainer Loading')
    return <PageLoader />
  }

  if (!sources) return <Message type="error" message="No sources has been found" />

  return <div>{error ? <Message type="error" message={error} /> : null}</div>
}
