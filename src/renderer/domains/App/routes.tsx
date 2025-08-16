import { ConfigRoute } from '../Config/routes/ConfigRoute'
import { HomeRoute } from '../Home/routes/HomeRoute'
import { ModelsRoute } from '../Models/routes/ModelsRoute'
import { SourcesRoute } from '../Sources/routes/SourcesRoute'
import { TasksRoute } from '../Tasks/routes/TasksRoute'

import { AppRoute } from './types/App.types'

export const ROUTES: AppRoute[] = [HomeRoute, ModelsRoute, SourcesRoute, TasksRoute, ConfigRoute]
