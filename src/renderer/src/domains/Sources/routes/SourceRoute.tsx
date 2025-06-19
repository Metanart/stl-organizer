import FolderZipIcon from '@mui/icons-material/FolderZip'
import { AppRoute } from '@renderer/domains/App/types/App.types'

import { SourcesPage } from '../pages/SourcesPage'

export const SourceRoute: AppRoute = {
  id: 'SourcesRoute',
  text: 'Sources',
  icon: <FolderZipIcon />,
  path: '/Sources',
  element: <SourcesPage />
}
