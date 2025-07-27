import { FC, JSX, memo } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppTranslationLoader } from '@renderer/domains/App/containers/AppTranslationLoader'
import { ROUTES } from '@renderer/routes'

export const AppRoutesContainer: FC = () => (
  <Routes>
    {ROUTES.map(({ id, path, namespace, element }) => {
      const renderElement = (): JSX.Element => {
        if (!namespace) return element
        return <AppTranslationLoader namespace={namespace}>{element}</AppTranslationLoader>
      }

      return <Route key={id} path={path} element={renderElement()} />
    })}
  </Routes>
)

export const AppRoutesContainerMemo = memo(AppRoutesContainer)
