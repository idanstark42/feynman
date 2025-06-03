import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useLilo } from '../logic/lilo'
import { Header, HeaderSubheader, Segment, Icon } from 'semantic-ui-react'

export default function User () {
  const { t } = useTranslation()
  const { lilo } = useLilo()
  const [visible, setVisible] = useState(false)

  const logout = useCallback(async () => {
    await lilo.stytch.session.revoke()
    window.location.href = '/'
  }, [lilo.stytch])

  if (!lilo.loggedIn) {
    return <Link className='ui primary button' to='/auth'><Icon name='user' />{t('actions.login')}</Link>
  }

  const { username, email, admin } = lilo.userInfo

  return <>
    <div className='ui button' onClick={() => setVisible(!visible)}><Icon name='user' />{t('titles.user')}</div>
    {visible ? <Segment className='user' >
      <Header>
        {username}
        <HeaderSubheader>
          {email}
        </HeaderSubheader>
      </Header>
      {admin ? <Link className='ui fluid button' to='/admin' style={{ marginBottom: '0.8rem' }}>Admin</Link> : ''}
      <Link className='ui fluid button' to='/edit-user' style={{ marginBottom: '0.8rem' }}><Icon name='edit' />{t('actions.edit')}</Link>
      <div className='ui fluid button' onClick={logout} ><Icon name='sign-out' />{t('actions.logout')}</div>
    </Segment> : ''}
  </>
}