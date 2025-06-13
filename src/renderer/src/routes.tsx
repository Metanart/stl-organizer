import { ReactElement } from 'react'
import FormatListBulletedAddIcon from '@mui/icons-material/FormatListBulletedAdd'
import HomeIcon from '@mui/icons-material/Home'
import SettingsIcon from '@mui/icons-material/Settings'

import { ConfigPage } from './domains/Config/pages/ConfigPage'
import { HomePage } from './domains/Home/pages/HomePage'
import { SourcesPage } from './domains/Sources/pages/SourcesPage'

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
    icon: <FormatListBulletedAddIcon />,
    path: '/sources',
    element: <SourcesPage />
  },
  {
    id: 'RouteConfig',
    text: 'Config',
    icon: <SettingsIcon />,
    path: '/config',
    element: <ConfigPage />
  }
]
