import Logo from './logo'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Segment } from 'semantic-ui-react'

import LogoutButton from './logout'

export default function Topbar () {
  const [activeItem, setActiveItem] = useState('home')
  const handleItemClick = (e, { name }) => setActiveItem(name)

  useEffect(() => {
    const path = window.location.pathname
    const item = items.find((item) => item.path === path)
    if (item) {
      setActiveItem(item.name)
    }
  }, [])

  return <Segment inverted style={{ padding: 0, borderRadius: 0 }}>
    <Menu inverted secondary>
      <Menu.Item>
        <Logo size="mini" />
      </Menu.Item>
      {items.map((item) => (
        <Menu.Item
        key={item.name}
        name={item.name}
        active={activeItem === item.name}
        onClick={handleItemClick}
        as={Link}
        to={item.path}
        >
          {item.label}
        </Menu.Item>
      ))}

      <Menu.Item position='right'>
        <LogoutButton />
      </Menu.Item>
    </Menu>
  </Segment>
}

const items = [
  { name: 'home', label: 'Home', path: '/' },
  { name: 'courses', label: 'Courses', path: '/courses' },
  { name: 'videos', label: 'Videos', path: '/videos' }
]