import { FC, memo } from 'react'
import { Route, Routes } from 'react-router-dom'

import { ROUTES } from '../../routes'

export const AppRoutes: FC = () => (
  <Routes>
    {ROUTES.map(({ id, path, element }) => (
      <Route key={id} path={path} element={element} />
    ))}
  </Routes>
)

export const AppRoutesMemoized = memo(AppRoutes)
