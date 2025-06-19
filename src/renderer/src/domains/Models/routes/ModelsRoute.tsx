import ViewInArIcon from '@mui/icons-material/ViewInAr'
import { AppRoute } from '@renderer/domains/App/types/App.types'

import { ModelsPage } from '../pages/ModelsPage'
export const ModelsRoute: AppRoute = {
  id: 'ModelsRoute',
  text: 'Models',
  icon: <ViewInArIcon />,
  path: '/Models',
  element: <ModelsPage />
}
