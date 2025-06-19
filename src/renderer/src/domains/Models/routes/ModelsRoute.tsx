import CollectionsIcon from '@mui/icons-material/Collections'
import { AppRoute } from '@renderer/domains/App/types/App.types'

import { ModelsPage } from '../pages/ModelsPage'

export const ModelsRoute: AppRoute = {
  id: 'ModelsRoute',
  text: 'Models',
  icon: <CollectionsIcon />,
  path: '/models',
  element: <ModelsPage />
}
