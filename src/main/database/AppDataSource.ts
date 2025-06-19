import { SourceArchive } from '@main/domains/Sources/entities/SourceArchive'
import { SourceImage } from '@main/domains/Sources/entities/SourceImage'
import { SourceModel } from '@main/domains/Sources/entities/SourceModel'
import { app } from 'electron'
import path from 'path'
import { DataSource } from 'typeorm'

import { Config } from '../domains/Config/entities/Config'
import { Source } from '../domains/Sources/entities/Source'

export const dbPath = path.join(app.getPath('userData'), 'stl-organizer.sqlite')

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: dbPath,
  entities: [Config, Source, SourceModel, SourceArchive, SourceImage],
  synchronize: true, // 🔧 DEV FLAG
  logging: false,
  cache: false
})
