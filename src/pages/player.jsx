import Page from '../components/page'
import { Segment } from 'semantic-ui-react'

import VideoPlayer from '../components/video-player'
import { useLilo } from '../logic/lilo'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Player () {
  const { videoId } = useParams()
  const { data } = useLilo()
  const [video, setVideo] = useState()

  useEffect(() => {
    if (!data || !data.videos) return

    setVideo(data.videos.find(video => video._id === videoId))
  }, [data])

  if (!video) {
    return ''
  }

  return <Page>
    <Segment>
      <VideoPlayer video={video} />
    </Segment>
  </Page>
}