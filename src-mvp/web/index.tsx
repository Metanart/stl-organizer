import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import 'reset.css'

import { App } from './src/components/App/App'
import { GalleryPage } from './src/pages/GalleryPage'
import { HomePage } from './src/pages/HomePage'
import { PathsPage } from './src/pages/PathsPage'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
    <Router>
      <App>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/paths" element={<PathsPage />} />
        </Routes>
      </App>
    </Router>
  </StrictMode>
)
