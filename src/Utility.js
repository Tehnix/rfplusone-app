const weekdays = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday'
}

export function getConcertFromId(concertId, concerts) {
  const arrayLength = concerts.length
  for (let i = 0; i < arrayLength; i++) {
    const concert = concerts[i]
    if (concert.id == concertId) {
      return concert
    }
  }
  return false
}

export function weekdayFromDate(d) {
  return weekdays[d.getDay()]
}

export function weekdayFromInt(d) {
  return weekdays[d]
}

export function getHourMinutesFromDate(d) {
  let hh = d.getHours()
  let mm = d.getMinutes()
  if (hh < 10) {
    hh = '0' + hh
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  return hh + ':' + mm
}

export function getDateFromDate(d) {
  let dd = d.getDate()
  let mm = d.getMonth() + 1 // January is 0!
  const yyyy = d.getFullYear()
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  return yyyy + '-' + mm + '-' + dd
}

export function getToday() {
  const today = new Date()
  return getDateFromDate(today)
}

export function subtractMinutesFromDate(d, minutes) {
  const date = new Date(d.getTime() - minutes * 60000)
  return getDateFromDate(date)
}

export function addMinutesFromDate(d, minutes) {
  const date = new Date(d.getTime() + minutes * 60000)
  return getDateFromDate(date)
}

export function requestHeaders(sessionKey) {
  return { 'Content-Type': 'application/json',
           'Accept': 'application/json',
           'Authorization': 'Token token=' + sessionKey }
}
