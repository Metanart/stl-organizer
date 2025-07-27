import FolderZipIcon from '@mui/icons-material/FolderZip'
import { AppRoute } from '@renderer/domains/App/types/App.types'

import { SourcesPage } from '../pages/SourcesPage'

export const SourcesRoute: AppRoute = {
  id: 'SourcesRoute',
  icon: <FolderZipIcon />,
  path: '/Sources',
  element: <SourcesPage />,
  namespace: 'sources'
}
