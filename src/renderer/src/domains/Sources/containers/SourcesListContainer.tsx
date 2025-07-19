import { FC } from 'react'
import { Loader } from '@renderer/domains/Common/components/Generic/Loader/Loader'
import { Message } from '@renderer/domains/Common/components/Message'

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

  const handleSave = (source: SourceUpdateFormDTO): void => {
    console.log('[DEBUG]: ', source)
  }

  const handleRemove = (source: RemoveDTO): void => {
    console.log('[DEBUG]: ', source)
  }

  if (isLoading) return <Loader />

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
