import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import 'semantic-ui-css/semantic.min.css'
import './App.css'

import useAuthData from './logic/lilo/use-auth-data'

import { LiloProvider } from './logic/lilo'

import Home from './pages/home'
import Admin from './pages/admin'
import Player from './pages/player'
import Auth from './pages/auth'

const liloSettings = {
  collections: {
    videos: {
      type: 'collection',
      collection: 'videos',
      createIfEmpty: false,
      protectedFields: ['video_id']
    }
  }
}

export default function App() {
  const { i18n } = useTranslation()
  const { loggedIn } = useAuthData()
  console.log('loggedIn', loggedIn)

  return <div className={`App ${i18n.dir()}`}>
    <Router>
      <Routes>
        <Route path='/' element={<LiloProvider settings={liloSettings}><Home /></LiloProvider>} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/admin' element={<LiloProvider settings={liloSettings}><Admin /></LiloProvider>} />
        <Route path='/course/:courseId/player/:videoId' element={<Player />} />
      </Routes>
    </Router>
  </div>
}
