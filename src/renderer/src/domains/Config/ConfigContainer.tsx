import { FC, useContext, useEffect } from 'react'

import { logger } from '@shared/utils/logger'

import { ConfigContext } from './ConfigState/ConfigContext'
import { Config } from './Config'

const log = logger.withTag('ConfigContainer')

export const ConfigContainer: FC = () => {
  const { config, isLoading } = useContext(ConfigContext)

  useEffect(() => {
    log.log('Try to get config')

    if (isLoading) {
      log.log('Config is loading...')
    }

    if (!isLoading && config) {
      log.success('Config has been loaded:', config)
    }
  }, [config, isLoading])

  return <Config />
}
