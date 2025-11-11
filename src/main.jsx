import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import LoginProvider from './Contexts/LoginContext.jsx'
import HomeProvider from './Contexts/HomeContext.jsx'
import CreateWorkspaceProvider from './Contexts/CreateWorkspaceContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <LoginProvider>
      <CreateWorkspaceProvider>
        <HomeProvider>
          <App />
        </HomeProvider>
      </CreateWorkspaceProvider>
    </LoginProvider>
  </BrowserRouter>
)
