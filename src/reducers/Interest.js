import {
  SET_CONCERT_INTEREST
} from '../actions/Interest'

const initialState = {
  interest: {}
}

export function interest(state = initialState, action) {
  switch (action.type) {
  case SET_CONCERT_INTEREST:
    return {
      ...state,
      interest: {
        ...state.interest,
        [action.concertId]: action.interest
      }
    }
  default:
    return state
  }
}
