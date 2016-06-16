export const UPDATED_CONCERT_LIST = 'UPDATED_CONCERT_LIST'
export const SET_CONCERT_STATUS = 'SET_CONCERT_STATUS'

export function updateConcertList(concerts) {
  return {
    type: UPDATED_CONCERT_LIST,
    concerts: concerts
  }
}

export function setConcertStatus(concertKey, status) {
  return {
    type: SET_CONCERT_STATUS,
    concertKey: concertKey,
    status: status
  }
}
