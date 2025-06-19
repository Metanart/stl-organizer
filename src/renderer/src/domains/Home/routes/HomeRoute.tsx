import HomeIcon from '@mui/icons-material/Home'
import { AppRoute } from '@renderer/domains/App/types/App.types'

import { HomePage } from '../pages/HomePage'

export const HomeRoute: AppRoute = {
  id: 'HomeRoute',
  text: 'Home',
  icon: <HomeIcon />,
  path: '/',
  element: <HomePage />
}
