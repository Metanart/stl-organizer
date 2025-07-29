import { FC, PropsWithChildren, useCallback } from 'react'
import { useI18nContext } from '@i18n/i18n-react.generated'

import { SourceCreateFormDTO } from '@shared/domains/Sources/Sources.dtos'
import { createLog } from '@shared/utils/createLog'

import { useCreateSourceMutation } from '../api/SourcesApi'
import { SourcesCreateForm } from '../components/SourcesCreateForm/SourcesCreateForm'

const log = createLog({ category: 'RENDERER', tag: 'Sources' })

export const SourcesCreateFormContainer: FC<PropsWithChildren> = (props) => {
  const [createSource, { isLoading: isUpdating }] = useCreateSourceMutation()

  const { LL } = useI18nContext()

  const handleCreate = useCallback(
    async (sourceCreateFormDTO: SourceCreateFormDTO): Promise<void> => {
      try {
        await createSource(sourceCreateFormDTO).unwrap()
      } catch (error) {
        log.error(LL.sources.errors.failedCreate(), error)
      }
    },
    [createSource, LL.sources.errors]
  )

  return <SourcesCreateForm onSave={handleCreate} />
}
