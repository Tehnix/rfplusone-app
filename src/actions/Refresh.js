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

export function refreshContent(store, sceneKey, routes) {
  if (sceneKey == 'concertList') {
    console.log('Refreshing concert list')
  } else if (sceneKey == 'concertView') {
    const concertKey = routes.scene.concert.key
    console.log('Refreshing concert view with key = ' + concertKey.toString())
  } else if (sceneKey == 'chatList') {
    console.log('Refreshing chat list')
  } else if (sceneKey == 'chatView') {
    const concertKey = routes.scene.chat.key
    console.log('Refreshing chat view with key = ' + concertKey.toString())
  }
}
