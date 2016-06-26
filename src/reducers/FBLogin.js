import {
  FB_START_LOGIN_ATTEMPT,
  FB_LOGIN_ATTEMPT,
  FB_LOGOUT,
  SET_FB_INFO,
  FB_LOGIN_STATE
} from '../actions/FBLogin'

const initialState = {
  accessToken: '',
  sessionToken: '',
  loginState: FB_LOGIN_STATE.NOT_LOGGED_IN,
  facebookID: '',
  facebookFullName: '',
  facebookFirstName: '',
  facebookMiddleName: '',
  facebookLastName: '',
  facebookEmail: '',
}

export function login(state = initialState, action) {
  switch (action.type) {
  case FB_START_LOGIN_ATTEMPT:
    return {
      ...state,
      loginState: action.loginState
    }
  case FB_LOGIN_ATTEMPT:
    return {
      ...state,
      accessToken: action.accessToken,
      sessionToken: action.sessionToken,
      loginState: action.loginState
    }
  case FB_LOGOUT:
    return {
      ...state,
      accessToken: '',
      sessionToken: '',
      loginState: action.loginState,
      facebookID: '',
      facebookFullName: '',
      facebookFirstName: '',
      facebookMiddleName: '',
      facebookLastName: '',
      facebookEmail: '',
    }
  case SET_FB_INFO:
    return {
      ...state,
      facebookID: action.fbID,
      facebookFullName: action.fbFullName,
      facebookFirstName: action.fbFirstName,
      facebookMiddleName: action.fbMiddleName,
      facebookLastName: action.fbLastName,
      facebookEmail: action.fbEmail
    }
  default:
    return state
  }
}
