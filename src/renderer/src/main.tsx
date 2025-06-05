import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'

import { ConfigPage } from './pages/ConfigPage'
import { App } from './App'

import './assets/main.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
    <HashRouter>
      <App>
        <Routes>
          <Route path="/" element={<ConfigPage />} />
        </Routes>
      </App>
    </HashRouter>
  </StrictMode>
)
