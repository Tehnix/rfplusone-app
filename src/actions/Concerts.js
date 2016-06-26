export const UPDATED_CONCERT_LIST = 'UPDATED_CONCERT_LIST'
export const SET_CONCERT_FILTER = 'SET_CONCERT_FILTER'
export const UPDATING_CONCERT_LIST = 'UPDATING_CONCERT_LIST'

export function updatingConcertList() {
  return {
    type: UPDATING_CONCERT_LIST
  }
}

export function updateConcertList(concerts) {
  return {
    type: UPDATED_CONCERT_LIST,
    concerts: concerts
  }
}

export function setConcertFilter(filter) {
  return {
    type: SET_CONCERT_FILTER,
    filter: filter
  }
}
