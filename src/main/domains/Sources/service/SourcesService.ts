import { createSource } from './createSource'
import { getAllSources } from './getAllSources'
import { removeSource } from './removeSource'
import { updateSource } from './updateSource'

export const SourcesService = {
  create: createSource,
  remove: removeSource,
  update: updateSource,
  getAll: getAllSources
}
