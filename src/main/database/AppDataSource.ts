import { Source } from '@main/domains/Sources/entities/Source'
import { DataSource } from 'typeorm'

import { AppPaths } from '@shared/paths'

import { Config } from '../domains/Config/entities/Config'

const isTest = process.env.NODE_ENV === 'test'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: isTest ? ':memory:' : AppPaths.defaultDBFile,
  entities: [Config, Source],
  synchronize: true, // 🔧 DEV FLAG
  logging: false,
  cache: false
})
