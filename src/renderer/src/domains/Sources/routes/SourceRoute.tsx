import FormatListBulletedAddIcon from '@mui/icons-material/FormatListBulletedAdd'
import { AppRoute } from '@renderer/domains/App/types/App.types'

import { SourcesPage } from '../pages/SourcesPage'

export const SourceRoute: AppRoute = {
  id: 'SourcesRoute',
  text: 'Sources',
  icon: <FormatListBulletedAddIcon />,
  path: '/sources',
  element: <SourcesPage />
}
