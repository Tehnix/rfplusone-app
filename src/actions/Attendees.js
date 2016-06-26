export const UPDATE_ATTENDEES_LIST = 'UPDATE_ATTENDEES_LIST'
export const UPDATE_SPECIFIC_ATTENDEE = 'UPDATE_SPECIFIC_ATTENDEE'

export function updateAttendeesList(concertId, attendees) {
  return {
    type: UPDATE_ATTENDEES_LIST,
    concertId: concertId,
    attendees: attendees
  }
}

export function updateSpecificAttendee(concertId, profileId, attendee) {
  return {
    type: UPDATE_SPECIFIC_ATTENDEE,
    concertId: concertId,
    profileId: profileId,
    attendee: attendee
  }
}
