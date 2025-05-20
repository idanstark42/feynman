import { Segment } from 'semantic-ui-react'

import Page from '../components/page'
import About from '../components/about'
import Videos from '../components/videos'

export default function Home () {

  return <Page className='home'>
    <Segment><Videos /></Segment>
    <Segment><About /></Segment>
  </Page>
}