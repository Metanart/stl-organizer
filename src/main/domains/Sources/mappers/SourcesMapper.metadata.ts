import { PojosMetadataMap } from '@automapper/pojos'
import { Source } from '@main/domains/Sources/entities/Source'

PojosMetadataMap.create<Source>('Source', {
  id: String,
  path: String,
  name: String,
  comment: String,
  isEnabled: Boolean
})
