export const UPDATE_ATTENDEES_LIST = 'UPDATE_ATTENDEES_LIST'

export function updateAttendeesList(concertId, attendees) {
  return {
    type: UPDATE_ATTENDEES_LIST,
    concertId: concertId,
    attendees: attendees
  }
}
