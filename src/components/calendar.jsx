import { useTranslation } from 'react-i18next'

import { Segment } from 'semantic-ui-react'

import './calendar.css'
import { useState } from 'react'

const defaultWeekStart = (() => {
  const now = new Date()
  const dayless = new Date(now - now.getDay() * 24*60*60*1000)
  const hourless = new Date(dayless - dayless.getHours() * 60 * 60 * 1000)
  const minuteless = new Date(hourless - hourless.getMinutes() * 60 * 1000)
  const secondless = new Date(minuteless - minuteless.getSeconds() * 1000)
  return new Date(secondless - secondless.getMilliseconds())
}) ()

export default function Calendar ({ events }) {
  const { t } = useTranslation()
  const [weekStart, setWeekStart] = useState(defaultWeekStart)

  return <>
    <Segment className='menu'></Segment>
    <Segment className='week'>
      <div className='hours'>
        {new Array(10).fill(0).map((x, i) => i + 8).map(hour => <span>{hour < 10 ? 0 : ''}{hour}:00</span>)}
      </div>
      {DAYS.map(day => <Day events={events} config={day} weekStart={weekStart} />)}
    </Segment>
  </>
}

const DAY_DURATION = 24 * 60 * 60 * 1000

const DAYS = [
  { name: 'sunday', diff: 0 },
  { name: 'monday', diff: DAY_DURATION },
  { name: 'tuesday', diff: 2*DAY_DURATION },
  { name: 'wednesday', diff: 3*DAY_DURATION },
  { name: 'thursday', diff: 4*DAY_DURATION },
  { name: 'friday', diff: 5*DAY_DURATION },
  { name: 'saturday', diff: 6*DAY_DURATION }
]

function Day ({ config, events, weekStart }) {
  const { t } = useTranslation()
  const { userEvents, freeSlots } = events

  const dayStart = Number(weekStart) + config.diff
  const dayEnd = dayStart + DAY_DURATION
  const dailyUserEvents = userEvents.filter(event => Number(new Date(event.start)) > Number(dayStart) && Number(new Date(event.end)) < Number(dayEnd))
  const date = new Date(dayStart)
  console.log(dailyUserEvents)
  return <div className='day'>
    <div className='title'>{t(`days.${config.name}`)}</div>
    <div className='title'>
      {date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}/
      {date.getMonth() > 9 ? date.getMonth() : `0${date.getMonth()}`}/
      {date.getFullYear()}
    </div>
    {dailyUserEvents.map(event => {
      const eventIsraelStart = new Date(event.start.toLocaleString("en-US", { timeZone: "Asia/Jerusalem" }))
      const eventIsraelEnd = new Date(event.end.toLocaleString("en-US", { timeZone: "Asia/Jerusalem" }))
      return <div className='event user' style={{
        top: `calc(${100 * ((eventIsraelStart.getHours() - 8) * 60 + eventIsraelStart.getMinutes()) / (9 * 60)}% + 3rem)`,
        height: `${100 * (eventIsraelEnd.getHours() * 60 + eventIsraelEnd.getMinutes() - eventIsraelStart.getHours() * 60 + eventIsraelStart.getMinutes()) / (9 * 60)}%`
      }} />
    })}
  </div>
}