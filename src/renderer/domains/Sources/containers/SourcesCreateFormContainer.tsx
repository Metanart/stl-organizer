import { FC, PropsWithChildren, useCallback } from 'react'

import { SourceCreateFormDTO } from '@shared/domains/Sources/Sources.dtos'
import { createLog } from '@shared/utils/createLog'

import { useCreateSourceMutation } from '../api/SourcesApi'
import { SourcesCreateForm } from '../components/SourcesCreateForm/SourcesCreateForm'

const log = createLog({ category: 'RENDERER', tag: 'Sources' })

export const SourcesCreateFormContainer: FC<PropsWithChildren> = () => {
  const [createSource] = useCreateSourceMutation()

  const handleCreate = useCallback(
    async (sourceCreateFormDTO: SourceCreateFormDTO): Promise<void> => {
      try {
        await createSource(sourceCreateFormDTO).unwrap()
      } catch (error) {
        log.error(error)
      }
    },
    [createSource]
  )

  return <SourcesCreateForm onSave={handleCreate} />
}
