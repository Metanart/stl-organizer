import AssignmentIcon from '@mui/icons-material/Assignment'
import { AppRoute } from '@renderer/domains/App/types/App.types'

import { TasksPage } from '../pages/TasksPage'

export const TasksRoute: AppRoute = {
  id: 'TasksRoute',
  icon: <AssignmentIcon />,
  path: '/Tasks',
  element: <TasksPage />,
  namespace: 'tasks'
}
