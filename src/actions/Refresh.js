import { ENDPOINTS } from '../stores/Constants'
import { updateConcertList } from './Concerts'
import { updateAttendeesList } from './Attendees'
import { setConcertInterest } from './Interest'
import {
  updateChatList,
  setChatUnreadCount,
  newChatMessages,
} from './Chats'

import {
  requestHeaders
} from '../Utility'

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

export function refreshContent(sessionKey, dispatch, sceneKey, routes) {
  if (sceneKey == 'concertList') {
    dispatch(startRefreshing())
    fetchConcertList(sessionKey, dispatch)
  } else if (sceneKey == 'concertView') {
    const concertId = routes.scene.concert.id
    dispatch(startRefreshing())
    fetchConcert(sessionKey, dispatch, concertId)
  } else if (sceneKey == 'chatList') {
    dispatch(startRefreshing())
    fetchChatList(sessionKey, dispatch)
  }
}

export function fetchConcertList(sessionKey, dispatch) {
  fetch(ENDPOINTS.concerts, {
    method: 'GET',
    headers: requestHeaders(sessionKey)
  })
    .then((response) => {
      return response.json()
    })
  .then((responseData) => {
    if (responseData.error) {
      // Handle errors here...
    } else if (responseData.length > 0) {
      dispatch(updateConcertList(responseData))
    }
  })
  .catch((error) => {
    console.warn(error)
  })
  .done(
    dispatch(stopRefreshing())
  )
}

export function fetchConcert(sessionKey, dispatch, concertId) {
  fetch(ENDPOINTS.concert(concertId), {
    method: 'GET',
    headers: requestHeaders(sessionKey)
  })
  .then((response) => {
    return response.json()
  })
  .then((responseData) => {
    if (responseData.error) {
      // Handle errors here...
    } else if (responseData) {
      dispatch(updateAttendeesList(concertId, responseData.attendees))
      dispatch(setConcertInterest(concertId, responseData.interest))
    }
  })
  .catch((error) => {
    console.warn(error)
  })
  .done(
    dispatch(stopRefreshing())
  )
}

export function fetchChatList(sessionKey, dispatch) {
  fetch(ENDPOINTS.chats, {
    method: 'GET',
    headers: requestHeaders(sessionKey)
  })
  .then((response) => {
    return response.json()
  })
  .then((responseData) => {
    if (responseData.error) {
      // Handle errors here...
    } else if (responseData) {
      // Count the unread messages
      let unreadCount = 0
      if (responseData.length) {
        const arrayLength = responseData.length
        for (let i = 0; i < arrayLength; i++) {
          const chat = responseData[i]
          if (chat.unread_count && chat.unread_count !== null) {
            unreadCount += chat.unread_count
          }
        }
      }
      dispatch(updateChatList(responseData))
      dispatch(setChatUnreadCount(unreadCount))
    }
  })
  .catch((error) => {
    console.warn(error)
  })
  .done(
    dispatch(stopRefreshing())
  )
}

export function fetchChatMessages(sessionKey, dispatch, chatId) {
  fetch(ENDPOINTS.message(chatId), {
    method: 'GET',
    headers: requestHeaders(sessionKey)
  })
  .then((response) => {
    return response.json()
  })
  .then((responseData) => {
    if (responseData.error) {
      // Handle errors here...
    } else if (responseData) {
      dispatch(newChatMessages(chatId, responseData))
    }
  })
  .catch((error) => {
    console.warn(error)
  })
  .done(
    dispatch(stopRefreshing())
  )
}
