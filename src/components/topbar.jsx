import Logo from './logo'
import { useEffect, useState } from 'react'
import { Menu, Segment, Breadcrumb } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

import UserButton from './user'

export default function Topbar () {
  const { t } = useTranslation()

  return <div id='topbar' style={{ background: 'black' }}>
    <Menu inverted secondary>
      <Menu.Item>
        <Logo size="mini" />
      </Menu.Item>

      <Menu.Item>
      </Menu.Item>

      <Menu.Item position='right'>
        <UserButton />
      </Menu.Item>
    </Menu>
  </div>
}
