import { FC, JSX } from 'react'

import { Message } from '../../Common/components/Message'
import { Config } from '../components/Config'
import { ConfigSkeleton } from '../components/ConfigSkeleton'
import { useConfigContext } from '../state/useConfigContext'
import { ConfigState } from '../types/Config.types'

export const ConfigContainer: FC = () => {
  const { config, isLoading, update, error } = useConfigContext()

  console.log('ConfigContainer')

  // @TODO Add form data validation

  const handleSubmit = async (updatedConfig: ConfigState): Promise<void> => {
    await update(updatedConfig)
  }

  const renderContent = (): JSX.Element => {
    if (isLoading) return <ConfigSkeleton />

    if (error) return <Message type="error" message={error} />

    if (!config) return <Message type="error" message="Config not found" />

    return <Config config={config} onSubmit={handleSubmit} />
  }

  return renderContent()
}
