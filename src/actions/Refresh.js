import { ENDPOINTS } from '../stores/Constants'
import { updateConcertList } from './Concerts'
import { updateAttendeesList } from './Attendees'
import { setConcertInterest } from './Interest'

export const SET_REFRESHING = 'SET_REFRESHING'

export const REFRESH_STATE = {
  FINSIHED_REFRESHING: 'FINSIHED_REFRESHING',
  NOT_FINSIHED_REFRESHING: 'NOT_FINSIHED_REFRESHING',
}

export function startRefreshing() {
  return {
    type: SET_REFRESHING,
    refreshing: REFRESH_STATE.NOT_FINSIHED_REFRESHING,
    refreshBool: true
  }
}

export function stopRefreshing() {
  return {
    type: SET_REFRESHING,
    refreshing: REFRESH_STATE.FINSIHED_REFRESHING,
    refreshBool: false
  }
}

export function refreshContent(sessionKey, store, sceneKey, routes) {
  if (sceneKey == 'concertList') {
    store.dispatch(startRefreshing())
    fetchConcertList(sessionKey, store)
  } else if (sceneKey == 'concertView') {
    const concertId = routes.scene.concert.id
    store.dispatch(startRefreshing())
    fetchConcert(sessionKey, store, concertId)
  } else if (sceneKey == 'chatList') {
    console.log('Refreshing chat list')
  } else if (sceneKey == 'chatView') {
    const concertKey = routes.scene.chat.key
    console.log('Refreshing chat view with key = ' + concertKey.toString())
  }
}

export function fetchConcertList(sessionKey, store) {
  fetch(ENDPOINTS.concerts, {
    method: 'GET',
    headers: {
      'Authorization': 'Token token=' + sessionKey
    }
  })
  .then((response) => response.json())
  .then((responseData) => {
    if (responseData.length > 0) {
      store.dispatch(updateConcertList(responseData))
    }
  })
  .catch((error) => {
    console.warn(error)
  })
  .done(
    store.dispatch(stopRefreshing())
  )
}

export function fetchConcert(sessionKey, store, concertId) {
  fetch(ENDPOINTS.concert(concertId), {
    method: 'GET',
    headers: {
      'Authorization': 'Token token=' + sessionKey
    }
  })
  .then((response) => response.json())
  .then((responseData) => {
    if (responseData) {
      store.dispatch(updateAttendeesList(concertId, responseData.attendees))
      store.dispatch(setConcertInterest(concertId, responseData.interest))
    }
  })
  .catch((error) => {
    console.warn(error)
  })
  .done(
    store.dispatch(stopRefreshing())
  )
}
