import { ENDPOINTS } from '../stores/Constants'
import { updateConcertList } from './Concerts'
import { updateAttendeesList } from './Attendees'

import {
  requestHeaders
} from '../Utility'

const FBSDK = require('react-native-fbsdk')
const {
  AppEventsLogger,
} = FBSDK
// Usage: AppEventsLogger.logEvent('Event')

export const SET_CONCERT_INTEREST = 'SET_CONCERT_INTEREST'

export function setConcertInterest(concertId, interest) {
  return {
    type: SET_CONCERT_INTEREST,
    concertId: concertId,
    interest: interest
  }
}

export function sendAttendingInterest(sessionKey, dispatch, concertId, performDispatch) {
  fetch(ENDPOINTS.attending(concertId), {
    method: 'POST',
    headers: requestHeaders(sessionKey)
  })
  .then((response) => {
    return response.json()
  })
  .then((responseData) => {
    if (responseData.error) {
      // Handle error...
    } else if (responseData && performDispatch) {
      dispatch(updateAttendeesList(concertId, responseData.attendees))
      dispatch(setConcertInterest(concertId, responseData.interest))
    }
  })
  .catch((error) => {})
  .done(() => {
    AppEventsLogger.logEvent('Attending Concert', {'Concert ID': concertId})
  })
}

export function sendNotAttendingInterest(sessionKey, dispatch, concertId, performDispatch) {
  fetch(ENDPOINTS.attending(concertId), {
    method: 'DELETE',
    headers: requestHeaders(sessionKey)
  })
  .then((response) => {
    return response.json()
  })
  .then((responseData) => {
    if (responseData.error) {
      // Handle error...
    } else if (responseData && performDispatch) {
      dispatch(updateAttendeesList(concertId, responseData.attendees))
      dispatch(setConcertInterest(concertId, responseData.interest))
    }
  })
  .catch((error) => {})
  .done(() => {
    AppEventsLogger.logEvent('Unattending Concert', {'Concert ID': concertId})
  })
}

export function sendIndividualInterest(sessionKey, dispatch, concertId, performDispatch) {
  fetch(ENDPOINTS.individual(concertId), {
    method: 'POST',
    headers: requestHeaders(sessionKey)
  })
  .then((response) => {
    return response.json()
  })
  .then((responseData) => {
    if (responseData.error) {
      // Handle error...
    } else if (responseData && performDispatch) {
      dispatch(updateAttendeesList(concertId, responseData.attendees))
      dispatch(setConcertInterest(concertId, responseData.interest))
    }
  })
  .catch((error) => {})
  .done(() => {
    AppEventsLogger.logEvent('Individual Interest on Concert', {'Concert ID': concertId})
  })
}

export function sendNotIndividualInterest(sessionKey, dispatch, concertId, performDispatch) {
  fetch(ENDPOINTS.individual(concertId), {
    method: 'DELETE',
    headers: requestHeaders(sessionKey)
  })
  .then((response) => {
    return response.json()
  })
  .then((responseData) => {
    if (responseData.error) {
      // Handle error...
    } else if (responseData && performDispatch) {
      dispatch(updateAttendeesList(concertId, responseData.attendees))
      dispatch(setConcertInterest(concertId, responseData.interest))
    }
  })
  .catch((error) => {})
  .done()
}

export function sendGroupInterest(sessionKey, dispatch, concertId, performDispatch) {
  fetch(ENDPOINTS.group(concertId), {
    method: 'POST',
    headers: requestHeaders(sessionKey)
  })
  .then((response) => {
    return response.json()
  })
  .then((responseData) => {
    if (responseData.error) {
      // Handle error...
    } else if (responseData && performDispatch) {
      dispatch(updateAttendeesList(concertId, responseData.attendees))
      dispatch(setConcertInterest(concertId, responseData.interest))
    }
  })
  .catch((error) => {
  })
  .done(() => {
    AppEventsLogger.logEvent('Group Interest on Concert', {'Concert ID': concertId})
  })
}

export function sendNotGroupInterest(sessionKey, dispatch, concertId, performDispatch) {
  fetch(ENDPOINTS.group(concertId), {
    method: 'DELETE',
    headers: requestHeaders(sessionKey)
  })
  .then((response) => {
    return response.json()
  })
  .then((responseData) => {
    if (responseData.error) {
      // Handle error...
    } else if (responseData && performDispatch) {
      dispatch(updateAttendeesList(concertId, responseData.attendees))
      dispatch(setConcertInterest(concertId, responseData.interest))
    }
  })
  .catch((error) => {
  })
  .done(
  )
}

export function sendLike(sessionKey, dispatch, concertId, profileId, performDispatch) {
  fetch(ENDPOINTS.like(concertId, profileId), {
    method: 'POST',
    headers: requestHeaders(sessionKey)
  })
  .then((response) => {
    return response.json()
  })
  .then((responseData) => {
    if (responseData.error) {
      // Handle error...
    } else if (responseData && performDispatch) {
      // .. Perform any dispatchs
    }
  })
  .catch((error) => {
  })
  .done(() => {
    AppEventsLogger.logEvent('Liked Person', {'Concert ID': concertId, 'Profile ID': profileId})
  })
}

export function sendNotLike(sessionKey, dispatch, concertId, profileId, performDispatch) {
  fetch(ENDPOINTS.like(concertId, profileId), {
    method: 'DELETE',
    headers: requestHeaders(sessionKey)
  })
  .then((response) => {
    return response.json()
  })
  .then((responseData) => {
    if (responseData.error) {
      // Handle error...
    } else if (responseData && performDispatch) {
      // .. Perform any dispatchs
    }
  })
  .catch((error) => {
  })
  .done(() => {
    AppEventsLogger.logEvent('Unliked Person', {'Concert ID': concertId, 'Profile ID': profileId})
  })
}
