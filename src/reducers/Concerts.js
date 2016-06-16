import {REHYDRATE} from 'redux-persist/constants'
import {
  UPDATED_CONCERT_LIST,
  SET_CONCERT_STATUS,
} from '../actions/Concerts'

const initialState = {
  concerts: {
    1: {
      key: 1,
      artist: 'MØ',
      location: 'Orange Scene',
      time: '22:00',
      day: 'Saturday',
      date: '2016-07-02',
      picture: {
        banner: 'https://s3.eu-central-1.amazonaws.com/plusonedk/public/artists/mø-600x338.jpg',
        thumbnail: 'https://s3.eu-central-1.amazonaws.com/plusonedk/public/artists/mø-338x338.jpg'
      },
      attending: {
        friends: 15,
        total: 267
      },
      status: 'attending'
    },
    2: {
      key: 2,
      artist: 'Red Hot Chili Peppers',
      location: 'Orange Scene',
      time: '19:00',
      day: 'Friday',
      date: '2016-07-01',
      picture: {
        banner: 'https://s3.eu-central-1.amazonaws.com/plusonedk/public/artists/red-hot-chili-peppers-600x338.jpg',
        thumbnail: 'https://s3.eu-central-1.amazonaws.com/plusonedk/public/artists/red-hot-chili-peppers-338x338.jpg'
      },
      attending: {
        friends: 89,
        total: 1025
      },
      status: 'plusOne'
    }
  }
}

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
          ...state[action.concertKey],
          status: action.status
        }
      }
    }
  default:
    return state
  }
}
