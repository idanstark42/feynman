import { useEffect, useState } from 'react'
import { Segment } from 'semantic-ui-react'

import { useLilo } from '../logic/lilo'
import calendar from '../logic/calendar'
import Page from '../components/page'
import Calendar from '../components/calendar'

export default function UserCalendar () {
  const { lilo } = useLilo()
  const [userEvents, setUserEvents] = useState([])
  const [freeSlots, setFreeSlots] = useState([])

  useEffect(() => {
    if (!lilo.loggedIn) {
      window.location.href = '/auth'
    }

    (async () => {
      setUserEvents(await calendar.getUserEvents('Lior'))
    }) ()
  }, [])

  return <Page className='calendar'>
    <Calendar events={{ userEvents, freeSlots }} />
  </Page>
}