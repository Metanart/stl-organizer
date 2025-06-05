import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'

import { AppContainer } from './domains/App/AppContainer'
import { ROUTES } from './routes'

import 'reset.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
    <HashRouter>
      <AppContainer>
        <Routes>
          {ROUTES.map(({ id, path, element }) => (
            <Route key={id} path={path} element={element} />
          ))}
        </Routes>
      </AppContainer>
    </HashRouter>
  </StrictMode>
)
