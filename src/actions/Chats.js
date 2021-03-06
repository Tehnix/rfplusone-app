export const UPDATE_CHAT_LIST = 'UPDATE_CHAT_LIST'
export const SHOW_CHAT_ACTIVITY = 'SHOW_CHAT_ACTIVITY'
export const HIDE_CHAT_ACTIVITY = 'HIDE_CHAT_ACTIVITY'
export const SET_CHAT_UNREAD_COUNT = 'SET_CHAT_UNREAD_COUNT'
export const SET_CHAT_STATE = 'SET_CHAT_STATE'
export const NEW_CHAT_MESSAGE = 'NEW_CHAT_MESSAGE'
export const NEW_CHAT_MESSAGES = 'NEW_CHAT_MESSAGES'
export const SET_POLL_TIMER = 'SET_POLL_TIMER'

export const CHAT_TYPES = {
  SINGLE_CHAT: 'SINGLE_CHAT',
  GROUP_CHAT: 'GROUP_CHAT'
}

export const CHAT_ICON_STATE = {
  SHOWING_CHAT_ACTIVITY: 'SHOWING_CHAT_ACTIVITY',
  NOT_SHOWING_CHAT_ACTIVITY: 'NOT_SHOWING_CHAT_ACTIVITY'
}

export function updateChatList(chats) {
  return {
    type: UPDATE_CHAT_LIST,
    chats: chats
  }
}

export function showChatActivity() {
  return {
    type: SHOW_CHAT_ACTIVITY,
    chatIconState: CHAT_ICON_STATE.SHOWING_CHAT_ACTIVITY
  }
}

export function hideChatActivity() {
  return {
    type: HIDE_CHAT_ACTIVITY,
    chatIconState: CHAT_ICON_STATE.NOT_SHOWING_CHAT_ACTIVITY
  }
}

export function setChatUnreadCount(count) {
  let newChatIconState
  if (count > 0) {
    newChatIconState = CHAT_ICON_STATE.SHOWING_CHAT_ACTIVITY
  } else {
    newChatIconState = CHAT_ICON_STATE.NOT_SHOWING_CHAT_ACTIVITY
  }
  return {
    type: SET_CHAT_UNREAD_COUNT,
    chatIconState: newChatIconState,
    totalUnreadCount: count
  }
}

export function setChatState(chatId, state) {
  return {
    type: SET_CHAT_STATE,
    chatId: chatId,
    chatState: state
  }
}

export function newChatMessage(chatId, message) {
  return {
    type: NEW_CHAT_MESSAGE,
    chatId: chatId,
    message: message
  }
}

export function newChatMessages(chatId, messages) {
  return {
    type: NEW_CHAT_MESSAGES,
    chatId: chatId,
    messages: messages
  }
}

export function setPollingTimer(timer) {
  return {
    type: SET_POLL_TIMER,
    timer: timer
  }
}
