import React from 'react'
import {
  Header,
  Divider,
  Segment,
  Input
} from 'semantic-ui-react'

export default function Auth() {
  return <div className='auth centering'>
    <Segment className='auth-segment'>
      <form className='email-and-password centering'>
        <Header inverted textAlign='center'>Sign in with email and password</Header>
        <Input type='email' placeholder='Email' />
        <Input type='password' placeholder='Password' />
        <button className='ui primary button' type='submit'>Sign in</button>
      </form>
      <Divider vertical inverted>Or</Divider>
      <Divider horizontal inverted>Or</Divider>
      <div className='google centering'>
        <button className='ui primary button' type='button'>Sign in with Google</button>
      </div>
    </Segment>
  </div>
}