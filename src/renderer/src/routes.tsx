import { ReactElement } from 'react'
import HomeIcon from '@mui/icons-material/Home'
import SettingsIcon from '@mui/icons-material/Settings'

import { HomePage } from './domains/Home/HomePage'
import { SourcesPage } from './domains/SourceFolders/SourceFoldersPage'

type AppRoute = {
  id: string
  text: string
  icon: ReactElement
  path: string
  element: ReactElement
}

export const ROUTES: AppRoute[] = [
  { id: 'RouteHome', text: 'Home', icon: <HomeIcon />, path: '/', element: <HomePage /> },
  {
    id: 'RouteSources',
    text: 'Sources',
    icon: <SettingsIcon />,
    path: '/sources',
    element: <SourcesPage />
  }
]
