import Logo from './logo'
import { useEffect, useState } from 'react'
import { Menu, Segment, Breadcrumb } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

import LogoutButton from './logout'

export default function Topbar () {
  const { t } = useTranslation()
  const [sections, setSections] = useState([])

  useEffect(() => {
    setSections(loadSectionsFromURL())
  }, [])

  const loadSectionsFromURL = () => {
    const sections = []
    // const path = window.location.pathname.split('/').slice(1).filter(Boolean)
    // if (path.length === 0) {
    //   sections[sections.length - 1].active = true
    //   sections[sections.length - 1].link = null
    //   return sections
    // }
  }

  console.log('sections', sections)

  return <Segment id='topbar' inverted style={{ padding: 0, borderRadius: 0 }}>
    <Menu inverted secondary>
      <Menu.Item>
        <Logo size="mini" />
      </Menu.Item>

      <Menu.Item>
        <Breadcrumb sections={sections} divider=' | ' />
      </Menu.Item>

      <Menu.Item position='right'>
        <LogoutButton />
      </Menu.Item>
    </Menu>
  </Segment>
}
