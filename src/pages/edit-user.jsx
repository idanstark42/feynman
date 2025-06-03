import { useEffect, useState } from 'react'
import { Segment, Form, FormField } from 'semantic-ui-react'

import Page from '../components/page'
import { useLilo } from '../logic/lilo'

export default function EditUser () {
  const { lilo } = useLilo()
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [plan, setPlan] = useState('')

  useEffect(() => {
    if (!lilo.loggedIn) {
      window.location.href = '/auth?callback=/edit-user'
    }
    const user = lilo.userInfo
    console.log(user)
    setName(user.name || '')
    setUsername(user.username || '')
    setEmail(user.email || '')
  }, [lilo.userInfo])

  const save = async () => {
    lilo.updateUser({ trusted_metadata: { name, username, email, plan } })
  }
  
  return <Page className='edit-user'>
    <Segment>
        <Form>
      <FormField>
        <label>username</label>
        <input value={username} onChange={e => setUsername(e.target.value)} />
      </FormField>
      <FormField>
        <label>full name</label>
        <input value={name} onChange={e => setName(e.target.value)} />
      </FormField>
      <FormField>
        <label>email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} />
      </FormField>
      <div className='ui primary button' onClick={save}>save</div>
    </Form>
    </Segment>
  </Page>
}