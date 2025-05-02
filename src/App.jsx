import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'
import './App.css'

import { useAuthData } from './logic/lilo'

import Topbar from './components/topbar'
import Bottombar from './components/bottombar'

import Home from './pages/home'
import Courses from './pages/courses'
import Videos from './pages/videos'
import Player from './pages/player'

import Auth from './pages/auth'

export default function App() {
  const { loggedIn } = useAuthData()
  console.log('loggedIn', loggedIn)

  return <div className='App'>
    {!loggedIn ? <Auth /> :
    <Router>
      <Topbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/videos' element={<Videos />} />
          <Route path='/player/:id' element={<Player />} />
        </Routes>
      <Bottombar />
    </Router>
  }
  </div>
}
