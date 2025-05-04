import { useStytch } from '@stytch/react'
import { useTranslation } from 'react-i18next'

import Page from '../components/page'

export default function Home () {
  const { t } = useTranslation()
  const { user } = useStytch()
  const info = user.getInfo().user
  const email = info.emails[0].email
  let username = info.name.first_name + ' ' + info.name.last_name
  if (username === ' ') username = email.split('@')[0]

  return <Page className='home'>
  </Page>
}