import { useTranslation } from 'react-i18next'
import { Segment } from 'semantic-ui-react'

import Page from '../components/page'

import Player from '../components/player'

export default function Home () {
  const { t } = useTranslation()

  return <Page className='home'>
    <Segment></Segment>
    <Segment></Segment>
  </Page>
}