import { FC } from 'react'
import { Loader } from '@renderer/domains/Common/components/Loader'
import { Message } from '@renderer/domains/Common/components/Message'

import { SourcesCard } from '../components/SourcesCard'
import { SourcesList } from '../components/SourcesList'
import { useSourcesContext } from '../state/useSourcesContext'
import { Source } from '../types/Source.types'

export const SourcesListContainer: FC = () => {
  const { isLoading, sources, error, update, remove } = useSourcesContext()

  const handleSave = (source: Source): void => {
    update(source)
  }

  const handleRemove = (id: number): void => {
    remove({ id })
  }

  if (isLoading) return <Loader />

  if (!sources) return <Message type="error" message="Config not found" />

  return (
    <SourcesList>
      {error ? <Message type="error" message={error} /> : null}
      {Object.values(sources).map((item) => (
        <SourcesCard key={item.id} {...item} onRemove={handleRemove} onSave={handleSave} />
      ))}
    </SourcesList>
  )
}
