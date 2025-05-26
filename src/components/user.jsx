import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useLilo } from '../logic/lilo'
import { Header, HeaderSubheader, Segment, Icon } from 'semantic-ui-react'

const ADMIN_ID = 'user-test-01c5d88a-f022-45e9-ada5-028874d02dce'

export default function LogoutButton () {
  const { t } = useTranslation()
  const { lilo } = useLilo()
  const [visible, setVisible] = useState(false)

  const logout = useCallback(async () => {
    await lilo.stytch.session.revoke()
    window.location.href = '/'
  }, [lilo.stytch])

  if (!lilo.loggedIn) {
    return <Link className='ui primary button' to='/auth'><Icon name='user' />{t('titles.login')}</Link>
  }

  const { user } = lilo.stytch.user.getInfo()
  let username = `${user.name.first_name} ${user.name.last_name}`
  if (username === ' ') {
    username = user.emails[0].email.split('@')[0]
  }
  const admin = user.user_id = ADMIN_ID

  return <>
    <div className='ui button' onClick={() => setVisible(!visible)}><Icon name='user' />{t('titles.user')}</div>
    {visible ? <Segment className='user' >
      <Header>
        {username}
        <HeaderSubheader>
          {user.emails[0].email}
        </HeaderSubheader>
      </Header>
      {admin ? <Link className='ui fluid button' to='/admin' style={{ marginBottom: '0.8rem' }}>Admin</Link> : ''}
      <div className='ui fluid button' onClick={logout} ><Icon name='sign-out' />{t('titles.logout')}</div>
    </Segment> : ''}
  </>
}