import {
  UPDATE_PEOPLE_LIST
} from '../actions/People'
import { peopleMockData } from '../stores/PeopleMockData'

const initialState = {
  people: peopleMockData
}

export function people(state = initialState, action) {
  switch (action.type) {
  case UPDATE_PEOPLE_LIST:
    return Object.assign({}, state, {
      people: action.people
    })
  default:
    return state
  }
}
