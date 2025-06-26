import { createMap, createMapper } from '@automapper/core'
import { pojos } from '@automapper/pojos'
import { PojosMetadataMap } from '@automapper/pojos'

import { CONFIG_DTO_KEYS, ConfigDTO } from '@shared/domains/Config/dtos/ConfigDTO'

import { Config } from '../entities/Config'

import '@shared/domains/Config/dtos/ConfigDTOMetadata'

PojosMetadataMap.create<Config>(CONFIG_DTO_KEYS.Config, {
  id: String,
  outputFolder: String,
  tempFolder: String,
  maxThreads: Number,
  autoProcessOnScan: Boolean,
  autoArchiveOnComplete: Boolean,
  useMultithreading: Boolean,
  debugMode: Boolean
})

export const ConfigMapper = createMapper({
  strategyInitializer: pojos()
})

createMap<Config, ConfigDTO>(ConfigMapper, CONFIG_DTO_KEYS.Config, CONFIG_DTO_KEYS.ConfigDTO)
