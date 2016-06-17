import {REHYDRATE} from 'redux-persist/constants'
import {
  UPDATED_CONCERT_LIST,
  SET_CONCERT_STATUS,
} from '../actions/Concerts'
import { concertsInitialData } from '../stores/ConcertsInitialData'

const initialState = concertsInitialData

export function concerts(state = initialState, action) {
  switch (action.type) {
  case UPDATED_CONCERT_LIST:
    return Object.assign({}, state, {
      concerts: action.concerts
    })
  case SET_CONCERT_STATUS:
    return {
      ...state,
      concerts: {
        ...state.concerts,
        [action.concertKey]: {
          ...state.concerts[action.concertKey],
          status: action.status
        }
      }
    }
  default:
    return state
  }
}
