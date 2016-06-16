import {REHYDRATE} from 'redux-persist/constants'
import {
  UPDATED_CONCERT_LIST
} from '../actions/Concerts'

const initialState = {
  concerts: [
    {
      key: 1,
      artist: 'Mø',
      location: 'Orange Scene',
      time: '22:00',
      day: 'Saturday',
      date: '2016-07-02',
      attending: {
        friends: 15,
        total: 267
      }
    },
    {
      key: 2,
      artist: 'Red Hot Chili Peppers',
      location: 'Orange Scene',
      time: '19:00',
      day: 'Friday',
      date: '2016-07-01',
      attending: {
        friends: 89,
        total: 1025
      }
    }
  ]
}

export function concerts(state = initialState, action) {
  switch (action.type) {
  case UPDATED_CONCERT_LIST:
    return Object.assign({}, state, {
      concerts: action.concerts
    })
  default:
    return state
  }
}
