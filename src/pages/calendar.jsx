import { useEffect } from 'react'

import { useLilo } from '../logic/lilo'
import calendar from '../logic/calendar'
import Page from '../components/page'
import Calendar from '../components/calendar'

export default function UserCalendar () {
  const { lilo } = useLilo()

  useEffect(() => {
    if (!lilo.loggedIn) {
      window.location.href = '/auth'
    }
  }, [])

  return <Page className='calendar'>
    <Calendar />
  </Page>
}