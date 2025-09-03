import { FC, Fragment, JSX, useCallback } from 'react'
import { useI18nContext } from '@i18n/i18n-react.generated'
import { notify } from '@renderer/utils/notify'

import { ConfigUpdateFormDTO } from '@shared/domains/Config/Config.dtos'
import { createLog } from '@shared/utils/logs/createLog'

import { Message } from '../../Common/components/Message'
import { useGetConfigQuery } from '../api/useGetConfigQuery'
import { useUpdateConfigMutation } from '../api/useUpdateConfigMutation'
import { ConfigUpdateForm } from '../components/ConfigUpdateForm/ConfigUpdateForm'

const log = createLog({ category: 'RENDERER', tag: 'Config' })

export const ConfigUpdateFormContainer: FC = () => {
  const { data: configFormDto, isLoading, error } = useGetConfigQuery()
  const [updateConfig, { isLoading: isUpdating }] = useUpdateConfigMutation()

  const { LL } = useI18nContext()

  const handleSave = useCallback(
    async (configUpdateFormDTO: ConfigUpdateFormDTO, isDirty: boolean): Promise<void> => {
      if (!isDirty) {
        notify(LL.config.updateForm.notify.noChanges(), 'warning')
        return
      }

      try {
        await updateConfig(configUpdateFormDTO).unwrap()
        notify(LL.config.updateForm.notify.success(), 'success')
      } catch (error) {
        log.error(LL.config.errors.failedUpdate(), error)
      }
    },
    [updateConfig, LL.config.errors, LL.config.updateForm.notify]
  )

  const renderContent = (): JSX.Element => {
    const isDisabled = isLoading || isUpdating
    let errorComponent: JSX.Element | null = null

    if (error) {
      const errorMessage =
        typeof error === 'object' && error !== null && 'message' in error
          ? (error as { message: string }).message
          : 'Unknown error'

      errorComponent = <Message type="error" message={errorMessage} />
    }

    return (
      <Fragment>
        {errorComponent}
        <ConfigUpdateForm
          isDisabled={isDisabled}
          configFormDto={configFormDto}
          onSave={handleSave}
        />
      </Fragment>
    )
  }

  return renderContent()
}
