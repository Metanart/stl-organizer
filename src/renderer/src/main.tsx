import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import { AppContainer } from './domains/App/AppContainer'
import { AppRoutes } from './domains/App/AppRoutes'

import 'reset.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
    <HashRouter>
      <AppContainer>
        <AppRoutes />
      </AppContainer>
    </HashRouter>
  </StrictMode>
)
