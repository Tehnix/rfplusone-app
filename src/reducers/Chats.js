import {
  UPDATED_CHAT_LIST,
  CHAT_TYPES
} from '../actions/Chats'

const initialState = {
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
  case UPDATED_CHAT_LIST:
    return Object.assign({}, state, {
      chats: action.chats
    })
  default:
    return state
  }
}
