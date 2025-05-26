import { Card, CardContent, CardHeader, CardDescription, Image, Icon, Header, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { useModal } from '../logic/modal'

import VideoEditingModal from './video-editing-modal'

const DEFAULT_IMAGE = 'https://react.semantic-ui.com/images/wireframe/image.png'

export default function VideoEntry ({ video, editable }) {
  const { openModal } = useModal()

  return <Card as='div' className='video-entry' onClick={() => editable ? openModal(<VideoEditingModal video={video} />) : ''}>
    <div className='thumbnail' wrapped ui={false} style={{ backgroundImage: `url(${video.metadata.thumbnail || DEFAULT_IMAGE})` }} />
    <CardContent>
      <CardHeader>{video.metadata.name}</CardHeader>
      <CardDescription>{video.metadata.description}</CardDescription>
      <Link to={`/player/${video._id}`}><Icon name='play' color='black' /></Link>
    </CardContent>
  </Card>
}