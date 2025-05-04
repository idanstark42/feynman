import { useEffect, useState } from 'react'
import { Products } from '@stytch/vanilla-js'
import {
  StytchLogin,
  StytchPasswordReset,
  useStytch,
  useStytchSession
} from '@stytch/react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import Logo from '../assets/light-mode-favicon.png'

export default function Auth() {
  const stytch = useStytch()
  const { session } = useStytchSession();

  useEffect(() => {
    if (session) {
      window.location.href = '/'
    }

    const token = new URLSearchParams(window.location.search).get('token')
    const tokenType = new URLSearchParams(window.location.search).get('stytch_token_type')

    if (tokenType === 'reset_password') {
      window.location.href = `/reset-password?token=${token}`
    }
  }, [stytch, session])

  const config = {
    passwordOptions: {
      loginExpirationMinutes: 30,
      loginRedirectURL: window.location.origin + '/authenticate',
      resetPasswordExpirationMinutes: 30,
      resetPasswordRedirectURL: window.location.origin + '/reset-password',
    },
    products: [
      Products.passwords,
    ],
  }

  const styles = {
    fontFamily: 'Rubik, sans-serif',
    colors: {
      primary: '#172a3b'
    },
    logo: {
      logoImageUrl: Logo
    }
  }

  return <div className='auth centering'>
    <Router>
      <Routes>
        <Route path='/' element={<StytchLogin config={config} styles={styles} />} />
        <Route path='/reset-password' element={<StytchPasswordReset config={config} styles={styles} passwordResetToken={new URLSearchParams(window.location.search).get('token')} />} />
      </Routes>
    </Router>
  </div>
}
