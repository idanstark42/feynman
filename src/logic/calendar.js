
import { overlap } from './date'

const BACKEND_URL = import.meta.env.VITE_CALENDAR_URL

const HTTP_OPTIONS = {
  method: 'get',
  redirect: 'follow',
  mode: 'cors',
  dataType: 'jsonp',
  referrerPolicy: 'no-referrer',
  headers: { 'Content-Type': 'text/plain; charset=UTF-8' }
}

const calendar = {}

calendar.ping = async () => {
  const response = await action('ping')
  return await response.json()
}

calendar.getUserEvents = async user => {
  const response = await action('getUserEvents', { user })
  const json = await response.json()
  return json.events.map(event => ({ title: event.title, start: new Date(event.start), end: new Date(event.end) }))
}

calendar.getTimeRangeEvents = async (start, end) => {
  const response = await action('getTimeRangeEvents', { start, end })
  const json = await response.json()
  return json.events.map(event => ({ title: event.title, start: new Date(event.start), end: new Date(event.end) }))
}

calendar.getOpenEvents = async () => {
  const response = await action('getOpenEvents')
  const json = await response.json()
  return json.events.map(event => ({ title: event.title, start: new Date(event.start), end: new Date(event.end) }))
}

calendar.add = async (user, start, end) => {
  await action('add', { user, start, end })
  return true
}

const action = async (action, params = {}) => {
  const fullUrl = `${BACKEND_URL}?${Object.entries({ ...params, action }).map(([key, value]) => `${key}=${value}`).join('&')}`
  return await fetch(fullUrl, HTTP_OPTIONS)
}

export default calendar