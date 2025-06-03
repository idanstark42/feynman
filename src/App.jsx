import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import 'semantic-ui-css/semantic.min.css'
import './App.css'

import { LiloProvider } from './logic/lilo'
import { ModalProvider } from './logic/modal'

import Auth from './pages/auth'
import Home from './pages/home'
import Admin from './pages/admin'
import Player from './pages/player'
import EditUser from './pages/edit-user'

const liloSettings = {
  collections: {
    videos: {
      type: 'collection',
      collection: 'videos',
      createIfEmpty: false,
      protectedFields: ['playbackId']
    }
  }
}

export default function App() {
  const { i18n } = useTranslation()

  return <div className={`App ${i18n.dir()}`}>
    <ModalProvider liloSettings={liloSettings}>
      <Router>
        <Routes>
          <Route path='/' element={<LiloProvider settings={liloSettings}><Home /></LiloProvider>} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/admin' element={<LiloProvider settings={liloSettings}><Admin /></LiloProvider>} />
          <Route path='/edit-user' element={<LiloProvider settings={liloSettings}><EditUser /></LiloProvider>} />
          <Route path='/player/:videoId' element={<LiloProvider settings={liloSettings}><Player /></LiloProvider>} />
        </Routes>
      </Router>
    </ModalProvider>
  </div>
}
