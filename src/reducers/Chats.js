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
      key: 1,
      type: CHAT_TYPES.SINGLE_CHAT,
      participants: [
        {profilePicture: '...', name: 'Emilia'}
      ],
      concert: {
        artist: 'Mø',
        location: 'Orange Scene',
        time: '22:00',
        day: 'Saturday',
        date: '2016-07-02',
      },
      unreadCount: 3
    },
    {
      key: 2,
      type: CHAT_TYPES.GROUP_CHAT,
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
      concert: {
        artist: 'Red Hot Chili Peppers',
        location: 'Orange Scene',
        time: '19:00',
        day: 'Friday',
        date: '2016-07-01',
      },
      unreadCount: 15
    },
  ]
}

export function chats(state = initialState, action) {
  switch (action.type) {
  case UPDATE_CHAT_LIST:
    return Object.assign({}, state, {
      chats: action.chats
    })
  case SHOW_CHAT_ACTIVITY:
    return Object.assign({}, state, {
      chatIconState: CHAT_ICON_STATE.SHOWING_CHAT_ACTIVITY
    })
  case HIDE_CHAT_ACTIVITY:
    return Object.assign({}, state, {
      chatIconState: CHAT_ICON_STATE.NOT_SHOWING_CHAT_ACTIVITY
    })
  case SET_CHAT_UNREAD_COUNT:
    return Object.assign({}, state, {
      chatIconState: action.chatIconState,
      totalUnreadCount: action.totalUnreadCount
    })
  default:
    return state
  }
}
