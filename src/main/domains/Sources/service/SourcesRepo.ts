import { createSource } from './createSource'
import { getAllSources } from './getAllSources'
import { removeSource } from './removeSource'
import { updateSource } from './updateSource'

export const SourcesRepo = {
  create: createSource,
  remove: removeSource,
  update: updateSource,
  getAll: getAllSources
}
