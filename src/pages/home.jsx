import { useTranslation } from 'react-i18next'
import { Segment } from 'semantic-ui-react'

import { useLilo } from '../logic/lilo'

import Page from '../components/page'
import Player from '../components/player'

export default function Home () {
  const { t } = useTranslation()
  const { data } = useLilo()

  return <Page className='home'>
    <Segment>{!(data.videos) || data.videos.length === 0 ? <></> : <>
      {data.videos.map(video => {
        console.log(video)
        return <div className='video-entry'>
          <div className='thumbnail'></div>
        </div>
      })}
    </>}</Segment>
    <Segment></Segment>
  </Page>
}