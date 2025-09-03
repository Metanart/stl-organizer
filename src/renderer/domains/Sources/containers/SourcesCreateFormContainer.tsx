import { FC, PropsWithChildren, useCallback } from 'react'
import { useI18nContext } from '@i18n/i18n-react.generated'
import { notify } from '@renderer/utils/notify'

import { SourceCreateFormDTO } from '@shared/domains/Sources/Sources.dtos'
import { createLog } from '@shared/utils/logs/createLog'

import { useCreateSourceMutation } from '../api/useCreateSourceMutation'
import { SourcesCreateForm } from '../components/SourcesCreateForm/SourcesCreateForm'

const log = createLog({ category: 'RENDERER', tag: 'Sources' })

export const SourcesCreateFormContainer: FC<PropsWithChildren> = () => {
  const [createSource, { isLoading: isCreating }] = useCreateSourceMutation()
  const { LL } = useI18nContext()

  const handleSave = useCallback(
    async (sourceCreateFormDTO: SourceCreateFormDTO, isDirty: boolean): Promise<void> => {
      if (!isDirty) {
        notify(LL.sources.createForm.notify.isEmpty(), 'warning')
        return
      }

      try {
        await createSource(sourceCreateFormDTO).unwrap()
        notify(LL.sources.createForm.notify.success(), 'success')
      } catch (error) {
        const errorMessage = String(error)
        log.error(errorMessage || LL.sources.createForm.notify.failedCreate(), error)
        notify(errorMessage || LL.sources.createForm.notify.failedCreate(), 'error')
      }
    },
    [createSource, LL]
  )

  return <SourcesCreateForm onSave={handleSave} isDisabled={isCreating} />
}
