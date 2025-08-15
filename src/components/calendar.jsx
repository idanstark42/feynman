import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Segment } from 'semantic-ui-react'

import './calendar.css'

import { fillDigits } from '../logic/utils'
import { DAY, startOf, after, isBetween, toTimezone, isAfter } from '../logic/date'

const WORKDAY_START = 8
const WORKDAY_END = 17

const WORK_HOURS = new Array(WORKDAY_END - WORKDAY_START + 1).fill(0).map((x, i) => i + WORKDAY_START)

export default function Calendar ({ events }) {
  const { t } = useTranslation()
  const [weekStart, setWeekStart] = useState(startOf(new Date(), 'week'))

  return <>
    <Segment className='menu'></Segment>
    <Segment className='week'>
      <div className='hours'>
        {WORK_HOURS.map(hour => <span>{fillDigits(hour, 2)}:00</span>)}
      </div>
      {DAYS.map(day => <Day events={events} config={day} weekStart={weekStart} />)}
    </Segment>
  </>
}

const DAYS = [
  { name: 'sunday', diff: 0 },
  { name: 'monday', diff: DAY },
  { name: 'tuesday', diff: 2*DAY },
  { name: 'wednesday', diff: 3*DAY },
  { name: 'thursday', diff: 4*DAY },
  { name: 'friday', diff: 5*DAY },
  { name: 'saturday', diff: 6*DAY }
]

function Day ({ config, events, weekStart }) {
  const { t } = useTranslation()
  const { userEvents, freeSlots } = events

  const dateToDayPercent = date => 100 * ((date.getHours() - WORKDAY_START) * 60 + date.getMinutes()) / ((WORKDAY_END - WORKDAY_START) * 60)

  const dayStart = after(weekStart, config.diff)
  const dayEnd = after(dayStart, DAY)
  const dailyUserEvents = userEvents.filter(event => isBetween(event.start, dayStart, dayEnd))

  const present = new Date()
  const showPresent = isBetween(present, dayStart, dayEnd)

  return <div className='day'>
    <div className='title'>{t(`days.${config.name}`)}</div>
    <div className='title'>
      {fillDigits(dayStart.getDate(), 2)}/{fillDigits(dayStart.getMonth(), 2)}/{dayStart.getFullYear()}
    </div>
    <div className='day-content'>
      {dailyUserEvents.map(event => {
        const eventStartPercent = dateToDayPercent(toTimezone(event.start, 'Asia/Jerusalem'))
        const eventEndPercent = dateToDayPercent(toTimezone(event.end, 'Asia/Jerusalem'))
        return <div className='event user' style={{
          top: `${eventStartPercent}%`,
          height: `${eventEndPercent - eventStartPercent}%`
        }} />
      })}
      {isBetween(present, dayStart, dayEnd) ? <div className='present' style={{ top: 0, height: `${dateToDayPercent(toTimezone(present, 'Asia/Jerusalem'))}%` }} /> : isAfter(present, dayStart) ? <div className='past' /> : ''}
    </div>
  </div>
}