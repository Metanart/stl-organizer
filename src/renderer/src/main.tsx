import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import { AppContainer } from './domains/App/AppContainer'
import { AppRoutesContainerMemo } from './domains/App/AppRoutesContainer'
import { ConfigProvider } from './domains/Config/ConfigState/ConfigProvider'

import 'reset.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <HashRouter>
    <AppContainer>
      <ConfigProvider>
        <AppRoutesContainerMemo />
      </ConfigProvider>
    </AppContainer>
  </HashRouter>
)
