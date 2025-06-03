import { DataSource } from 'typeorm'

import { ConfigEntity } from './entities/ConfigEntity'
import { PathEntity } from './entities/PathEntity'

export const DBSource = new DataSource({
  type: 'sqlite',
  database: './stl.db',
  synchronize: true, // ⚠️ Только для dev!
  entities: [PathEntity, ConfigEntity]
})
