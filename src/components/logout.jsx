import React, { useCallback } from 'react'
import { useStytch } from '@stytch/react'
import { useTranslation } from 'react-i18next'

export default function LogoutButton () {
  const { t } = useTranslation()
  const stytch = useStytch()

  const logout = useCallback(async () => {
    await stytch.session.revoke()
    window.location.href = '/'
  }, [stytch])

  return <button className='ui primary button' onClick={logout}>{t('titles.logout')}</button>
}