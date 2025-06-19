import { AppRoute } from './domains/App/types/App.types'
import { ConfigRoute } from './domains/Config/routes/ConfigRoute'
import { HomeRoute } from './domains/Home/routes/HomeRoute'
import { ModelsRoute } from './domains/Models/routes/ModelsRoute'
import { SourceRoute } from './domains/Sources/routes/SourceRoute'

export const ROUTES: AppRoute[] = [HomeRoute, ModelsRoute, SourceRoute, ConfigRoute]
