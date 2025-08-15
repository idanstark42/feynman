import { use, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Segment } from 'semantic-ui-react'

import './calendar.css'

import calendar from '../logic/calendar'
import { fillDigits } from '../logic/utils'
import { DAY, startOf, after, isBetween, toTimezone, isAfter, WEEK, before } from '../logic/date'

const WORKDAY_START = 8
const WORKDAY_END = 17

const WORK_HOURS = new Array(WORKDAY_END - WORKDAY_START + 1).fill(0).map((x, i) => i + WORKDAY_START)

export default function Calendar () {
  const { t } = useTranslation()
  const [userEvents, setUserEvents] = useState([])
  const [freeSlots, setFreeSlots] = useState([])
  const [otherEvents, setOtherEvents] = useState([])
  const [weekStart, setWeekStart] = useState(startOf(new Date(), 'week'))
  const username = 'Lior'

  useEffect(() => {
    (async () => {
      setUserEvents(await calendar.getUserEvents(username))
      setFreeSlots(await calendar.getOpenEvents())
    }) ()
  }, [])

  useEffect(() => {
    (async () => {
      const other = await calendar.getTimeRangeEvents(weekStart, after(weekStart, WEEK))
      setOtherEvents(other.filter(event => event.title !== username && event.title !== 'open'))
    }) ()
  }, [weekStart])

  return <>
    <Segment className='menu'>
      <div className='ui icon button' onClick={() => setWeekStart(before(weekStart, WEEK))}><i className='ui angle left icon' /></div>
      <div className='ui icon button' onClick={() => setWeekStart(after(weekStart, WEEK))}><i className='ui angle right icon' /></div>
    </Segment>
    <Segment className='week'>
      <div className='hours'>
        {WORK_HOURS.map(hour => <span key={hour}>{fillDigits(hour, 2)}:00</span>)}
      </div>
      {DAYS.map(day => <Day key={day.name} events={{ userEvents, freeSlots, otherEvents }} config={day} weekStart={weekStart} />)}
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
  const { userEvents, freeSlots, otherEvents } = events

  const dateToDayPercent = date => 100 * ((date.getHours() - WORKDAY_START) * 60 + date.getMinutes()) / ((WORKDAY_END - WORKDAY_START) * 60)

  const dayStart = after(weekStart, config.diff)
  const dayEnd = after(dayStart, DAY)
  const dailyUserEvents = userEvents.filter(event => isBetween(event.start, dayStart, dayEnd))
  const dailyFreeSlots = freeSlots.filter(event => isBetween(event.start, dayStart, dayEnd))
  const dailyOtherEvents = otherEvents.filter(event => isBetween(event.start, dayStart, dayEnd))

  const present = new Date()
  const showPresent = isBetween(present, dayStart, dayEnd)

  return <div className='day'>
    <div className='title'>{t(`days.${config.name}`)}</div>
    <div className='title'>
      {fillDigits(dayStart.getDate(), 2)}/{fillDigits(dayStart.getMonth() + 1, 2)}/{dayStart.getFullYear()}
    </div>
    <div className='day-content'>
      {dailyFreeSlots.map(event => {
        const eventStartPercent = dateToDayPercent(toTimezone(event.start, 'Asia/Jerusalem'))
        const eventEndPercent = dateToDayPercent(toTimezone(event.end, 'Asia/Jerusalem'))
        return <div className='event open' key={eventStartPercent} style={{
          top: `${eventStartPercent}%`,
          height: `${eventEndPercent - eventStartPercent}%`
        }} onClick={() => openSheduleModal()}/>
      })}

      {dailyOtherEvents.map(event => {
        const eventStartPercent = dateToDayPercent(toTimezone(event.start, 'Asia/Jerusalem'))
        const eventEndPercent = dateToDayPercent(toTimezone(event.end, 'Asia/Jerusalem'))
        return <div className='event other' key={eventStartPercent} style={{
          top: `${eventStartPercent}%`,
          height: `calc(${eventEndPercent - eventStartPercent}% - 2px)`
        }} />
      })}


      {dailyUserEvents.map(event => {
        const eventStartPercent = dateToDayPercent(toTimezone(event.start, 'Asia/Jerusalem'))
        const eventEndPercent = dateToDayPercent(toTimezone(event.end, 'Asia/Jerusalem'))
        return <div className='event user' key={eventStartPercent} style={{
          top: `${eventStartPercent}%`,
          height: `${eventEndPercent - eventStartPercent}%`
        }}>
          <div>{fillDigits(toTimezone(event.start, 'Asia/Jerusalem').getHours(), 2)}:{fillDigits(toTimezone(event.start, 'Asia/Jerusalem').getMinutes(), 2)}</div>
          <div>{<i className='ui arrow down icon' />}</div>
          <div>{fillDigits(toTimezone(event.end, 'Asia/Jerusalem').getHours(), 2)}:{fillDigits(toTimezone(event.end, 'Asia/Jerusalem').getMinutes(), 2)}</div>
        </div>
      })}
      {isBetween(present, dayStart, dayEnd) ? <div className='present' style={{ top: 0, height: `${dateToDayPercent(toTimezone(present, 'Asia/Jerusalem'))}%` }} /> : isAfter(present, dayStart) ? <div className='past' /> : ''}
    </div>
  </div>
}