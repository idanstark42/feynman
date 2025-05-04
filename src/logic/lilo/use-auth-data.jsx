import { useStytch } from '@stytch/react'

export default function useAuthData () {
    const stytch = useStytch()
  
    const sessionToken = stytch.session.getTokens()?.session_token
    const loggedIn = Boolean(sessionToken)
    const userId = stytch.user?.getInfo()?.user?.user_id
    const userEmail = stytch.user?.getInfo()?.user?.email
    const userName = stytch.user?.getInfo()?.user?.name
  
    return {
      loggedIn,
      sessionToken,
      userId,
      userEmail,
      userName,
      stytch
    }
  }