import ClerkProviderWithRoutes from './auth/ClerkProviderWithRoutes.jsx'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { HistoryPanel } from './history/HistoryPanel.jsx'
import { Layout } from './layout/Layout.jsx'
import { ChallangeGenerator } from './challenge/ChallangeGenerator.jsx'
import { AuthenticationPage } from './auth/AuthenticationPage.jsx'
import './App.css'

function App() {
  return (
    <ClerkProviderWithRoutes>
      <Routes>
        <Route path="/sign-in/*" element={<AuthenticationPage />} />
        <Route path="/sign-up/" element={<AuthenticationPage />} />
        <Route element={<Layout/>}>
          <Route path="/" element={<ChallangeGenerator />} />
          <Route path="/history" element={<HistoryPanel />} />
        </Route>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </ClerkProviderWithRoutes>
  )
}

export default App
