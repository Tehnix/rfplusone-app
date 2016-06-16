export const UPDATED_CONCERT_LIST = 'UPDATED_CONCERT_LIST'

export function updateConcertList(concerts) {
  return {
    type: UPDATED_CONCERT_LIST,
    concerts: concerts
  }
}
