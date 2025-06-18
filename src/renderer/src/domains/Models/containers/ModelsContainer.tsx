import { FC } from 'react'

import { ModelsCard } from '../components/ModelsCard'
import { ModelsGallery } from '../components/ModelsGallery'

const staticModeslList = [
  {
    id: 1,
    title: 'Title',
    createdAt: 'Some date',
    thumbnailUrl: 'Some url',
    comment: 'Some comment'
  },
  {
    id: 1,
    title: 'Title',
    createdAt: 'Some date',
    thumbnailUrl: 'Some url',
    comment: 'Some comment'
  },
  {
    id: 1,
    title: 'Title',
    createdAt: 'Some date',
    thumbnailUrl: 'Some url',
    comment: 'Some comment'
  },
  {
    id: 1,
    title: 'Title',
    createdAt: 'Some date',
    thumbnailUrl: 'Some url',
    comment: 'Some comment'
  },
  {
    id: 1,
    title: 'Title',
    createdAt: 'Some date',
    thumbnailUrl: 'Some url',
    comment: 'Some comment'
  },
  {
    id: 1,
    title: 'Title',
    createdAt: 'Some date',
    thumbnailUrl: 'Some url',
    comment: 'Some comment'
  }
]

export const ModelsContainer: FC = () => {
  return (
    <ModelsGallery>
      {staticModeslList.map((model) => {
        return (
          <ModelsCard
            key={model.id}
            title={model.title}
            createdAt={model.createdAt}
            thumbnailUrl={model.thumbnailUrl}
            comment={model.comment}
            onAddFavorite={() => null}
            onDelete={() => null}
          />
        )
      })}
    </ModelsGallery>
  )
}
