import { Card, CardContent, CardHeader, CardDescription, Image, Icon, Header, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { useModal } from '../logic/modal'

import VideoEditingModal from './video-editing-modal'
import { useLilo } from '../logic/lilo'
import { useTranslation } from 'react-i18next'

const DEFAULT_IMAGE = 'https://react.semantic-ui.com/images/wireframe/image.png'

export default function VideoEntry ({ video, editable }) {
  const { openModal } = useModal()
    const { t } = useTranslation()

  return <Card as='div' className='video-entry' onClick={() => editable ? openModal(<VideoEditingModal video={video} />) : ''}>
    <div className='thumbnail' style={{ backgroundImage: `url(${video.metadata.thumbnail || DEFAULT_IMAGE})` }} />
    <CardContent>
      <CardHeader>{video.metadata.name || 'anonymous'}</CardHeader>
      <CardDescription>{video.metadata.description || 'who knows what is in here...'}</CardDescription>
      {video.playbackId ? <div className='ui buttons'>
        <Link className='ui button' to={`/player/${video._id}`}>
          <Icon name='play' color='black' />
          {t('actions.play')}
        </Link>
      </div> : <div className='ui buttons'>
        <Link className='ui button' to={`/auth?callback=/add/${video._id}`}>
          <Icon name='plus' color='black' />
          {t('actions.add')}
        </Link>
      </div>}
    </CardContent>
  </Card>
}