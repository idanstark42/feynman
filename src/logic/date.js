export const SECOND = 1000
export const MINUTE = 60 * SECOND
export const HOUR = 60 * MINUTE
export const DAY = 24 * HOUR
export const WEEK = 7 * DAY

export const before = (date, differenceInMilliseconds) => {
  return new Date(date.getTime() - differenceInMilliseconds)
}

export const after = (date, differenceInMilliseconds) => {
  return new Date(date.getTime() + differenceInMilliseconds)
}

const adjustDate = (date, timePeriod, adjustments) => {
  if (!(timePeriod in adjustments)) {
    throw new Error(`Unknown timePeriod: ${timePeriod}`)
  }
  const resultDate = new Date(date)
  adjustments[timePeriod](resultDate)
  return resultDate
}

export const startOf = (date, timePeriod) => {
  const startAdjustments = {
    second: dateObj => dateObj.setMilliseconds(0),
    minute: dateObj => dateObj.setSeconds(0, 0),
    hour:   dateObj => dateObj.setMinutes(0, 0, 0),
    day:    dateObj => dateObj.setHours(0, 0, 0, 0),
    week:   dateObj => {
      const dayOfWeek = dateObj.getDay()
      dateObj.setDate(dateObj.getDate() - dayOfWeek)
      dateObj.setHours(0, 0, 0, 0)
    }
  }
  return adjustDate(date, timePeriod, startAdjustments)
}

export const endOf = (date, timePeriod) => {
  const endAdjustments = {
    second: dateObj => dateObj.setMilliseconds(999),
    minute: dateObj => dateObj.setSeconds(59, 999),
    hour:   dateObj => dateObj.setMinutes(59, 59, 999),
    day:    dateObj => dateObj.setHours(23, 59, 59, 999),
    week:   dateObj => {
      dateObj.setDate(dateObj.getDate() + 6)
      dateObj.setHours(23, 59, 59, 999)
    }
  }
  return adjustDate(startOf(date, timePeriod), timePeriod, endAdjustments)
}

export const isBefore = (date, reference) => date.getTime() < reference.getTime()
export const isAfter = (date, reference) => date.getTime() > reference.getTime()
export const isBetween = (date, startDate, endDate) => {
  const time = date.getTime()
  return time >= startDate.getTime() && time <= endDate.getTime()
}

export const toTimezone = (date, timeZone) => new Date(date.toLocaleString("en-US", { timeZone }))

export const overlap = (eventA, eventB) => {
  return eventA.start < eventB.finish && eventA.finish > eventB.start
}
