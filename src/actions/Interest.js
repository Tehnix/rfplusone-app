import { ENDPOINTS } from '../stores/Constants'
import { updateConcertList } from './Concerts'
import { updateAttendeesList } from './Attendees'

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
    headers: {
      'Authorization': 'Token token=' + sessionKey
    }
  })
  .then((response) => response.json())
  .then((responseData) => {
    console.log(responseData)
    if (responseData && performDispatch) {
      dispatch(updateAttendeesList(concertId, responseData.attendees))
      dispatch(setConcertInterest(concertId, responseData.interest))
    }
  })
  .catch((error) => {
    console.warn(error)
  })
  .done(
  )
}

export function sendNotAttendingInterest(sessionKey, dispatch, concertId, performDispatch) {
  fetch(ENDPOINTS.attending(concertId), {
    method: 'DELETE',
    headers: {
      'Authorization': 'Token token=' + sessionKey
    }
  })
  .then((response) => response.json())
  .then((responseData) => {
    if (responseData && performDispatch) {
      dispatch(updateAttendeesList(concertId, responseData.attendees))
      dispatch(setConcertInterest(concertId, responseData.interest))
    }
  })
  .catch((error) => {
    console.warn(error)
  })
  .done(
  )
}

export function sendIndividualInterest(sessionKey, dispatch, concertId, performDispatch) {
  fetch(ENDPOINTS.individual(concertId), {
    method: 'POST',
    headers: {
      'Authorization': 'Token token=' + sessionKey
    }
  })
  .then((response) => response.json())
  .then((responseData) => {
    console.log(responseData)
    if (responseData && performDispatch) {
      dispatch(updateAttendeesList(concertId, responseData.attendees))
      dispatch(setConcertInterest(concertId, responseData.interest))
    }
  })
  .catch((error) => {
    console.warn(error)
  })
  .done(
  )
}

export function sendNotIndividualInterest(sessionKey, dispatch, concertId, performDispatch) {
  fetch(ENDPOINTS.individual(concertId), {
    method: 'DELETE',
    headers: {
      'Authorization': 'Token token=' + sessionKey
    }
  })
  .then((response) => response.json())
  .then((responseData) => {
    if (responseData && performDispatch) {
      dispatch(updateAttendeesList(concertId, responseData.attendees))
      dispatch(setConcertInterest(concertId, responseData.interest))
    }
  })
  .catch((error) => {
    console.warn(error)
  })
  .done(
  )
}

export function sendGroupInterest(sessionKey, dispatch, concertId, performDispatch) {
  fetch(ENDPOINTS.group(concertId), {
    method: 'POST',
    headers: {
      'Authorization': 'Token token=' + sessionKey
    }
  })
  .then((response) => response.json())
  .then((responseData) => {
    console.log(responseData)
    if (responseData && performDispatch) {
      dispatch(updateAttendeesList(concertId, responseData.attendees))
      dispatch(setConcertInterest(concertId, responseData.interest))
    }
  })
  .catch((error) => {
    console.warn(error)
  })
  .done(
  )
}

export function sendNotGroupInterest(sessionKey, dispatch, concertId, performDispatch) {
  fetch(ENDPOINTS.group(concertId), {
    method: 'DELETE',
    headers: {
      'Authorization': 'Token token=' + sessionKey
    }
  })
  .then((response) => response.json())
  .then((responseData) => {
    if (responseData && performDispatch) {
      dispatch(updateAttendeesList(concertId, responseData.attendees))
      dispatch(setConcertInterest(concertId, responseData.interest))
    }
  })
  .catch((error) => {
    console.warn(error)
  })
  .done(
  )
}

export function sendLike(sessionKey, dispatch, concertId, profileId, performDispatch) {
  fetch(ENDPOINTS.like(concertId, profileId), {
    method: 'POST',
    headers: {
      'Authorization': 'Token token=' + sessionKey
    }
  })
  .then((response) => response.json())
  .then((responseData) => {
    console.log(responseData)
    if (responseData && performDispatch) {
      // .. Perform any dispatchs
    }
  })
  .catch((error) => {
    console.warn(error)
  })
  .done(
  )
}

export function sendNotLike(sessionKey, dispatch, concertId, profileId, performDispatch) {
  fetch(ENDPOINTS.like(concertId, profileId), {
    method: 'DELETE',
    headers: {
      'Authorization': 'Token token=' + sessionKey
    }
  })
  .then((response) => response.json())
  .then((responseData) => {
    console.log(responseData)
    if (responseData && performDispatch) {
      // .. Perform any dispatchs
    }
  })
  .catch((error) => {
    console.warn(error)
  })
  .done(
  )
}
