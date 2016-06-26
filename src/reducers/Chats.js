import {
  UPDATE_CHAT_LIST,
  SHOW_CHAT_ACTIVITY,
  HIDE_CHAT_ACTIVITY,
  SET_CHAT_UNREAD_COUNT,
  CHAT_TYPES,
  CHAT_ICON_STATE
} from '../actions/Chats'

const initialState = {
  chatIconState: CHAT_ICON_STATE.NOT_SHOWING_CHAT_ACTIVITY,
  totalUnreadCount: 0,
  chats: []
}

export function chats(state = initialState, action) {
  switch (action.type) {
  case UPDATE_CHAT_LIST:
    return {
      ...state,
      chats: action.chats
    }
  case SHOW_CHAT_ACTIVITY:
    return {
      ...state,
      chatIconState: CHAT_ICON_STATE.SHOWING_CHAT_ACTIVITY
    }
  case HIDE_CHAT_ACTIVITY:
    return {
      ...state,
      chatIconState: CHAT_ICON_STATE.NOT_SHOWING_CHAT_ACTIVITY
    }
  case SET_CHAT_UNREAD_COUNT:
    return {
      ...state,
      chatIconState: action.chatIconState,
      totalUnreadCount: action.totalUnreadCount
    }
  default:
    return state
  }
}
