import { Segment,
  Header,
  HeaderContent,
  HeaderSubheader,
  Icon
} from 'semantic-ui-react'

import Page from '../components/page'

export default function Home () {
  return <Page className='home'>
    <Segment raised className='user-summary'>
      {/* username, plan & expiration date, total hours, latest activity in different courses, etc. */}
      
      <Header inverted>
        <Icon name='user' circular />
        <HeaderContent>
          Welcome back, User!
          <HeaderSubheader>Free</HeaderSubheader>
        </HeaderContent>
      </Header>
    </Segment>
    <Segment raised className='courses' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Header inverted size='huge' textAlign='center'>You don't have any courses</Header>
    </Segment>
    <Segment raised className='reccomandations' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>>
      <Header inverted size='huge' textAlign='center'>You don't have any courses</Header>
    </Segment>
    <Segment raised className='request-form'>
      <Header inverted size='huge' textAlign='center'>Request a course</Header>
    </Segment>
  </Page>
}