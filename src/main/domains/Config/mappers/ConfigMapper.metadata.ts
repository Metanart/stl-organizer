import { PojosMetadataMap } from '@automapper/pojos'

import { CONFIG_DTO_KEYS } from '@shared/domains/Config/Config.dtos'

import { Config } from '../entities/Config'

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
