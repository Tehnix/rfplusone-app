import {
  UPDATE_ATTENDEES_LIST
} from '../actions/Attendees'
import { attendeesMockData } from '../stores/AttendeesMockData'

const initialState = {
  attendees: attendeesMockData
}

export function attendees(state = initialState, action) {
  switch (action.type) {
  case UPDATE_ATTENDEES_LIST:
    return {
      ...state,
      attendees: {
        ...state.attendees,
        [action.concertId]: action.attendees
      }
    }
  default:
    return state
  }
}
