import LogoImage from '../assets/dark-mode-favicon.png'

import { Image } from 'semantic-ui-react'

export default function Logo (props) {
  return <Image src={LogoImage} {...props} />
}