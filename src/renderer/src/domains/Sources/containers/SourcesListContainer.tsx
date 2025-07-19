import { FC } from 'react'
import { Message } from '@renderer/domains/Common/components/Message'
import { PageLoader } from '@renderer/domains/Common/components/Page/PageLoader/PageLoader'

import { RemoveDTO } from '@shared/domains/Common/dtos/DTOs'
import { SourceUpdateFormDTO } from '@shared/domains/Sources/dtos/SourceDTO'

import { SourcesCard } from '../components/SourcesCard'
import { SourcesList } from '../components/SourcesList'
import { SourceForm } from '../types/Source.types'

export const SourcesListContainer: FC = () => {
  const isLoading = true
  const sources: SourceForm[] = []
  const error = 'Error'

  console.log('SourcesListContainer')

  console.log('[DEBUG]: ', sources, isLoading, error)

  const handleSave = (source: SourceUpdateFormDTO): void => {
    console.log('[DEBUG]: ', source)
  }

  const handleRemove = (source: RemoveDTO): void => {
    console.log('[DEBUG]: ', source)
  }

  if (isLoading) {
    console.log('[DEBUG]: ', 'SourcesListContainer Loading')
    return <PageLoader />
  }

  if (!sources) return <Message type="error" message="No sources has been found" />

  return (
    <SourcesList>
      {error ? <Message type="error" message={error} /> : null}
      {Object.values(sources).map((item) => (
        <SourcesCard key={item.id} {...item} onRemove={handleRemove} onSave={handleSave} />
      ))}
    </SourcesList>
  )
}
