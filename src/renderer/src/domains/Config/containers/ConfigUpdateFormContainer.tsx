import { FC, JSX, useCallback } from 'react'
import { useI18nContext } from '@i18n/i18n-react.generated'

import { ConfigUpdateFormDTO } from '@shared/domains/Config/Config.dtos'
import { createLog } from '@shared/utils/createLog'

import { Message } from '../../Common/components/Message'
import { useGetConfigQuery, useUpdateConfigMutation } from '../api/ConfigApi'
import { ConfigUpdateForm } from '../components/ConfigUpdateForm/ConfigUpdateForm'

const log = createLog({ category: 'RENDERER', tag: 'Config' })

export const ConfigUpdateFormContainer: FC = () => {
  const { data: configFormDto, isLoading, error } = useGetConfigQuery()

  const [updateConfig, { isLoading: isUpdating }] = useUpdateConfigMutation()

  const { LL } = useI18nContext()

  const handleSave = useCallback(
    async (updatedConfig: ConfigUpdateFormDTO): Promise<void> => {
      try {
        await updateConfig(updatedConfig).unwrap()
      } catch (error) {
        log.error(LL.config.errors.failedUpdate(), error)
      }
    },
    [updateConfig, LL.config.errors]
  )

  const renderContent = (): JSX.Element => {
    if (error) {
      const errorMessage =
        typeof error === 'object' && error !== null && 'message' in error
          ? (error as { message: string }).message
          : 'Unknown error'

      return <Message type="error" message={errorMessage} />
    }

    if (!configFormDto) return <Message type="error" message="Config not found" />

    return <ConfigUpdateForm configFormDto={configFormDto} onSave={handleSave} />
  }

  return renderContent()
}
