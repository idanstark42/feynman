import { Header } from 'semantic-ui-react'

export default function VideoEntry ({ video }) {
  return <div className='video-entry'>
    <div className='thumbnail'></div>
    <div className='data'>
      <Header as='h1' className='name'>{video.metadata.name}</Header>
    </div>
  </div>
}