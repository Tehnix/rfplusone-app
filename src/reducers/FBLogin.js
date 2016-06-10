import { createReducer } from 'redux-immutablejs'
import {
  FB_LOGIN_ATTEMPT,
  FB_LOGOUT,
  SET_FB_NAME,
  FB_LOGIN_STATE
} from '../actions/FBLogin'

const initialState = {
  accessToken: '',
  loginState: FB_LOGIN_STATE.NOT_LOGGED_IN,
  facebookName: ''
}

export function login(state = initialState, action) {
  switch (action.type) {
    case FB_LOGIN_ATTEMPT:
      return Object.assign({}, state, {
        accessToken: action.accessToken,
        loginState: action.loginState
      })
    case FB_LOGOUT:
      return Object.assign({}, state, {
        accessToken: action.accessToken,
        loginState: action.loginState,
        facebookName: action.fbName
      })
    case SET_FB_NAME:
      return Object.assign({}, state, {
        facebookName: action.fbName
      })
    default:
      return state
  }
}
