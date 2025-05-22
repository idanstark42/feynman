import { Card, CardContent, CardHeader, CardDescription, Image, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default function VideoEntry ({ video }) {
  return <Card className='video-entry'>
    <Image className='thumbnail' wrapped ui={false} />
    <CardContent>
      <CardHeader>{video.metadata.name}</CardHeader>
      <CardDescription>{video.metadata.description}</CardDescription>
      <Link to={`/player/${video._id}`}><Icon name='play' color='black' /></Link>
    </CardContent>
  </Card>
}