import { PojosMetadataMap } from '@automapper/pojos'

import { CONFIG_DTO_KEYS } from './Config.dtos'

PojosMetadataMap.create(CONFIG_DTO_KEYS.ConfigDTO, {
  outputFolder: String,
  tempFolder: String,
  maxThreads: Number,
  autoProcessOnScan: Boolean,
  autoArchiveOnComplete: Boolean,
  useMultithreading: Boolean,
  debugMode: Boolean
})

PojosMetadataMap.create(CONFIG_DTO_KEYS.ConfigFormDTO, {
  outputFolder: String,
  tempFolder: String,
  maxThreads: Number,
  autoProcessOnScan: Boolean,
  autoArchiveOnComplete: Boolean,
  useMultithreading: Boolean,
  debugMode: Boolean
})

PojosMetadataMap.create(CONFIG_DTO_KEYS.ConfigUpdateDTO, {
  outputFolder: String,
  tempFolder: String,
  maxThreads: Number,
  autoProcessOnScan: Boolean,
  autoArchiveOnComplete: Boolean,
  useMultithreading: Boolean,
  debugMode: Boolean
})

PojosMetadataMap.create(CONFIG_DTO_KEYS.ConfigUpdateFormDTO, {
  outputFolder: String,
  tempFolder: String,
  maxThreads: Number,
  autoProcessOnScan: Boolean,
  autoArchiveOnComplete: Boolean,
  useMultithreading: Boolean,
  debugMode: Boolean
})
