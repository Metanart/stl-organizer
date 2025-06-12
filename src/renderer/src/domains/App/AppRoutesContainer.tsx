import { FC, memo } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '@renderer/routes'

export const AppRoutesContainer: FC = () => (
  <Routes>
    {ROUTES.map(({ id, path, element }) => (
      <Route key={id} path={path} element={element} />
    ))}
  </Routes>
)

export const AppRoutesContainerMemo = memo(AppRoutesContainer)
