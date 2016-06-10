// Facebook/login related actions
export const FB_LOGIN_ATTEMPT = 'FB_LOGIN_ATTEMPT'
export const FB_LOGOUT = 'FB_LOGOUT'
export const SET_FB_NAME = 'SET_FB_NAME'

export const FB_LOGIN_STATE = {
  NOT_LOGGED_IN: 'NOT_LOGGED_IN',
  LOGGED_IN: 'LOGGED_IN',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGIN_CANCELED: 'LOGIN_CANCELED'
}

export function successfulFBLogin(accessToken) {
  return {
    type: FB_LOGIN_ATTEMPT,
    accessToken: accessToken,
    loginState: FB_LOGIN_STATE.LOGGED_IN
  }
}

export function unsuccessfulFBLogin() {
  return {
    type: FB_LOGIN_ATTEMPT,
    accessToken: '',
    loginState: FB_LOGIN_STATE.NOT_LOGGED_IN
  }
}

export function cancelledFBLogin() {
  return {
    type: FB_LOGIN_ATTEMPT,
    accessToken: '',
    loginState: FB_LOGIN_STATE.LOGIN_CANCELED
  }
}

export function errorFBLogin() {
  return {
    type: FB_LOGIN_ATTEMPT,
    accessToken: '',
    loginState: FB_LOGIN_STATE.LOGIN_ERROR
  }
}

export function successfulFBLogout() {
  return {
    type: FB_LOGOUT,
    accessToken: '',
    loginState: FB_LOGIN_STATE.NOT_LOGGED_IN,
    fbName: ''
  }
}

export function setFBName(fbName) {
  return {
    type: SET_FB_NAME,
    fbName: fbName
  }
}
