import React, { useCallback } from 'react'
import { useStytch } from '@stytch/react'

export default function LogoutButton () {
  const stytch = useStytch()

  const logout = useCallback(() => {
    stytch.session.revoke()
    window.location.href = '/'
  }, [stytch])

  return <button className='ui primary button' onClick={logout}>Log out</button>
}