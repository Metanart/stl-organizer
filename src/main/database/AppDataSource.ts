import { app } from 'electron'
import path from 'path'
import { DataSource } from 'typeorm'

import { Source } from '../domains/Sources/entities/Source'

import { Config } from './models/common/Config'

export const dbPath = path.join(app.getPath('userData'), 'stl-organizer.sqlite')

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: dbPath,
  entities: [Config, Source],
  synchronize: true, // 🔧 DEV FLAG
  logging: false,
  cache: false
})
