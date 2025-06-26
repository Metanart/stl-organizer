import { FC } from 'react'
import { Loader } from '@renderer/domains/Common/components/Loader'
import { Message } from '@renderer/domains/Common/components/Message'

import { RemoveDTO } from '@shared/domains/Common/dto/RemoveDTO'
import { SourceUpdateFormDTO } from '@shared/domains/Sources/dto/SourceDTO'

import { SourcesCard } from '../components/SourcesCard'
import { SourcesList } from '../components/SourcesList'
import { useSourcesContext } from '../state/useSourcesContext'

export const SourcesListContainer: FC = () => {
  const { isLoading, sources, error, update, remove } = useSourcesContext()

  const handleSave = (source: SourceUpdateFormDTO): void => {
    update(source)
  }

  const handleRemove = (source: RemoveDTO): void => {
    remove(source)
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
