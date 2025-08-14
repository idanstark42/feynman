import { useEffect } from 'react'
import { Segment } from 'semantic-ui-react'

import { useLilo } from '../logic/lilo'
import Page from '../components/page'
import About from '../components/about'
import Videos from '../components/videos'

export default function Home () {
  const { lilo } = useLilo()

  useEffect(() => {
    if (!lilo.loggedIn) {
      window.location.href = '/auth'
    } else {
      window.location.href = '/user'
    }
  }, [])

  return <Page className='home'>
    {/* <Segment><Videos /></Segment>
    <Segment><About /></Segment> */}
  </Page>
}