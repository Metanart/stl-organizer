import SettingsIcon from '@mui/icons-material/Settings'
import { AppRoute } from '@renderer/domains/App/types/App.types'

import { ConfigPage } from '../pages/ConfigPage'

export const ConfigRoute: AppRoute = {
  id: 'ConfigRoute',
  text: 'Config',
  icon: <SettingsIcon />,
  path: '/Config',
  element: <ConfigPage />
}
