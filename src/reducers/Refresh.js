import {
  SET_REFRESHING,
  REFRESH_STATE
} from '../actions/Refresh'

const initialState = {
  refreshing: REFRESH_STATE.FINSIHED_REFRESHING,
  refreshBool: false
}

export function refresh(state = initialState, action) {
  switch (action.type) {
  case SET_REFRESHING:
    return {
      ...state,
      refreshing: action.refreshing,
      refreshBool: action.refreshBool
    }
  default:
    return state
  }
}
