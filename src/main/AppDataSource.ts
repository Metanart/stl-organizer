import { app } from 'electron'
import path from 'path'
import { DataSource } from 'typeorm'

import { Config } from './models/common/Config'
import { SourceFolder } from './models/common/SourceFolder'

export const dbPath = path.join(app.getPath('userData'), 'stl-organizer.sqlite')

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: dbPath,
  entities: [Config, SourceFolder],
  synchronize: true, // 🔧 DEV FLAG
  logging: false
})
