import { FC, JSX, useContext } from 'react'

import { ConfigState } from '@shared/types/config'

import { Message } from '../Common/Message'

import { ConfigContext } from './ConfigState/ConfigContext'
import { Config } from './Config'
import { ConfigSkeleton } from './ConfigSkeleton'

export const ConfigContainer: FC = () => {
  const { config, isLoading, update, error } = useContext(ConfigContext)

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
