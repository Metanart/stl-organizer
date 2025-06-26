import { app } from 'electron'
import path from 'path'
import { DataSource } from 'typeorm'

import { AppPaths } from '@shared/paths'

import { Config } from '../domains/Config/entities/Config'

export const dbPath = path.join(app.getPath('userData'), 'stl-organizer.sqlite')

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: AppPaths.defaultDBFile,
  entities: [Config],
  synchronize: true, // 🔧 DEV FLAG
  logging: false,
  cache: false
})
