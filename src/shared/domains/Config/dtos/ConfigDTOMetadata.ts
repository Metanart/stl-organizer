import { PojosMetadataMap } from '@automapper/pojos'

import { CONFIG_DTO_KEYS } from './ConfigDTO'

PojosMetadataMap.create(CONFIG_DTO_KEYS.ConfigDTO, {
  id: String,
  outputFolder: String,
  tempFolder: String,
  maxThreads: Number,
  autoProcessOnScan: Boolean,
  autoArchiveOnComplete: Boolean,
  useMultithreading: Boolean,
  debugMode: Boolean
})

PojosMetadataMap.create(CONFIG_DTO_KEYS.ConfigFormDTO, {
  id: String,
  outputFolder: String,
  tempFolder: String,
  maxThreads: Number,
  autoProcessOnScan: Boolean,
  autoArchiveOnComplete: Boolean,
  useMultithreading: Boolean,
  debugMode: Boolean
})

PojosMetadataMap.create(CONFIG_DTO_KEYS.ConfigUpdateDTO, {
  id: String,
  outputFolder: String,
  tempFolder: String,
  maxThreads: Number,
  autoProcessOnScan: Boolean,
  autoArchiveOnComplete: Boolean,
  useMultithreading: Boolean,
  debugMode: Boolean
})

PojosMetadataMap.create(CONFIG_DTO_KEYS.ConfigUpdateFormDTO, {
  id: String,
  outputFolder: String,
  tempFolder: String,
  maxThreads: Number,
  autoProcessOnScan: Boolean,
  autoArchiveOnComplete: Boolean,
  useMultithreading: Boolean,
  debugMode: Boolean
})
