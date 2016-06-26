import {REHYDRATE} from 'redux-persist/constants'
import { REHYDRATION_STATE } from '../actions/Persist'

const initialState = {
  rehydration: REHYDRATION_STATE.NOT_FINISHED
}

export function persist(state = initialState, action) {
  switch (action.type) {
  case REHYDRATE:
    return {
      ...state,
      rehydration: REHYDRATION_STATE.FINSIHED_REHYDRATING
    }
  default:
    return state
  }
}
