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
  totalUnreadCount: 18,
  chats: [
    {
      id: 1,
      participants: [
        {profilePicture: '...', name: 'Emilia'}
      ],
      concert_id: 68,
      unreadCount: 3
    },
    {
      id: 2,
      participants: [
        {profilePicture: '...', name: 'Emilia'},
        {profilePicture: '...', name: 'Mick'},
        {profilePicture: '...', name: 'Mille'},
        {profilePicture: '...', name: 'Line'},
        {profilePicture: '...', name: 'Thomas'},
        {profilePicture: '...', name: 'Martin'},
        {profilePicture: '...', name: 'Christian'},
        {profilePicture: '...', name: 'Maiken'}
      ],
      concert_id: 58,
      unreadCount: 0,
    },
  ]
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
